import type {
  CriterionId,
  DomainId,
  EvidenceTag,
  GateId,
  LaneId,
  ScenarioId,
} from "../types";

/** Version 1.0 Global domain weights (Part 4.2). Sum to 1.00. */
export const GLOBAL_WEIGHTS: Record<CriterionId, number> = {
  outcome: 0.25,
  performance: 0.2,
  feasibility: 0.15,
  economics: 0.15,
  environment: 0.1,
  access: 0.1,
  risk: 0.05,
};

export const CRITERIA: { id: CriterionId; label: string; blurb: string }[] = [
  {
    id: "outcome",
    label: "Outcome value & classical sufficiency",
    blurb: "Does the result meet requirements, and does incremental quality produce material value?",
  },
  {
    id: "performance",
    label: "End-to-end performance",
    blurb: "Result quality, time to solution, throughput, success probability, scaling.",
  },
  {
    id: "feasibility",
    label: "Technical feasibility & scaling",
    blurb: "Algorithm-to-hardware pathway, full-stack resources, verifiability.",
  },
  {
    id: "economics",
    label: "Lifecycle economics",
    blurb: "Total cost, cost per valid result, transition cost, opportunity cost.",
  },
  {
    id: "environment",
    label: "Environmental resource efficiency",
    blurb: "Energy, carbon, water and material impacts within a declared boundary.",
  },
  {
    id: "access",
    label: "Access & delivery feasibility",
    blurb: "Hardware access, cloud substitutability, workforce, integration, institutions.",
  },
  {
    id: "risk",
    label: "Operational risk & governance",
    blurb: "Reliability, security, legal, vendor, roadmap and implementation risk.",
  },
];

/** Multiplier bounds for jurisdictional weight derivation (Part 6.3). */
export const MULTIPLIER_MIN = 0.75;
export const MULTIPLIER_MAX = 1.5;

/** ARS component weights (Part 7.1). */
export const ARS_WEIGHTS = { H: 0.25, C: 0.2, W: 0.2, I: 0.15, P: 0.1, R: 0.1 } as const;

export const ARS_COMPONENTS: { id: keyof typeof ARS_WEIGHTS; label: string }[] = [
  { id: "H", label: "Hardware availability" },
  { id: "C", label: "Cloud substitutability" },
  { id: "W", label: "Workforce & ecosystem" },
  { id: "I", label: "Enabling infrastructure" },
  { id: "P", label: "Institutional accessibility" },
  { id: "R", label: "Resilience & diversity" },
];

/** ROV component weights (Part 8.1). */
export const ROV_WEIGHTS = { U: 0.25, P: 0.2, V: 0.2, S: 0.15, J: 0.1, K: 0.1 } as const;

export const ROV_COMPONENTS: { id: keyof typeof ROV_WEIGHTS; label: string }[] = [
  { id: "U", label: "Upside magnitude" },
  { id: "P", label: "Pathway plausibility" },
  { id: "V", label: "Value of information" },
  { id: "S", label: "Spillover & reusability" },
  { id: "J", label: "Strategic alignment" },
  { id: "K", label: "Research economics" },
];

/** ECI dimension weights (Part 9.1). */
export const ECI_WEIGHTS = { D: 0.2, B: 0.2, V: 0.15, I: 0.15, R: 0.15, C: 0.1, T: 0.05 } as const;

export const ECI_COMPONENTS: { id: keyof typeof ECI_WEIGHTS; label: string }[] = [
  { id: "D", label: "Directness" },
  { id: "B", label: "Benchmark integrity" },
  { id: "V", label: "Validation maturity" },
  { id: "I", label: "Independence" },
  { id: "R", label: "Reproducibility" },
  { id: "C", label: "Consistency" },
  { id: "T", label: "Timeliness" },
];

/** Minimum weighted evidence coverage for an operational recommendation (Part 9.3). */
export const MIN_COVERAGE = 70;

/** QPS interpretation bands (Part 4.3). */
export const QPS_BANDS = [
  { min: 0, max: 34, label: "Strong classical preference" },
  { min: 35, max: 44, label: "Classical preference" },
  { min: 45, max: 55, label: "Parity / indeterminate" },
  { min: 56, max: 65, label: "Quantum preference" },
  { min: 66, max: 100, label: "Strong quantum preference" },
] as const;

export const ARS_BANDS = [
  { min: 80, label: "Ready" },
  { min: 60, label: "Viable" },
  { min: 40, label: "Constrained" },
  { min: 20, label: "Severely constrained" },
  { min: 0, label: "Inaccessible" },
] as const;

export const ECI_BANDS = [
  { min: 80, label: "High" },
  { min: 60, label: "Moderate" },
  { min: 40, label: "Low" },
  { min: 0, label: "Very low" },
] as const;

export const ROV_BANDS = [
  { min: 75, label: "Priority R&D" },
  { min: 60, label: "Scoped research" },
  { min: 40, label: "Monitor / cheap experiments" },
  { min: 0, label: "No dedicated program" },
] as const;

