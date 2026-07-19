/** Public data schema for the Observatory client.
 *
 *  IP boundary: this schema carries only FINAL public-facing outputs of the
 *  Universum Labs Classical–Quantum analysis (categories, display bands,
 *  confidence, evidence status, drivers, explanations, provenance, dates).
 *  It intentionally has no fields for weights, formulas, thresholds,
 *  multipliers, gate results, or intermediate values — the client cannot
 *  represent them, let alone display them. */

export type DomainId = "security" | "materials" | "energy";

export type HorizonId = "current" | "near" | "longer";

export type EvidenceStatus =
  | "demonstrated"
  | "pilot"
  | "modeled"
  | "theoretical"
  | "insufficient";

export type ConfidenceBand = "high" | "moderate" | "low" | "very-low";

/** Public-facing pursuit categories — output interpretations only. */
export type PursuitCategory =
  | "classical"
  | "hybrid"
  | "validation"
  | "research"
  | "quantum"
  | "prepare"
  | "monitor"
  | "insufficient";

export type Provenance =
  | "peer-reviewed"
  | "government"
  | "demonstrated"
  | "modeled"
  | "community"
  | "vendor"
  | "unverified"
  | "insufficient";

export type DataStatus = "comprehensive" | "partial" | "provisional" | "none";

export type CapabilityBand =
  | "extensive"
  | "strong"
  | "moderate"
  | "developing"
  | "limited"
  | "minimal";

/** Rounded display position on the classical–quantum spectrum (0–100 band
 *  with uncertainty range). A display indicator only — carries no scoring
 *  semantics beyond "left leans classical, right leans quantum". */
export interface Spectrum {
  position: number;
  low: number;
  high: number;
}

/** The minimal public result object returned by the analysis service. */
export interface PursuitProfilePublic {
  category: PursuitCategory;
  /** null when evidence is insufficient — never converted to a low position. */
  spectrum: Spectrum | null;
  confidence: ConfidenceBand;
  evidence: EvidenceStatus;
  horizon: HorizonId;
  /** Up to three public-facing result drivers, plain language. */
  drivers: string[];
  explanation: string;
  lastUpdated: string;
  version: string;
  provisional?: boolean;
}

export interface SourceRef {
  label: string;
  provenance: Provenance;
}

export interface UseCasePublic {
  id: string;
  domain: DomainId;
  title: string;
  oneLiner: string;
  problem: string;
  modality: string;
  applicationType: string;
  trl: number;
  maturityLabel: string;
  /** One profile per assessed horizon; the first entry is the default view. */
  profiles: PursuitProfilePublic[];
  classicalBaseline: string;
  quantumPathway: string;
  evidenceSummary: string;
  accessNotes: string[];
  activity: string[];
  coverage: { global: boolean; countries: string[] };
  policyImplications: string[];
  sources: SourceRef[];
  related: string[];
  lastUpdated: string;
}

export interface CapabilityEntry {
  area: string;
  band: CapabilityBand;
  note: string;
}

export interface RoadTourStatus {
  available: boolean;
  latest?: string;
  institutionType?: string;
  updatedCategories?: string[];
  verification?: "verified" | "self-reported" | "pending";
}

export interface DomainOutlook {
  domain: DomainId;
  profile: PursuitProfilePublic;
  relevantUseCases: string[];
}

export interface CountryNote {
  useCaseId: string;
  note: string;
  category?: PursuitCategory;
}

export interface CountryProfile {
  iso3: string;
  /** Numeric id used by the world-atlas TopoJSON. */
  mapId: string;
  name: string;
  region: string;
  dataStatus: DataStatus;
  lastUpdated: string;
  summary: string;
  strategies: string[];
  capabilities: CapabilityEntry[];
  programs: string[];
  deployments: string[];
  constraints: string[];
  sovereigntyNotes?: string;
  sources: SourceRef[];
  roadTour: RoadTourStatus;
  /** Empty for provisional profiles — shown as "not yet assessed". */
  outlooks: DomainOutlook[];
  countryUseCaseNotes: CountryNote[];
}

export type BriefAudience =
  | "ministry"
  | "regulator"
  | "economic"
  | "technical"
  | "research";

export interface BriefDraft {
  geoId: string | null;
  audience: BriefAudience | null;
  useCaseIds: string[];
  domains: DomainId[];
  title: string;
  executiveSummary: string;
  savedAt?: string;
}
