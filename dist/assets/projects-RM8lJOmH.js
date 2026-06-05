import{a as u}from"./page-content-CrDTnGsh.js";import{c as v,a as h,i as y,b}from"./scroll-animations-YVwvv1SP.js";const d={"yes-wheelchair":{era:"Era 01 - Digitization",color:"#34D399",title:"YES Wheelchair",overview:"The first generation that transformed a wheelchair into an IoT-enabled health and safety node.",problem:"Wheelchair users and caregivers had no continuous visibility into mobility behavior, activity intensity, or emergency events such as falls.",solution:"We integrated a sensor suite and edge firmware to capture movement, detect anomalies, and stream data to a mobile interface for day-to-day monitoring.",technology:["ESP32","MPU6050 IMU","Ultrasonic Sensor","BLE","Flutter App","Firebase"],impact:"Created the hardware/software foundation used by all later WheelSense generations and improved confidence in safety monitoring.",videoEmbed:"https://www.youtube.com/embed/iOWTV3rmhbo",goals:["Record wheelchair activity in real time using embedded sensors.","Detect fall-like events and send alert notifications to caregivers.","Make daily mobility data visible through a simple app dashboard."],workflow:["Collect movement and orientation signals from onboard sensors.","Run edge processing for event detection and filtered telemetry.","Sync metrics to a mobile app for trend visualization and alerts."],deliverables:["Sensor-integrated wheelchair prototype.","Realtime monitoring mobile application.","Fall alert and activity analytics module."],metrics:[{label:"System Focus",value:"Safety + Activity"},{label:"Core Modality",value:"IoT Telemetry"},{label:"Deployment Type",value:"On-chair Edge + App"},{label:"Generation",value:"Foundational Platform"}]},"all-wheelchair":{era:"Era 02 - Interaction",color:"#A78BFA",title:"ALL Wheelchair",overview:"A rehabilitation platform that converts wheelchair movement into game interactions for exergaming-based therapy.",problem:"Conventional rehabilitation can feel repetitive and low-motivation, which reduces consistency and weakens long-term outcomes.",solution:"We mapped wheelchair motion to interactive game mechanics so users could perform therapeutic movement through engaging sessions.",technology:["Motion Tracking","Unity Engine","WebSocket","Bluetooth HID","Custom Controller"],impact:"Increased rehabilitation engagement and generated data-driven insights for exercise progress and system tuning.",videoEmbed:"https://www.youtube.com/embed/DeMcUm_TiKc",goals:["Increase rehabilitation adherence with playful interaction loops.","Capture physical movement performance during each session.","Provide immediate feedback for both users and coaches."],workflow:["Read wheelchair motion events through a custom tracking layer.","Translate motion vectors into game commands with low latency.","Log session performance and progression indicators."],deliverables:["Wheelchair-driven exergaming prototype.","Realtime score and movement dashboard.","Motion calibration profile for therapy use."],metrics:[{label:"System Focus",value:"Rehabilitation Engagement"},{label:"Core Modality",value:"Motion-Controlled Games"},{label:"Session Type",value:"Interactive Therapy"},{label:"Generation",value:"Human Interaction Layer"}]},"marathon-racing":{era:"Era 03 - Expansion",color:"#FB923C",title:"smartVibe",overview:"A field-ready mobility intelligence platform for outdoor sessions, adaptive feedback, and live telemetry experiences.",problem:"Outdoor activities and events require stable tracking, route awareness, and responsive interaction beyond indoor lab environments.",solution:"smartVibe combines telemetry streaming, context-aware feedback, and event-level dashboards to support real-world wheelchair mobility scenarios.",technology:["GPS","4G LTE","Realtime Dashboard","Route Mapping","Adaptive Feedback Layer"],impact:"Extended WheelSense capabilities into outdoor and event-scale operations with measurable observability.",videoEmbed:"https://www.youtube.com/embed/poNDNRhPYCk",goals:["Track route-level mobility data in outdoor environments.","Enable live status visibility for teams and event organizers.","Deliver adaptive prompts based on session context."],workflow:["Stream location and activity packets via cellular connectivity.","Process route and session state into operator dashboards.","Apply adaptive interaction cues during live mobility sessions."],deliverables:["Outdoor telemetry stack with live dashboard.","Route intelligence and status feed module.","Event-ready tracking interface for support teams."],metrics:[{label:"System Focus",value:"Outdoor Mobility Intelligence"},{label:"Core Modality",value:"Realtime Telemetry"},{label:"Coverage",value:"Field + Event Scale"},{label:"Generation",value:"Expansion Platform"}]},wheelsense:{era:"Era 04 - Intelligence",color:"#60A5FA",title:"WheelSense",overview:"An AI-powered assistive ecosystem that links vision, voice, and smart-home automation into daily wheelchair experience.",problem:"Users need intuitive and context-aware assistance indoors, where manual control of multiple devices can be complex and fatiguing.",solution:"WheelSense integrates computer vision, natural-language interaction, and automation pipelines to make home environments safer and easier to control.",technology:["ESP32-S3 Camera","YOLO","Home Assistant","MCP","Node-RED","TinyML"],impact:"Moves assistive mobility from passive tools to proactive, intelligent support for everyday life.",videoEmbed:"https://www.youtube.com/embed/kkGf6-B96K0",goals:["Understand user context and nearby objects through vision.","Offer natural-language control for smart-home devices.","Orchestrate reliable automations for daily routines."],workflow:["Capture environment data from camera and embedded sensors.","Run AI inference and command interpretation pipelines.","Trigger smart-home actions with safety-aware automation rules."],deliverables:["AI-enhanced wheelchair interaction architecture.","Smart-home assistant integration with MCP workflows.","Context-aware automation and control dashboard."],metrics:[{label:"System Focus",value:"AI Assistive Intelligence"},{label:"Core Modality",value:"Vision + Voice + Automation"},{label:"Environment",value:"Smart Home Integration"},{label:"Generation",value:"Intelligent Companion"}]},easeai:{era:"Era 05 - Integration",color:"#F472B6",title:"EASE AI",overview:"An AI-driven HealthTech system that integrates sensing, localization, and smart home automation for continuous, preventive care.",problem:"Most assistive tech targets clinical settings or lacks continuous monitoring and context-aware integration for home use.",solution:"Developed an AI caregiver ecosystem with a contract-driven control pipeline to safely orchestrate smart environments and alert caregivers to verified anomalies.",technology:["Arduino Connect","Polar Verity","Pico W","MCP Pipeline","Home Assistant"],impact:"Provided independent living support, improved detection accuracy, and reduced caregiver burden via a secure workflow.",videoEmbed:"",goals:["Enable continuous behavioral analysis for wheelchair users.","Trigger intelligent smart home automation deterministically.","Alleviate caregiver burden through verified real-time alerts."],workflow:["Collect IMU, HR, and RSSI location data centrally.","Process context using constrained LLM and knowledge RAG.","Validate actions explicitly before smart-home execution."],deliverables:["Wearable sensor and Bluetooth anchor network.","Secure multi-layer execution AI pipeline.","Web platform and caregiver mobile dashboard."],metrics:[{label:"System Focus",value:"Proactive HealthTech"},{label:"Core Modality",value:"Continuous Health AI"},{label:"Environment",value:"Smart Care Facilities"},{label:"Generation",value:"Unified Platform"}]}};function g(e){const o=e.match(/embed\/([a-zA-Z0-9_-]{6,})/);return o?o[1]:""}function m(e,o={}){const a=g(e);if(!a)return e;const i=o.autoplay?1:0,r=o.mute?1:0,t=o.loop?1:0,p=o.controls===!1?0:1,l=new URLSearchParams({autoplay:String(i),mute:String(r),loop:String(t),controls:String(p),playsinline:"1",rel:"0",modestbranding:"1"});return t&&l.set("playlist",a),`https://www.youtube-nocookie.com/embed/${a}?${l.toString()}`}function f(e){const o=e.dataset.project||"",a=d[o];if(!a)return;const i=e.querySelector(".project-card__visual");if(!i)return;const r=document.createElement("div");if(r.className="project-card__preview-shade",i.prepend(r),a.videoEmbed){const t=document.createElement("iframe");t.className="project-card__video-preview",t.src=m(a.videoEmbed,{autoplay:!0,mute:!0,loop:!0,controls:!1}),t.loading="lazy",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.setAttribute("allow","autoplay; encrypted-media; picture-in-picture"),t.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),i.prepend(t)}else{const t=document.createElement("div");t.className="project-card__video-preview",t.style.background="#050812",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.color="var(--color-text-tertiary)",t.style.fontSize="0.7rem",t.style.letterSpacing="var(--tracking-wider)",t.style.textTransform="uppercase",t.style.zIndex="0",t.innerHTML="<span>Coming Soon</span>",i.prepend(t)}}function c(e){return`<ul class="project-panel__list">${e.map(o=>`<li>${o}</li>`).join("")}</ul>`}function w(e){return`
    <div class="project-detail__hero">
      <div class="project-detail__hero-bg" style="background: linear-gradient(140deg, ${e.color}3a, transparent 60%);"></div>
      <div class="container container-wide" style="position: relative; z-index: 1;">
        <div class="project-detail__hero-shell">
          <p class="project-detail__hero-kicker" style="color: ${e.color};">${e.era}</p>
          <h1 class="project-detail__hero-title">${e.title}</h1>
          <p class="project-detail__hero-overview">${e.overview}</p>
          <div class="project-detail__hero-chips">
            ${e.technology.slice(0,4).map(o=>`<span class="project-chip">${o}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>

    <div class="project-detail__sections">
      <div class="container container-wide">
        <section class="project-detail-layout">
          <article class="project-panel project-panel--video">
            <p class="project-section__label">Project Video</p>
            <div class="project-video">
              ${e.videoEmbed?`
              <iframe
                src="${m(e.videoEmbed,{autoplay:!0,controls:!0})}"
                title="${e.title} video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              `:`
              <div class="project-video__placeholder" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 400px; background: #050812; color: var(--color-text-secondary); flex-direction: column; gap: 1rem;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                <p style="font-size: var(--text-small); letter-spacing: var(--tracking-wide); text-transform: uppercase;">Video Coming Soon</p>
              </div>
              `}
            </div>
            <div class="project-columns project-columns--mini">
              <div class="project-column">
                <p class="project-section__label">Project Goals</p>
                ${c(e.goals)}
              </div>
              <div class="project-column">
                <p class="project-section__label">System Workflow</p>
                ${c(e.workflow)}
              </div>
            </div>
          </article>

          <article class="project-panel">
            <p class="project-section__label">Engineering Snapshot</p>
            <div class="project-kpi-grid">
              ${e.metrics.map(o=>`
                  <div class="project-kpi">
                    <p class="project-kpi__label">${o.label}</p>
                    <p class="project-kpi__value">${o.value}</p>
                  </div>
                `).join("")}
            </div>

            <div class="project-columns">
              <div class="project-column">
                <p class="project-section__label">The Problem</p>
                <p class="project-panel__text">${e.problem}</p>
              </div>
              <div class="project-column">
                <p class="project-section__label">Our Solution</p>
                <p class="project-panel__text">${e.solution}</p>
              </div>
              <div class="project-column">
                <p class="project-section__label">Measured Impact</p>
                <p class="project-panel__text">${e.impact}</p>
              </div>
            </div>
          </article>
        </section>

        <section class="project-panel project-panel--tech">
          <p class="project-section__label">Technology Stack</p>
          <div class="project-tech-cloud">
            ${e.technology.map(o=>`<span class="project-tech-pill">${o}</span>`).join("")}
          </div>
          <div class="project-panel__divider"></div>
          <p class="project-section__label">Key Deliverables</p>
          ${c(e.deliverables)}
        </section>
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("loader");e&&setTimeout(()=>{e.classList.add("is-hidden"),setTimeout(()=>e.remove(),600)},800),v("projects"),h(),y();const o=document.querySelectorAll(".project-card"),a=document.getElementById("projectDetail"),i=document.getElementById("projectDetailContent"),r=document.getElementById("projectDetailClose"),t=n=>{const s=d[n];!s||!a||!i||(i.innerHTML=w(s),a.classList.add("is-open"),document.body.style.overflow="hidden",a.scrollTop=0)};o.forEach(n=>{f(n)}),o.forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.project||"";t(s)})}),r==null||r.addEventListener("click",()=>{a&&(a.classList.remove("is-open"),document.body.style.overflow="")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&a&&(a.classList.remove("is-open"),document.body.style.overflow="")});const l=new URLSearchParams(window.location.search).get("project")||"";l&&d[l]&&t(l),await u("projects"),b()});
