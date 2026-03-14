EaseAI Description:

1. Background and Concept

Global population aging is increasing the number of people who rely on wheelchairs for daily mobility. According to WHO, over 80 million wheelchair users worldwide (WHO, World Report on Disability, 2023). Wheelchair users—especially older adults and people with disabilities—face limited mobility, reduced strength, and difficulty using conventional interfaces, increasing dependence on caregivers and risk of pressure injuries, deconditioning, falls, and delayed response to emergencies. Prolonged immobility can lead to pressure sores if not detected. Many experience falls and adverse events where continuous monitoring is absent. EaseAI addresses this with an AI-driven platform built around a contract-driven control core—a layered, deterministic pipeline so every action is validated and auditable—enabling safe, behavior-aware assistance. For example, a fall at night in the bathroom may go unnoticed until the user calls; EaseAI detects the event from sensors, verifies it with edge vision, and surfaces it to the caregiver with context in near real time.

Although digital health and assistive technologies have improved clinical care, most solutions target hospital or rehabilitation settings; home-based options remain limited. SOS-style devices offer emergency alerts but no prevention, context, or continuous mobility data; generic wearables are not wheelchair-specific or home-integrated; standalone smart home systems lack user state (location, behavior, physiology). Caregivers rarely have objective, continuous data, making proactive care and risk prevention difficult. No existing system combines continuous wheelchair and physiological sensing, indoor localization, behavior-aware AI, and smart home control in one privacy-conscious platform for long-term use, unlike direct LLM-to-actuator or threshold-only alert systems. Advances in AI, sensor fusion, and smart home technologies make such integrated, preventive care feasible.

This research addresses these limitations through EaseAI, an AI-driven HealthTech system that integrates wheelchair-mounted motion and physiological sensors, indoor localization, machine learning, and smart home automation in one platform for long-term use. EaseAI aims to support independent living, enhance safety, and reduce caregiver burden through continuous monitoring, personalized assistance, and intelligent environmental responses tailored to wheelchair users' daily behavior.

2. Project Features and Functionality

EaseAI is a personal AI caregiver system that integrates with a smart home environment for elderly and people with disabilities. It combines continuous sensing, behavior-aware reasoning, and automatic environmental control so users navigate with minimal manual effort while caregivers gain visibility into daily activity and safety.

Differentiator: User intent and sensor context flow through a contract-driven pipeline (intent → context → constrained reasoning → validated execution). Only schema-validated, whitelisted actions reach the environment; the LLM never executes directly—safe and auditable control. 

Key terms: the pipeline has five layers (L1–L5)—intent routing, context, behavioral state, LLM synthesis, and safety execution. RAG (retrieval-augmented generation) grounds advice in trusted guidelines. Contract-driven means every action is checked against a schema and whitelist before execution. Without EaseAI, a caregiver may learn of a fall only when the user calls; with EaseAI, sensors and edge vision verify the event and surface it to the caregiver with context in near real time.

Main capabilities

- Continuous monitoring: Wheelchair-mounted sensors (motion, heart rate) and anchor nodes (room/zone location via RSSI); mobile app when user is not in the chair (continues location and safety monitoring via Bluetooth)—full visibility for user and caregiver.
- Safety and verification: Abnormal behavior from movement (IMU) or heart rate (Polar). Movement validated by edge vision on Raspberry Pi Pico W before alert; HR validated with user condition and RAG so only critical cases escalate. Layer3 adapts detection to the individual. Verified events trigger alerts; unverified do not. Human in the loop; system supports, does not replace, caregiver judgment. Inconclusive cases escalate to human review (image to dashboard, retain/delete per policy).
- Smart home automation: Lighting, climate, and safety devices by location and context. Actions validated by pipeline (Layer5) before execution via Home Assistant—hands-free control.
- Health analysis and guidance: Requests trigger recommendations grounded in trusted information (RAG), tailored to context and limitations.

Flow: Sensors and anchors send data to the server; the AI layer uses location, movement, heart rate, and behavioral state to decide actions; only validated commands reach smart home devices or caregiver alerts; feedback via dashboard and environment. Implemented as intent (Layer1) → context (Layer2) → synthesis (Layer4) → validation and execution (Layer5), with Layer3 updated asynchronously. Figure 1 shows the system architecture (sensors and anchors → server Layer1–Layer5 → Home Assistant, dashboard, voice respond).

3. Development Tools and Techniques

EaseAI combines a contract-driven AI backend, non-invasive sensor fusion with verification, adaptive behavioral learning, and retrieval-augmented knowledge into a proactive, home-oriented care system. This section focuses on the AI control core and safe, auditable assistance.

Execution pipeline and contract-driven backend (Layer1–Layer5, MCP)

The AI backend implements a five-layer pipeline: L1 (Intent Router) classifies user intent; L2 (Context Engine) pulls from knowledge and database (timeline, trends, user profile, behavioral state) using Reasoning-based RAG to assemble minimal structured context; L3 (Behavioral State Engine) runs asynchronously and maintains user behavioral patterns; L4 (Constrained LLM Synthesis) produces tool instructions or responses from L2 context only, with predefined tool schemas and no direct database access; L5 (Safety & Tool Execution) validates tool arguments against schema and whitelist and executes only after validation. Real-time path is L1→2→4→5; L3 runs asynchronously. All layers emit structured events for traceability. No action reaches the environment without Layer5 validation (safety before autonomy). End-to-end latency from sensor event to caregiver alert is targeted under 1 minute; when edge vision is unavailable, the system escalates to human review without auto-alert. The design is contract-driven so that behavior is deterministic and auditable—critical for safety and caregiver trust. The AI links to the server using MCP (Model Context Protocol); a cross-cutting observability layer records structured events for debugging and auditing—e.g. intent type, context keys used, tool calls, and validation outcomes—so pipeline behavior can be traced and audited.

