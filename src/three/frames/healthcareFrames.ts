import { Healthcare3DFrame } from './frameTypes';

export const HEALTHCARE_FRAMES: Healthcare3DFrame[] = [
  // FRAME 01 — HERO (0.00 - 0.10)
  {
    id: "hero",
    name: "The Future of Health",
    index: 0,
    startProgress: 0.00,
    endProgress: 0.10,
    camera: {
      position: [0, 0, 7.5],
      rotation: [0, 0, 0],
      target: [0, 0, 0],
      fov: 45,
    },
    objects: [
      {
        id: "hero-core",
        position: [2.2, 0, 0],
        rotation: [0.1, 0.4, 0],
        scale: [1.2, 1.2, 1.2],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.2,
      fill: 2.2,
      rim: 2.5,
      environment: 1.5,
      ambientColor: "#f8fafc",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f8fafc",
      gradient: "linear-gradient(135deg, #ffffff 0%, #e0f2fe 55%, #f0fdfa 100%)",
      atmosphereDensity: 0.01,
    },
    image: {
      src: "/assets/3d/frame01_hero.jpg",
      alt: "3D Double Helix DNA Structure",
      badge: "REAL 3D RENDER • 8K FIDELITY",
      caption: "Biomedical Double Helix & Platinum Sensing Core",
      hotspots: [
        {
          id: "f1-1",
          x: 42,
          y: 35,
          title: "Epigenetic Methylation",
          value: "99.8% Fidelity",
          detail: "Real-time chromatin remodeling detection and methylation tracking.",
        },
        {
          id: "f1-2",
          x: 62,
          y: 68,
          title: "Phosphodiester Core",
          value: "310K Thermal Stability",
          detail: "Synthesized molecular backbone analysis with zero bond dissociation.",
        },
      ],
    },
    text: {
      visible: true,
      position: "left",
      alignment: "left",
      badge: "BIOMEDICAL INNOVATION PLATFORM",
      headline: "THE FUTURE OF HEALTH",
      subheadline: "Where medical science, intelligent technology and human care come together.",
      description: "Pioneering cellular-level diagnostics, adaptive robotic therapies, and AI-driven clinical precision to safeguard human longevity.",
      primaryCta: {
        label: "Explore the Experience",
        action: "scroll-next",
      },
      secondaryCta: {
        label: "Discover Our Technology",
        action: "jump-tech",
      },
      metrics: [
        { label: "PRECISION ACCURACY", value: "99.8%", sublabel: "Molecular Level" },
        { label: "CLINICAL TRIALS", value: "140+", sublabel: "Global Centers" },
      ]
    },
    transition: {
      type: "camera",
      ease: "power2.inOut",
    },
  },

  // FRAME 02 — HUMAN BODY (0.10 - 0.20)
  {
    id: "human-body",
    name: "Understand The Human Body",
    index: 1,
    startProgress: 0.10,
    endProgress: 0.20,
    camera: {
      position: [-1.2, 0.2, 6.2],
      rotation: [0.05, -0.15, 0],
      target: [0.5, 0, 0],
      fov: 42,
    },
    objects: [
      {
        id: "human-anatomy",
        position: [1.6, -0.4, 0],
        rotation: [0, 0.3, 0],
        scale: [1.1, 1.1, 1.1],
        opacity: 0.95,
      }
    ],
    lighting: {
      key: 3.4,
      fill: 2.2,
      rim: 2.8,
      environment: 1.6,
      ambientColor: "#f1f5f9",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f0f9ff",
      gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame02_human_body.jpg",
      alt: "Volumetric 3D Anatomical Organ Map",
      badge: "VOLUMETRIC 3D MAP",
      caption: "Multi-Organ Holographic Somatic Synthesis",
      hotspots: [
        {
          id: "f2-1",
          x: 50,
          y: 16,
          title: "Cranial Connectome",
          value: "86B Synaptic Nodes",
          detail: "Real-time cerebral impulse monitoring and cognitive flow tracking.",
        },
        {
          id: "f2-2",
          x: 53,
          y: 38,
          title: "Cardiopulmonary Perfusion",
          value: "98.6% SpO2",
          detail: "Synchronized thoracic oxygenation mapping and micro-perfusion.",
        },
        {
          id: "f2-3",
          x: 48,
          y: 58,
          title: "Hepatic Metabolic Core",
          value: "1.2 L/min",
          detail: "Clearance rate and hepatic detoxification telemetry.",
        },
      ],
    },
    text: {
      visible: true,
      position: "left",
      alignment: "left",
      badge: "HOLISTIC ANATOMICAL MAP",
      headline: "UNDERSTAND THE HUMAN BODY",
      subheadline: "Real-time volumetric mapping of multi-organ physiology.",
      description: "From macro-physiological homeostasis down to tissue vascularization, our optical bio-sensors synthesize thousands of somatic metrics into an intuitive spatial avatar.",
      metrics: [
        { label: "SYSTEMS MONITORED", value: "HEART • BRAIN • LUNGS • LIVER" },
        { label: "RESOLUTION", value: "0.2 mm", sublabel: "Volumetric fidelity" },
      ]
    },
    transition: {
      type: "hybrid",
      ease: "power2.inOut",
    },
  },

  // FRAME 03 — HEART (0.20 - 0.30)
  {
    id: "heart",
    name: "The Biorhythmic Engine",
    index: 2,
    startProgress: 0.20,
    endProgress: 0.30,
    camera: {
      position: [1.8, 0.3, 4.2],
      rotation: [0.02, 0.2, 0],
      target: [-0.6, 0.1, 0],
      fov: 38,
    },
    objects: [
      {
        id: "heart-model",
        position: [-1.4, 0.1, 0],
        rotation: [0.1, -0.4, 0.05],
        scale: [1.3, 1.3, 1.3],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.5,
      fill: 2.4,
      rim: 2.9,
      environment: 1.5,
      ambientColor: "#fff1f2",
      keyColor: "#ffffff",
    },
    background: {
      color: "#fff1f2",
      gradient: "linear-gradient(135deg, #fff1f2 0%, #fef2f2 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame03_heart.jpg",
      alt: "3D Anatomical Human Heart Render",
      badge: "3D MYOCARDIAL SCAN",
      caption: "Crystalline Ventricles & Coronary Vasculature",
      hotspots: [
        {
          id: "f3-1",
          x: 38,
          y: 22,
          title: "Ascending Aorta",
          value: "118/76 mmHg",
          detail: "Continuous dynamic compliance and pulse wave velocity tracking.",
        },
        {
          id: "f3-2",
          x: 64,
          y: 60,
          title: "Left Ventricle",
          value: "EF: 64% • 74 mL",
          detail: "Sub-millisecond myocardial contraction telemetry and ejection fraction.",
        },
        {
          id: "f3-3",
          x: 32,
          y: 55,
          title: "Coronary Vasculature",
          value: "250 mL/min",
          detail: "Microvascular micro-perfusion and zero-calcification index.",
        },
      ],
    },
    text: {
      visible: true,
      position: "right",
      alignment: "left",
      badge: "CARDIOVASCULAR DYNAMICS",
      headline: "THE BIORHYTHMIC ENGINE",
      subheadline: "Synchronized blood flow simulation & myocardial telemetry.",
      description: "Continuous micro-pulsing telemetry monitors hemodynamic pressure, arterial elasticity, and early cardiac arrhythmias with sub-millisecond precision.",
      metrics: [
        { label: "MEAN ARTERIAL PRESSURE", value: "93 mmHg", sublabel: "Optimal window" },
        { label: "CARDIAC OUTPUT", value: "5.4 L/min", sublabel: "Resting dynamic" },
      ]
    },
    transition: {
      type: "camera",
      ease: "power3.inOut",
    },
  },

  // FRAME 04 — BRAIN (0.30 - 0.40)
  {
    id: "brain",
    name: "Neural Topography",
    index: 3,
    startProgress: 0.30,
    endProgress: 0.40,
    camera: {
      position: [-1.9, 0.4, 4.5],
      rotation: [-0.05, -0.22, 0],
      target: [0.8, 0.1, 0],
      fov: 38,
    },
    objects: [
      {
        id: "brain-model",
        position: [1.4, 0.1, 0],
        rotation: [0.15, 0.6, -0.05],
        scale: [1.25, 1.25, 1.25],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.4,
      fill: 2.2,
      rim: 3.0,
      environment: 1.6,
      ambientColor: "#f0f9ff",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f0f9ff",
      gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame04_brain.jpg",
      alt: "3D Cerebral Cortex & Neural Topography",
      badge: "SYNAPTIC LATTICE 3D",
      caption: "Bilateral Hemispheres & Real-Time Axon Pathways",
      hotspots: [
        {
          id: "f4-1",
          x: 34,
          y: 32,
          title: "Prefrontal Cortex",
          value: "Gamma 40 Hz",
          detail: "Executive cognition and synaptic coherence band monitoring.",
        },
        {
          id: "f4-2",
          x: 66,
          y: 58,
          title: "Neural Axon Pathways",
          value: "119 m/s Velocity",
          detail: "Action potential propagation and neuroplasticity index.",
        },
      ],
    },
    text: {
      visible: true,
      position: "left",
      alignment: "left",
      badge: "NEUROLOGICAL COGNITION",
      headline: "NEURAL TOPOGRAPHY",
      subheadline: "Deep synaptic activity and axon connectivity mapping.",
      description: "Non-invasive optogenetic sensor meshes trace synaptic firing sequences in real-time, mapping memory encoding pathways and neuro-regenerative plasticities.",
      metrics: [
        { label: "NEURAL DENSITY", value: "86B Neurons", sublabel: "Cognitive grid" },
        { label: "SYNAPSE SPEED", value: "119 m/s", sublabel: "Impulse velocity" },
      ]
    },
    transition: {
      type: "camera",
      ease: "power2.inOut",
    },
  },

  // FRAME 05 — DIAGNOSIS (0.40 - 0.55)
  {
    id: "diagnosis",
    name: "See What The Eye Cannot",
    index: 4,
    startProgress: 0.40,
    endProgress: 0.55,
    camera: {
      position: [0, 0.5, 5.2],
      rotation: [0, 0, 0],
      target: [0, 0, 0],
      fov: 40,
    },
    objects: [
      {
        id: "diagnostic-scan",
        position: [1.2, 0, 0],
        rotation: [0, 0.2, 0],
        scale: [1.3, 1.3, 1.3],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.5,
      fill: 2.5,
      rim: 2.8,
      environment: 1.6,
      ambientColor: "#ecfeff",
      keyColor: "#ffffff",
    },
    background: {
      color: "#ecfeff",
      gradient: "linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame05_diagnosis.jpg",
      alt: "3D Multi-Slice MRI Tomography Scanner",
      badge: "SPECTRAL TOMOGRAPHY 3D",
      caption: "Multi-Slice Axial MRI Resonance Reconstruction",
      hotspots: [
        {
          id: "f5-1",
          x: 62,
          y: 38,
          title: "Cryogenic Magnet Bore",
          value: "7.0 Tesla Field",
          detail: "Ultra-high magnetic homogeneity for non-contrast vascular imaging.",
        },
        {
          id: "f5-2",
          x: 36,
          y: 62,
          title: "Volumetric Voxel Array",
          value: "0.2mm Isotropic",
          detail: "Sub-millimeter multi-slice spectral reconstruction of tissue density.",
        },
      ],
    },
    text: {
      visible: true,
      position: "left",
      alignment: "left",
      badge: "COMPUTATIONAL TOMOGRAPHY",
      headline: "SEE WHAT THE EYE CANNOT",
      subheadline: "Multi-spectral scanning reveals sub-surface anomalies.",
      description: "Combining ultra-fast MRI resonance with automated spectral segmentation. Volumetric tomograms illuminate micro-calcifications and vascular anomalies years before clinical onset.",
      metrics: [
        { label: "SCAN VELOCITY", value: "140 ms", sublabel: "Full axial capture" },
        { label: "ANOMALY DETECTION", value: "Stage 0", sublabel: "Earliest threshold" },
      ]
    },
    transition: {
      type: "hybrid",
      ease: "power3.inOut",
    },
  },

  // FRAME 06 — MEDICAL TECHNOLOGY (0.55 - 0.68)
  {
    id: "technology",
    name: "Technology That Moves Medicine Forward",
    index: 5,
    startProgress: 0.55,
    endProgress: 0.68,
    camera: {
      position: [2.0, 0.4, 5.0],
      rotation: [0.03, 0.25, 0],
      target: [-0.5, 0, 0],
      fov: 38,
    },
    objects: [
      {
        id: "medical-robotics",
        position: [-1.4, -0.1, 0],
        rotation: [0.2, -0.5, 0],
        scale: [1.2, 1.2, 1.2],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.6,
      fill: 2.4,
      rim: 3.2,
      environment: 1.6,
      ambientColor: "#f8fafc",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f8fafc",
      gradient: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame06_technology.jpg",
      alt: "3D Surgical Robotic Arm",
      badge: "SURGICAL ROBOTICS 3D",
      caption: "7-DOF Articulated Arm with 0.01mm Tremor Damping",
      hotspots: [
        {
          id: "f6-1",
          x: 36,
          y: 36,
          title: "7-DOF Articulated Wrist",
          value: "< 0.01mm Tremor",
          detail: "Active micro-stabilization for delicate micro-vascular anastomosis.",
        },
        {
          id: "f6-2",
          x: 64,
          y: 58,
          title: "Optical Laser Sensor",
          value: "4K 3D Stereoscopic",
          detail: "Sub-surface anatomical landmark navigation and collision prevention.",
        },
      ],
    },
    text: {
      visible: true,
      position: "right",
      alignment: "left",
      badge: "ROBOTIC SURGICAL SUITE",
      headline: "TECHNOLOGY THAT MOVES MEDICINE FORWARD",
      subheadline: "7-DOF haptic microsurgical instruments with tremor elimination.",
      description: "Our autonomous microrobotic arms operate with sub-millimeter precision, allowing surgeons to execute microscopic vascular anastomoses through keyhole incisions.",
      metrics: [
        { label: "MOTION STABILIZATION", value: "0.01 mm", sublabel: "Active compensation" },
        { label: "DEGREE OF FREEDOM", value: "7 DOF", sublabel: "Articulated wrist" },
      ]
    },
    transition: {
      type: "zoom",
      ease: "power2.inOut",
    },
  },

  // FRAME 07 — MICROSCOPIC TREATMENT (0.68 - 0.80)
  {
    id: "treatment",
    name: "Precision In Every Treatment",
    index: 6,
    startProgress: 0.68,
    endProgress: 0.80,
    camera: {
      position: [-1.4, 0.3, 3.8],
      rotation: [-0.02, -0.15, 0],
      target: [0.5, 0, 0],
      fov: 35,
    },
    objects: [
      {
        id: "cellular-nano",
        position: [1.3, 0, 0],
        rotation: [0.3, 0.4, 0.1],
        scale: [1.35, 1.35, 1.35],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.5,
      fill: 2.4,
      rim: 3.0,
      environment: 1.5,
      ambientColor: "#f0fdfa",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f0fdfa",
      gradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame07_treatment.jpg",
      alt: "3D Cellular Nanoparticle Therapy",
      badge: "NANOMOLECULAR 3D",
      caption: "Lipid Nanoparticle Carrier Targeted Payload Release",
      hotspots: [
        {
          id: "f7-1",
          x: 38,
          y: 30,
          title: "Receptor Ligand Lock",
          value: "Kd = 1.2 nM",
          detail: "Targeted oncogenic cell membrane receptor docking with zero off-target binding.",
        },
        {
          id: "f7-2",
          x: 66,
          y: 62,
          title: "Lipid Nanoparticle Core",
          value: "45nm Envelope",
          detail: "Controlled-release bioactive therapeutic payload delivered via endocytosis.",
        },
      ],
    },
    text: {
      visible: true,
      position: "left",
      alignment: "left",
      badge: "NANOMOLECULAR THERAPEUTICS",
      headline: "PRECISION IN EVERY TREATMENT",
      subheadline: "Smart lipid-nanoparticles delivering targeted payloads directly to mutated cells.",
      description: "By bypassing healthy tissue and homing specifically into pathogen receptors, bio-active payloads achieve therapeutic efficacy at 1/10th the traditional systemic dosage.",
      metrics: [
        { label: "TARGETING SPECIFICITY", value: "99.4%", sublabel: "Receptor lock" },
        { label: "CELLULAR UPTAKE", value: "< 45s", sublabel: "Membrane transport" },
      ]
    },
    transition: {
      type: "morph",
      ease: "power2.inOut",
    },
  },

  // FRAME 08 — HEALTHCARE AI (0.80 - 0.90)
  {
    id: "healthcare-ai",
    name: "Intelligence Behind Better Decisions",
    index: 7,
    startProgress: 0.80,
    endProgress: 0.90,
    camera: {
      position: [1.8, 0.2, 5.2],
      rotation: [0, 0.2, 0],
      target: [-0.6, 0, 0],
      fov: 40,
    },
    objects: [
      {
        id: "neural-tensor-grid",
        position: [-1.4, 0, 0],
        rotation: [0.2, -0.3, 0],
        scale: [1.3, 1.3, 1.3],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.4,
      fill: 2.2,
      rim: 2.9,
      environment: 1.6,
      ambientColor: "#f0f9ff",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f0f9ff",
      gradient: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 50%, #ffffff 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame08_healthcare_ai.jpg",
      alt: "3D Medical AI Holographic Intelligence Interface",
      badge: "CLINICAL AI 3D • DEMO DATA",
      caption: "Real-Time Multimodal Tensor Reasoning Laboratory",
      hotspots: [
        {
          id: "f8-1",
          x: 38,
          y: 38,
          title: "Multimodal AI Tensor",
          value: "4.2ms Latency",
          detail: "12.4M clinical profile reference database evaluated in real-time.",
        },
        {
          id: "f8-2",
          x: 64,
          y: 64,
          title: "Predictive Health Index",
          value: "99.4% Specificity",
          detail: "Early anomaly detection and probabilistic recovery trajectory scoring.",
        },
      ],
    },
    text: {
      visible: true,
      position: "right",
      alignment: "left",
      badge: "PREDICTIVE CLINICAL AI • DEMO DATA",
      headline: "INTELLIGENCE BEHIND BETTER DECISIONS",
      subheadline: "Deep predictive learning trained on millions of multimodal clinical trajectories.",
      description: "Our neural transformer network cross-references genomic profiles, continuous vitals, and pharmacological response databases to provide clinicians with real-time probabilistic guidance.",
      metrics: [
        { label: "HEART RATE", value: "72 BPM", sublabel: "Telemetry (Fictional Demo)" },
        { label: "OXYGEN SATURATION", value: "98%", sublabel: "SpO2 (Fictional Demo)" },
        { label: "PREDICTIVE SCORE", value: "94%", sublabel: "Health Index (Demo)" },
      ]
    },
    transition: {
      type: "camera",
      ease: "power2.inOut",
    },
  },

  // FRAME 09 — PATIENT JOURNEY (0.90 - 0.96)
  {
    id: "patient-journey",
    name: "From Discovery To Recovery",
    index: 8,
    startProgress: 0.90,
    endProgress: 0.96,
    camera: {
      position: [0, 0.4, 5.8],
      rotation: [0.05, 0, 0],
      target: [0, 0, 0],
      fov: 42,
    },
    objects: [
      {
        id: "journey-pathway",
        position: [0, -0.4, 0],
        rotation: [0, 0, 0],
        scale: [1.2, 1.2, 1.2],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.5,
      fill: 2.4,
      rim: 2.8,
      environment: 1.6,
      ambientColor: "#f8fafc",
      keyColor: "#ffffff",
    },
    background: {
      color: "#f8fafc",
      gradient: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #ecfdf5 100%)",
      atmosphereDensity: 0.02,
    },
    image: {
      src: "/assets/3d/frame09_patient_journey.jpg",
      alt: "3D Futuristic Healthcare Recovery Pavilion",
      badge: "CARE CONTINUUM 3D",
      caption: "Biometric Milestone Portal Architecture",
      hotspots: [
        {
          id: "f9-1",
          x: 48,
          y: 50,
          title: "Biometric Ingestion Portal",
          value: "Continuous Stream",
          detail: "Passive ambulatory biometric capture coordinating end-to-end recovery.",
        },
      ],
    },
    text: {
      visible: true,
      position: "center",
      alignment: "center",
      badge: "END-TO-END CARE CONTINUUM",
      headline: "FROM DISCOVERY TO RECOVERY",
      subheadline: "A frictionless 3D pathway guiding patients through every recovery milestone.",
      description: "Symptoms are identified early through ambient telemetry, followed by micro-targeted therapies and personalized rehabilitative tracking.",
      metrics: [
        { label: "STEP 1", value: "SYMPTOMS", sublabel: "Early Sensing" },
        { label: "STEP 2", value: "DIAGNOSIS", sublabel: "Spectral Imaging" },
        { label: "STEP 3", value: "TREATMENT", sublabel: "Robotic Precision" },
        { label: "STEP 4", value: "RECOVERY", sublabel: "Restored Vigor" },
      ]
    },
    transition: {
      type: "camera",
      ease: "power2.inOut",
    },
  },

  // FRAME 10 — FINAL CTA (0.96 - 1.00)
  {
    id: "final-cta",
    name: "Build A Healthier Future",
    index: 9,
    startProgress: 0.96,
    endProgress: 1.00,
    camera: {
      position: [0, 0.6, 6.8],
      rotation: [0.03, 0, 0],
      target: [0, 0.1, 0],
      fov: 44,
    },
    objects: [
      {
        id: "beacon-symbol",
        position: [0, 1.6, 0],
        rotation: [0, 0.8, 0],
        scale: [1.3, 1.3, 1.3],
        opacity: 1,
      }
    ],
    lighting: {
      key: 3.8,
      fill: 2.6,
      rim: 3.4,
      environment: 1.7,
      ambientColor: "#ffffff",
      keyColor: "#ffffff",
    },
    background: {
      color: "#ffffff",
      gradient: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #f8fafc 100%)",
      atmosphereDensity: 0.01,
    },
    image: {
      src: "/assets/3d/frame10_final_cta.jpg",
      alt: "3D Platinum & Crystal Medical Cross Beacon",
      badge: "FUTURE LONGEVITY 3D",
      caption: "Crystalline Double Helix & Platinum Healthcare Emblem",
      hotspots: [
        {
          id: "f10-1",
          x: 50,
          y: 45,
          title: "Platinum Healthcare Emblem",
          value: "Global Standard",
          detail: "Intertwining scientific precision with human longevity and ethical care.",
        },
      ],
    },
    text: {
      visible: true,
      position: "center",
      alignment: "center",
      badge: "SHAPING MEDICINE FOR GENERATIONS",
      headline: "BUILD A HEALTHIER FUTURE",
      subheadline: "Technology can transform healthcare. Human care gives it meaning.",
      description: "Partner with our biomedical engineers, clinical scientists, and data architects to deploy next-generation medical platforms.",
      primaryCta: {
        label: "Start a Conversation",
        action: "open-contact",
      },
      secondaryCta: {
        label: "Explore Our Solutions",
        action: "explore-solutions",
      },
    },
    transition: {
      type: "camera",
      ease: "power3.inOut",
    },
  },
];
