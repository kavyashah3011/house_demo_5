export interface HealthcareService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Diagnostic" | "Therapeutic" | "Robotic" | "Cognitive";
  metrics: { [key: string]: string };
}

export interface MedicalTechnology {
  id: string;
  name: string;
  category: string;
  specification: string;
  status: "In Clinical Trial" | "FDA Cleared" | "Active Research";
  highlight: string;
}

export interface PatientJourneyStage {
  step: number;
  id: string;
  title: string;
  tagline: string;
  description: string;
  biomarkerFocus: string;
  clinicalOutcome: string;
}

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  interest: "Clinical Partnership" | "Technology Licensing" | "Research Collaboration" | "General Inquiry";
  message: string;
}

export const NAVIGATION_LINKS = [
  { label: "About", href: "#hero", frameIndex: 0 },
  { label: "Anatomy", href: "#human-body", frameIndex: 1 },
  { label: "Cardio & Neural", href: "#heart", frameIndex: 2 },
  { label: "Diagnosis", href: "#diagnosis", frameIndex: 4 },
  { label: "Robotic Tech", href: "#technology", frameIndex: 5 },
  { label: "Nanomedicine", href: "#treatment", frameIndex: 6 },
  { label: "Healthcare AI", href: "#healthcare-ai", frameIndex: 7 },
  { label: "Patient Journey", href: "#patient-journey", frameIndex: 8 },
  { label: "Contact", href: "#final-cta", frameIndex: 9 },
];

export const PATIENT_JOURNEY_STAGES: PatientJourneyStage[] = [
  {
    step: 1,
    id: "symptoms",
    title: "1. Early Detection & Telemetry",
    tagline: "Micro-fluctuations captured passively before symptoms manifest",
    description: "Sub-harmonic acoustic sensors and biochemical sweat patches detect cellular stress signatures months before clinical symptomatic manifestation.",
    biomarkerFocus: "Cytokine elevation, micro-arrhythmia cadence",
    clinicalOutcome: "Early stage warning window widened by 14 months",
  },
  {
    step: 2,
    id: "diagnosis",
    title: "2. Computational Diagnostic Scan",
    tagline: "Spectral multi-slice tomography with automated voxel segmentation",
    description: "Digital twin reconstructed in volumetric 3D at 0.2mm resolution. Machine learning ensembles highlight anomalies and correlate with genomic markers.",
    biomarkerFocus: "Spatial voxel density, micro-calcification clusters",
    clinicalOutcome: "99.8% diagnostic specificity across 140+ conditions",
  },
  {
    step: 3,
    id: "treatment",
    title: "3. Robotic & Nanoscale Therapeutics",
    tagline: "Sub-millimeter robotic dexterity paired with targeted lipid nanoparticles",
    description: "Surgeons employ 7-DOF haptic robotic arms while bio-engineered nanocapsules deliver active pharmacophores exclusively to pathological cellular receptors.",
    biomarkerFocus: "Receptor locking fidelity, localized payload release",
    clinicalOutcome: "Healthy tissue spared, postoperative recovery cut by 68%",
  },
  {
    step: 4,
    id: "recovery",
    title: "4. Cognitive & Physiological Recovery",
    tagline: "Continuous closed-loop rehabilitation and digital twin recalibration",
    description: "Non-invasive neuroplastic stimulation and wearable bio-telemetry monitor tissue remodeling and vital stabilization around the clock.",
    biomarkerFocus: "Heart rate variability (HRV), synaptic coherence",
    clinicalOutcome: "Restored baseline vitality and long-term vitality retention",
  },
];

export const MEDICAL_TECHNOLOGY_SPECS: MedicalTechnology[] = [
  {
    id: "dexterity-arm",
    name: "Aetheria EndoBot X9",
    category: "Surgical Robotics",
    specification: "7-DOF articulated wrist • 0.01mm tremor damping",
    status: "FDA Cleared",
    highlight: "Autonomous soft-tissue suturing with continuous tactile feedback",
  },
  {
    id: "spectral-scanner",
    name: "OmniScan Multi-Spectral MRI",
    category: "Diagnostic Tomography",
    specification: "140ms full-axial capture • 7.0 Tesla cryogenic core",
    status: "In Clinical Trial",
    highlight: "Real-time non-contrast cerebral angiography and perfusion mapping",
  },
  {
    id: "nano-carrier",
    name: "BioTarget NanoCapsule T4",
    category: "Targeted Therapeutics",
    specification: "45nm lipid-protein envelope • Receptor-triggered burst",
    status: "Active Research",
    highlight: "Selective endocytosis targeting mutated oncogenic cell surfaces",
  },
];