Sensing: IMU and anchor nodes

Sensor data feeds the AI backend (Layer2 and Layer3). EaseAI uses Arduino Nano RP2040 Connect (movement) and Polar Verity Sense (heart rate) on the wheelchair; Raspberry Pi Pico W anchor nodes with RSSI fingerprinting provide room- or zone-level location. Abnormal behavior (e.g. possible fall, sudden immobility) is detected from sensor data. Two-branch validation: (1) Movement (IMU): a vision model on Raspberry Pi Pico W validates the event (e.g. person on floor vs. seated) before an alert. (2) Heart rate (Polar): user condition and RAG over guidelines assess whether the reading is critical or explainable. Inconclusive edge results can trigger escalation to human review with the image sent to the caregiver. When the user is not in the wheelchair, a mobile app uses Bluetooth for location. Motion tracking was validated against conventional 2D motion analysis (r = 0.77–0.99 for traveling distance, velocity, movement time across 30 wheelchair users).

Adaptive behavioral learning and RAG

Layer3 maintains individual user routines; personalized detection ; in pilot testing, this adaptive approach improved detection accuracy and reduced false alarms compared to fixed-threshold methods. Layer2 decides what to retrieve from knowledge and database: for exercise advice, relevant chunks from book publication "Guidelines for Safe Exercise for Wheelchair Users" ; for health trends from database and optionally knowledge; for heart-rate abnormalities, user condition plus RAG guidelines on criticality—Layer4 synthesizes whether to escalate.

Currently we're on TRL7. Hopefully, future work will extend EaseAI toward Smart City scale.

4. Target User and Environment (hardware and software specifications)

EaseAI is developed for elderly individuals and people with disabilities who rely on wheelchairs for daily indoor activities. and the target users are caregivers.

Hardware
Wheelchair: Arduino Nano RP2040 Connect (movement), Polar Verity Sense (heart rate). Localization: Raspberry Pi Pico W anchor nodes, RSSI fingerprinting, room- or zone-level. Verification: Raspberry Pi Pico W with camera in high-risk areas to validate movement-based events. Out-of-chair: mobile app, Bluetooth, for location continuity. Deployment: one-time anchor placement and RSSI calibration ; no ongoing cloud dependency. Larger spaces: ~one anchor per 15–25 m². Wheelchair units battery-powered (~50 hours per charge); anchors and edge vision node by mains or USB. Connectivity: BLE and Wi-Fi to server; server on local network, Home Assistant API for smart home control.

Software
Server: timeline, health analysis, environment control; secure web dashboard for caregivers; Voice-AI for hands-free user control. AI: Layer1–Layer5 pipeline, PostgreSQL; receives sensor/anchor data; sends only validated commands to Home Assistant; structured events for debugging and auditing. Data: mobility patterns and behavioral history in PostgreSQL for longitudinal learning and adaptation. Scaling: single room to multi-room and facilities by adding anchors and edge vision nodes; non-wheelchair mode (mobile app) for continuity when user is not in the chair. For assisted living or nursing home, deployment scales by adding one wheelchair unit and anchor set per resident or zone, with optional shared edge vision nodes in common areas.

5. Industry Application (commercial value, business potential, social impact, future cooperation partners)

EaseAI addresses global aging and the demand for home-based, AI-driven care. Over 80 million wheelchair users worldwide (WHO 2023); a gap exists between clinical assistive tech and integrated home care. EaseAI combines continuous sensing, behavior-aware AI, and smart home automation; addressable market spans single homes to assisted living and nursing homes.

Commercial:
(1) hardware
(2) subscription/licensing for software and monitoring
(3) B2B licensing to nursing home.

Scalability: Additive—one wheelchair unit per wheelchair, ~one anchor per 15–25 m²; facilities scale by adding units per resident/zone.

Social impact: Reactive to preventive assistance, independence, reduced caregiver burden. Pilot testing improved detection accuracy and reduced false alarms; sensitivity/specificity in extended trials.

Integration: Home Assistant, IoT (BLE/Wi-Fi), local PostgreSQL; elderly care, manufacturing; complements existing workflows.
Future partners: wheelchair manufacturers (Matsunaga company), care facilities, healthcare, government.

Next steps: expanded nursing home trials within 3-4 months, then facility-scale deployment.

IP and validation: Thailand Petty Patents 21587, 25548; Software Copyrights 011827, 011864. Research: [add paper citation]. MOU: [add partner(s), e.g. Matsunaga, institution].

6. Conclusion

EaseAI closes the gap between hospital-centred assistive tech and integrated home-based support via continuous sensing, behavior-aware AI, and smart home automation in one privacy-conscious platform. Contract-driven pipeline (L1–L5): no action without Layer5 validation—safety before autonomy.

Contributions:
(1) Integration of sensors (Arduino Nano RP2040 Connect, Polar, Pico W anchors and edge vision, mobile app), L1–L5 backend (MCP), and Home Assistant into one safe, auditable system.
(2) Motion tracking validated (r = 0.77–0.99, 30 users); adaptive detection and two-branch verification (movement + vision, HR + RAG) improve accuracy and reduce false alarms; full sensitivity/specificity in extended trials.
(3) TRL7, pilot-validated, ready for larger-scale home and facility trials. Supports caregivers (dashboard, verified alerts); does not replace human judgment. Local processing and PostgreSQL ensure privacy.

Future: Sensitivity/specificity/reliability; 3-4 months—facility deployment in nursing home.

Vision: Reactive to preventive daily safety at nursing home. The pipeline is a reusable contribution to safe AI-driven assistive systems; EaseAI supports independent living and caregiver confidence.
