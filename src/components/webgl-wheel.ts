// WebGL Wheel — Three.js particle-based abstract wheel form
import * as THREE from 'three';
import gsap from 'gsap';

export class WebGLWheel {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 2000,
            color: options.color || 0xffffff,
            radius: options.radius || 3,
            rotationSpeed: options.rotationSpeed || 0.002,
            ...options,
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.animationId = null;

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            100
        );
        this.camera.position.z = 6;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create particles in a torus shape (wheel form)
        this.createParticles();

        // Events
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });

        // Start
        this.animate();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.options.particleCount * 3);
        const scales = new Float32Array(this.options.particleCount);
        const alphas = new Float32Array(this.options.particleCount);

        const { radius, particleCount } = this.options;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Torus parametric equations
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const tubeRadius = 0.6 + Math.random() * 0.4;

            positions[i3] = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
            positions[i3 + 1] = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
            positions[i3 + 2] = tubeRadius * Math.sin(v);

            scales[i] = Math.random() * 0.5 + 0.5;
            alphas[i] = Math.random() * 0.5 + 0.3;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

        // Shader material for particles
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(this.options.color) },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        attribute float aScale;
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.5 + position.y * 2.0) * 0.05;
          pos.y += cos(uTime * 0.3 + position.x * 2.0) * 0.05;
          pos.z += sin(uTime * 0.4 + position.z * 2.0) * 0.05;

          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
          gl_PointSize = aScale * uPixelRatio * 3.0 * (1.0 / -viewPosition.z);

          vAlpha = aAlpha;
        }
      `,
            fragmentShader: `
        varying float vAlpha;
        uniform vec3 uColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = vAlpha * smoothstep(0.5, 0.1, dist);
          gl_FragColor = vec4(uColor, alpha * 1.5); // Boost alpha
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Store original positions for morphing
        this.originalPositions = new Float32Array(positions);
    }

    morphTo(shape = 'wheel') {
        const currentPositions = Float32Array.from(this.particles.geometry.attributes.position.array);
        const count = this.options.particleCount;
        const radius = this.options.radius;
        const targetPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;

            if (shape === 'wheel') {
                const tubeRadius = 0.6 + Math.random() * 0.4;
                targetPositions[i3] = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
                targetPositions[i3 + 1] = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
                targetPositions[i3 + 2] = tubeRadius * Math.sin(v);
            } else if (shape === 'sphere') {
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * Math.PI * 2;
                const r = radius * 0.8 + Math.random() * 0.5;
                targetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
                targetPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                targetPositions[i3 + 2] = r * Math.cos(phi);
            } else if (shape === 'network') {
                // Neural network spread
                targetPositions[i3] = (Math.random() - 0.5) * radius * 3;
                targetPositions[i3 + 1] = (Math.random() - 0.5) * radius * 3;
                targetPositions[i3 + 2] = (Math.random() - 0.5) * radius * 2;
            } else if (shape === 'logo') {
                // Compact O shape
                const angle = (i / count) * Math.PI * 2;
                const r2 = radius * 0.8 + Math.random() * 0.3;
                targetPositions[i3] = r2 * Math.cos(angle);
                targetPositions[i3 + 1] = r2 * Math.sin(angle);
                targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.3;
            } else if (shape === 'sensorWheel') {
                // YES Wheelchair: Wheel with pulsing inner spokes and sensor ring
                if (Math.random() > 0.3) {
                    // Outer ring (Sensor Ring)
                    const angle = Math.random() * Math.PI * 2;
                    const r = radius * (0.9 + Math.random() * 0.2);
                    targetPositions[i3] = r * Math.cos(angle);
                    targetPositions[i3 + 1] = r * Math.sin(angle);
                    targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.5;
                } else {
                    // Spokes (Sensors)
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * radius;
                    targetPositions[i3] = r * Math.cos(angle);
                    targetPositions[i3 + 1] = r * Math.sin(angle);
                    targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.2;
                }
            } else if (shape === 'gameController') {
                // All Wheelchair: Infinity symbol
                const t = Math.random() * Math.PI * 2;
                const scale = radius * 0.6;

                const denom = 1 + Math.sin(t) * Math.sin(t);
                const x = (scale * Math.cos(t)) / denom;
                const y = (scale * Math.sin(t) * Math.cos(t)) / denom;

                targetPositions[i3] = x * 2.5 + (Math.random() - 0.5) * 0.5;
                targetPositions[i3 + 1] = y * 2.5 + (Math.random() - 0.5) * 0.5;
                targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.8;
            } else if (shape === 'raceTrack') {
                // Marathon: Helix / Spiral
                const angle = (i / count) * Math.PI * 8; // 4 turns
                const spiralRadius = radius * 0.6;

                targetPositions[i3] = spiralRadius * Math.cos(angle);
                targetPositions[i3 + 1] = spiralRadius * Math.sin(angle);
                targetPositions[i3 + 2] = (angle / (Math.PI * 8)) * radius * 4 - radius * 2;

                // Add thickness
                targetPositions[i3] += (Math.random() - 0.5) * 0.3;
                targetPositions[i3 + 1] += (Math.random() - 0.5) * 0.3;
                targetPositions[i3 + 2] += (Math.random() - 0.5) * 0.3;

            } else if (shape === 'brain') {
                // WheelSense: Brain Hemisphere
                const theta = Math.random() * Math.PI * 2;
                const val = Math.random();
                const phi_sph = Math.acos(2 * val - 1);

                const r = radius * 0.8;
                const noise = Math.sin(phi_sph * 10) * Math.cos(theta * 10) * 0.1;
                const finalR = r + noise;

                targetPositions[i3] = finalR * Math.sin(phi_sph) * Math.cos(theta);
                targetPositions[i3 + 1] = finalR * Math.sin(phi_sph) * Math.sin(theta);
                targetPositions[i3 + 2] = finalR * Math.cos(phi_sph);
            }
        }

        // Animation
        const dummy = { t: 0 };
        if (this.morphTween) this.morphTween.kill();

        this.morphTween = gsap.to(dummy, {
            t: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                const positions = this.particles.geometry.attributes.position.array;
                for (let i = 0; i < count * 3; i++) {
                    positions[i] = currentPositions[i] + (targetPositions[i] - currentPositions[i]) * dummy.t;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
            }
        });
    }

    setColor(hex) {
        this.particles.material.uniforms.uColor.value.set(hex);
    }

    onResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    onMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));

        const elapsed = this.clock.getElapsedTime();
        this.particles.material.uniforms.uTime.value = elapsed;

        // Smooth rotation
        this.targetRotation.x += (this.mouse.y * 0.1 - this.targetRotation.x) * 0.05;
        this.targetRotation.y += (this.mouse.x * 0.1 - this.targetRotation.y) * 0.05;

        this.particles.rotation.x = this.targetRotation.x + elapsed * this.options.rotationSpeed;
        this.particles.rotation.y = this.targetRotation.y + elapsed * this.options.rotationSpeed * 1.5;

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.renderer.dispose();
        this.particles.geometry.dispose();
        this.particles.material.dispose();
        window.removeEventListener('resize', this.onResize.bind(this));
        if (this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
    }
}