export interface LaneSpec {
  id: LaneId;
  label: string;
  rule: string;
  tone: "quantum" | "mixed" | "classical" | "caution";
}

/** Part 11.1 decision lanes with Version 1.0 default rules. */
export const LANES: Record<LaneId, LaneSpec> = {
  deploy: {
    id: "deploy",
    label: "Production deployment",
    rule: "All gates pass · QPS lower bound ≥ 56 · ARS ≥ 75 · ECI ≥ 75 · TRL ≥ 7",
    tone: "quantum",
  },
  pilot: {
    id: "pilot",
    label: "Operational pilot",
    rule: "Pilot gates pass · central QPS ≥ 56 · ARS ≥ 60 · ECI ≥ 60 · TRL ≥ 5",
    tone: "quantum",
  },
  validate: {
    id: "validate",
    label: "Targeted validation",
    rule: "QPS interval crosses parity or a critical benchmark gap remains — commission the smallest decisive test",
    tone: "mixed",
  },
  prepare: {
    id: "prepare",
    label: "Prepare / partner",
    rule: "Crossover credible and lead time matters, but access or readiness prevents operational use · ROV ≥ 60",
    tone: "mixed",
  },
  research: {
    id: "research",
    label: "Priority research",
    rule: "ROV ≥ 75 with a testable pathway, regardless of current operational QPS",
    tone: "mixed",
  },
  monitor: {
    id: "monitor",
    label: "Monitor",
    rule: "Classical remains sufficient · ROV 40–59 or crossover depends on external milestones",
    tone: "classical",
  },
  classical: {
    id: "classical",
    label: "Classical default",
    rule: "Classical clears requirements · QPS upper bound ≤ 44 · ROV < 60",
    tone: "classical",
  },
  insufficient: {
    id: "insufficient",
    label: "Insufficient evidence",
    rule: "Critical evidence missing, weighted coverage < 70%, or equivalence cannot be established",
    tone: "caution",
  },
};

export const GATES: { id: GateId; label: string; pass: string }[] = [
  { id: "G1", label: "Problem equivalence", pass: "Alternatives address the same task, scale, instance family and threshold" },
  { id: "G2", label: "Minimum outcome", pass: "Alternative meets the non-negotiable accuracy / safety / latency threshold" },
  { id: "G3", label: "Quantum mechanism", pass: "A specific, traceable mechanism supports the quantum pathway" },
  { id: "G4", label: "Resource pathway", pass: "A resource estimate connects algorithm to hardware and full-stack execution" },
  { id: "G5", label: "Access / legal / security", pass: "No prohibitive access, sovereignty, data or procurement constraint" },
  { id: "G6", label: "Deployment evidence", pass: "All critical operational domains have sufficient evidence and coverage" },
];

export const EVIDENCE_TAGS: Record<
  EvidenceTag,
  { label: string; symbol: string; blurb: string }
> = {
  demonstrated: {
    label: "Demonstrated",
    symbol: "◆",
    blurb: "Measured result from physical or operational execution",
  },
  modeled: {
    label: "Modeled",
    symbol: "◇",
    blurb: "Estimate from theory, simulation, scaling or resource models",
  },
  community: {
    label: "Community synthesis",
    symbol: "◈",
    blurb: "Judgment derived from multiple sources, roadmaps or experts",
  },
  vendor: {
    label: "Vendor claim",
    symbol: "▽",
    blurb: "Provider-originated claim not independently validated",
  },
  unknown: {
    label: "Unknown",
    symbol: "?",
    blurb: "No defensible evidence — remains missing, never scored as unfavorable",
  },
};

export const SCENARIOS: { id: ScenarioId; label: string; blurb: string }[] = [
  {
    id: "current",
    label: "Current",
    blurb: "Best presently available classical and quantum/hybrid implementations",
  },
  {
    id: "near-term",
    label: "Near-term (1–3 yr)",
    blurb: "Defined scenario with explicit hardware, pricing, algorithm and access assumptions",
  },
  {
    id: "ftqc",
    label: "Application-relevant FTQC",
    blurb: "The logical qubits, error rates and runtime this use case actually requires — not FTQC as a generic switch",
  },
];

export const DOMAINS: Record<
  DomainId,
  { label: string; short: string; blurb: string }
> = {
  qssc: {
    label: "Quantum-Safe Security & Communications",
    short: "Security & Comms",
    blurb: "Quantum-era cryptography, key distribution and secure network infrastructure.",
  },
  materials: {
    label: "Molecular & Materials Simulation",
    short: "Molecules & Materials",
    blurb: "Electronic-structure simulation for catalysts, batteries, sorbents and new materials.",
  },
  energy: {
    label: "Energy",
    short: "Energy",
    blurb: "Grid optimization, energy-system planning and market risk computation.",
  },
};

export const bandFor = <T extends { min: number }>(
  bands: readonly T[],
  score: number,
): T => bands.find((b) => score >= b.min) ?? bands[bands.length - 1];

export const qpsBandFor = (score: number) =>
  QPS_BANDS.find((b) => score >= b.min && score <= b.max) ?? QPS_BANDS[2];
