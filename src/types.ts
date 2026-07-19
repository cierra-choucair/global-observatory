/** Core data model for the Observatory demo, mirroring the
 *  Universum Labs Classical–Quantum Pursuit Framework v1.0. */

export type DomainId = "qssc" | "materials" | "energy";

export type AlternativeType =
  | "classical"
  | "quantum"
  | "hybrid"
  | "quantum-inspired";

/** Part 9.2 evidence tags. */
export type EvidenceTag =
  | "demonstrated"
  | "modeled"
  | "community"
  | "vendor"
  | "unknown";

export type ScenarioId = "current" | "near-term" | "ftqc";

export type GateId = "G1" | "G2" | "G3" | "G4" | "G5" | "G6";
export type GateState = "pass" | "conditional" | "fail";

/** Part 11.1 decision lanes. */
export type LaneId =
  | "deploy"
  | "pilot"
  | "validate"
  | "prepare"
  | "research"
  | "monitor"
  | "classical"
  | "insufficient";

/** Part 4.2 operational scoring domains. */
export type CriterionId =
  | "outcome"
  | "performance"
  | "feasibility"
  | "economics"
  | "environment"
  | "access"
  | "risk";

/** Low / central / high transformed value (0..1), per Part 4.4. */
export interface Triple {
  low: number;
  central: number;
  high: number;
}

export interface DomainScore {
  value: Triple;
  evidence: EvidenceTag;
  note: string;
}

export interface AlternativeEval {
  id: string;
  type: AlternativeType;
  name: string;
  approach: string;
  trl: number;
  scores: Record<CriterionId, DomainScore>;
  /** Additive shift applied to the whole triple for a future scenario. */
  scenarioDeltas?: Partial<Record<ScenarioId, Partial<Record<CriterionId, number>>>>;
}

/** ARS components (Part 7), each 0..100. */
export interface ArsComponents {
  H: number; // hardware availability
  C: number; // cloud substitutability
  W: number; // workforce & ecosystem
  I: number; // enabling infrastructure
  P: number; // institutional accessibility
  R: number; // resilience & diversity
}

/** ROV components (Part 8), each 0..100. */
export interface RovComponents {
  U: number; // upside magnitude
  P: number; // pathway plausibility
  V: number; // value of information
  S: number; // spillover & reusability
  J: number; // strategic alignment
  K: number; // research economics & stageability
}

/** ECI dimensions (Part 9), each 0..100. */
export interface EciComponents {
  D: number; // directness
  B: number; // benchmark integrity
  V: number; // validation maturity
  I: number; // independence
  R: number; // reproducibility
  C: number; // consistency
  T: number; // timeliness
}

export interface GateRecord {
  state: GateState;
  note: string;
}

export interface EvidenceClaim {
  text: string;
  tag: EvidenceTag;
  source: string;
}

export interface Keyframe {
  scenario: ScenarioId;
  trigger: string;
  predictedState: string;
  dependency: string;
}

export interface UseCase {
  id: string;
  domain: DomainId;
  title: string;
  short: string;
  problem: string;
  owner: string;
  scale: string;
  outcomeThreshold: string;
  frequency: string;
  horizon: string;
  mechanism: {
    primitive: string;
    source: string;
    description: string;
  };
  alternatives: AlternativeEval[];
  /** Alternative ids used for the headline QPS comparison. */
  comparison: { classical: string; quantum: string };
  gates: Record<GateId, GateRecord>;
  gateOverrides?: Partial<
    Record<ScenarioId, Partial<Record<GateId, GateRecord>>>
  >;
  /** Per-use-case ceilings on jurisdiction ARS components
   *  (e.g. QKD is never cloud-substitutable). */
  arsCaps?: Partial<ArsComponents>;
  /** Per-use-case floors, for modalities far easier to access than QPU time
   *  (e.g. QRNG appliances are commercially shipped worldwide). */
  arsFloors?: Partial<ArsComponents>;
  rov: RovComponents;
  eci: EciComponents;
  /** Weighted evidence coverage, % (Part 9.3). */
  coverage: number;
  evidenceClaims: EvidenceClaim[];
  keyframes: Keyframe[];
  crossoverTriggers: string[];
  crossoverCredible: boolean;
  drivers: string[];
  sensitivity: string[];
  summary: string;
}

export interface PriorityNote {
  criterion: CriterionId;
  level: number; // 0..4 evidence level (Part 6.3)
  label: string;
  basis: string;
}

export interface Jurisdiction {
  id: string;
  name: string;
  flag: string;
  blurb: string;
  profileVersion: string;
  ars: ArsComponents;
  condMultipliers: Partial<Record<CriterionId, number>>;
  priorityMultipliers: Partial<Record<CriterionId, number>>;
  priorityNotes: PriorityNote[];
  /** Added to the ROV strategic-alignment component J (Part 8.4). */
  rovAlignmentBoost: number;
  sources: string[];
}
