// WebGL Wheel — Three.js particle-based abstract wheel form
import * as THREE from 'three';
import gsap from 'gsap';

export class WebGLWheel {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 5000,
            color: options.color || 0x38bdf8,
            radius: options.radius || 3.5,
            rotationSpeed: options.rotationSpeed || 0.0015,
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
          vec3 finalColor = uColor * (1.0 + (0.5 - dist) * 1.5);
          gl_FragColor = vec4(finalColor, alpha * 2.5); // Boost alpha and add glow
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
                // YES Wheelchair: Structured wheel with rigid spokes
                if (Math.random() > 0.2) {
                    // Outer rim
                    const angle = Math.random() * Math.PI * 2;
                    const r = radius;
                    targetPositions[i3] = r * Math.cos(angle) + (Math.random() - 0.5) * 0.3;
                    targetPositions[i3 + 1] = r * Math.sin(angle) + (Math.random() - 0.5) * 0.3;
                    targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.5;
                } else {
                    // 6 Rigid Spokes
                    const numSpokes = 6;
                    const spokeIdx = Math.floor(Math.random() * numSpokes);
                    const angle = (spokeIdx / numSpokes) * Math.PI * 2;
                    const dist = Math.random() * radius;
                    targetPositions[i3] = dist * Math.cos(angle) + (Math.random() - 0.5) * 0.1;
                    targetPositions[i3 + 1] = dist * Math.sin(angle) + (Math.random() - 0.5) * 0.1;
                    targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.1;
                }
            } else if (shape === 'gameController') {
                // ALL Wheelchair: Infinity symbol with game buttons
                if (Math.random() > 0.15) {
                    const t = Math.random() * Math.PI * 2;
                    const scale = radius * 0.7;
                    const denom = 1 + Math.sin(t) * Math.sin(t);
                    const x = (scale * Math.cos(t)) / denom;
                    const y = (scale * Math.sin(t) * Math.cos(t)) / denom;
                    targetPositions[i3] = x * 2.2 + (Math.random() - 0.5) * 0.3;
                    targetPositions[i3 + 1] = y * 2.2 + (Math.random() - 0.5) * 0.3;
                    targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.6;
                } else {
                    // Game button clusters
                    const xOffset = Math.random() > 0.5 ? radius : -radius;
                    targetPositions[i3] = xOffset + (Math.random() - 0.5) * 0.8;
                    targetPositions[i3 + 1] = (Math.random() - 0.5) * 0.8;
                    targetPositions[i3 + 2] = 0.5 + Math.random() * 0.5;
                }
            } else if (shape === 'raceTrack') {
                // smartVibe: Global map / sphere with orbiting telemetry rings
                if (Math.random() > 0.3) {
                    // Globe
                    const phi = Math.acos(2 * Math.random() - 1);
                    const theta = Math.random() * Math.PI * 2;
                    const r = radius * 0.8;
                    targetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
                    targetPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                    targetPositions[i3 + 2] = r * Math.cos(phi);
                } else {
                    // Orbiting structural ring
                    const angle = Math.random() * Math.PI * 2;
                    const r = radius * 1.2;
                    targetPositions[i3] = r * Math.cos(angle) + (Math.random() - 0.5) * 0.2;
                    targetPositions[i3 + 1] = (Math.random() - 0.5) * 0.2;
                    targetPositions[i3 + 2] = r * Math.sin(angle) + (Math.random() - 0.5) * 0.2;
                }
            } else if (shape === 'brain') {
                // WheelSense: Smart Home (House Wireframe & Inner Nodes)
                if (Math.random() > 0.3) {
                    // House Wireframe / Base
                    const t = Math.random();
                    const edge = Math.floor(Math.random() * 5);
                    const s = radius * 0.7;
                    if (edge === 0) { // Bottom
                        targetPositions[i3] = (t - 0.5) * s * 2;
                        targetPositions[i3 + 1] = -s;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * s * 2;
                    } else if (edge === 1) { // Left Wall
                        targetPositions[i3] = -s;
                        targetPositions[i3 + 1] = (t - 0.5) * s * 2;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * s * 2;
                    } else if (edge === 2) { // Right Wall
                        targetPositions[i3] = s;
                        targetPositions[i3 + 1] = (t - 0.5) * s * 2;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * s * 2;
                    } else if (edge === 3) { // Left Roof
                        targetPositions[i3] = -s + t * s;
                        targetPositions[i3 + 1] = s + t * s;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * s * 2;
                    } else { // Right Roof
                        targetPositions[i3] = s - t * s;
                        targetPositions[i3 + 1] = s + t * s;
                        targetPositions[i3 + 2] = (Math.random() - 0.5) * s * 2;
                    }
                } else {
                    // Inner smart nodes
                    const r = radius * 0.4 * Math.random();
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    targetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
                    targetPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                    targetPositions[i3 + 2] = r * Math.cos(phi);
                }
            } else if (shape === 'aiCore') {
                // EASE AI: Nursing Home (Medical Cross inside protective dome)
                if (Math.random() > 0.4) {
                    // Medical Cross shape
                    const isVertical = Math.random() > 0.5;
                    const len = (Math.random() - 0.5) * radius * 1.2;
                    const width = (Math.random() - 0.5) * radius * 0.35;
                    const depth = (Math.random() - 0.5) * 0.2;
                    if (isVertical) {
                        targetPositions[i3] = width;
                        targetPositions[i3 + 1] = len;
                        targetPositions[i3 + 2] = depth;
                    } else {
                        targetPositions[i3] = len;
                        targetPositions[i3 + 1] = width;
                        targetPositions[i3 + 2] = depth;
                    }
                } else {
                    // Protective shield network (Sphere shell)
                    const phi = Math.acos(2 * Math.random() - 1);
                    const theta = Math.random() * Math.PI * 2;
                    const r = radius * 1.1 + (Math.random() - 0.5) * 0.15;
                    targetPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
                    targetPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                    targetPositions[i3 + 2] = r * Math.cos(phi);
                }
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
