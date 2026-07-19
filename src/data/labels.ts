import type {
  BriefAudience,
  CapabilityBand,
  ConfidenceBand,
  DataStatus,
  DomainId,
  EvidenceStatus,
  HorizonId,
  Provenance,
  PursuitCategory,
} from "../types";

export const DATA_VERSION = "Observatory sample dataset 2026.2";

export const DOMAINS: Record<DomainId, { label: string; short: string; blurb: string }> = {
  security: {
    label: "Quantum-Safe Communications & Security",
    short: "Security & Communications",
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
    blurb: "Grid optimization, energy-system planning and market-risk computation.",
  },
};

export const DOMAIN_IDS: DomainId[] = ["security", "materials", "energy"];

export const CATEGORY_META: Record<
  PursuitCategory,
  { label: string; tone: "classical" | "mixed" | "quantum" | "caution"; blurb: string }
> = {
  classical: {
    label: "Classical pathway currently preferred",
    tone: "classical",
    blurb: "The best credible classical approach currently meets the requirement more effectively.",
  },
  hybrid: {
    label: "Hybrid / complementary pathway",
    tone: "quantum",
    blurb: "A combined quantum–classical workflow is the most promising current route.",
  },
  validation: {
    label: "Targeted validation recommended",
    tone: "mixed",
    blurb: "The comparison is close or uncertain — an independent, decisive test is the next step.",
  },
  research: {
    label: "Quantum research opportunity",
    tone: "mixed",
    blurb: "No operational case today, but research or capability-building value is significant.",
  },
  quantum: {
    label: "Quantum pursuit opportunity",
    tone: "quantum",
    blurb: "The quantum pathway currently offers a material advantage for this application.",
  },
  prepare: {
    label: "Preparation & partnership recommended",
    tone: "mixed",
    blurb: "A future crossover is credible; groundwork and partnerships matter now.",
  },
  monitor: {
    label: "Monitor",
    tone: "classical",
    blurb: "Classical approaches remain sufficient; developments are tracked for defined triggers.",
  },
  insufficient: {
    label: "Insufficient evidence",
    tone: "caution",
    blurb: "The evidence base does not yet support an assessment — gaps are reported, not scored.",
  },
};

export const EVIDENCE_META: Record<
  EvidenceStatus,
  { label: string; symbol: string; blurb: string }
> = {
  demonstrated: {
    label: "Demonstrated",
    symbol: "◆",
    blurb: "Measured results from physical or operational execution",
  },
  pilot: {
    label: "Pilot-stage",
    symbol: "◈",
    blurb: "Operational pilots or field trials, not yet validated at scale",
  },
  modeled: {
    label: "Modeled",
    symbol: "◇",
    blurb: "Estimates from theory, simulation or resource models",
  },
  theoretical: {
    label: "Theoretical",
    symbol: "○",
    blurb: "Established in principle; no application-scale demonstration",
  },
  insufficient: {
    label: "Insufficient evidence",
    symbol: "?",
    blurb: "The evidence base does not support an assessment",
  },
};

export const CONFIDENCE_META: Record<ConfidenceBand, { label: string; blurb: string }> = {
  high: { label: "High confidence", blurb: "Strong, direct, independent and reproducible evidence" },
  moderate: { label: "Moderate confidence", blurb: "Decision-useful evidence with identifiable limitations" },
  low: { label: "Low confidence", blurb: "Preliminary, indirect or incomplete evidence" },
  "very-low": { label: "Very low confidence", blurb: "Speculative or materially deficient evidence" },
};

export const HORIZON_META: Record<HorizonId, { label: string; short: string }> = {
  current: { label: "Current", short: "Current" },
  near: { label: "Near term (1–3 years)", short: "Near term" },
  longer: { label: "Longer term (application-relevant fault-tolerant period)", short: "Longer term" },
};

export const PROVENANCE_META: Record<Provenance, string> = {
  "peer-reviewed": "Peer-reviewed",
  government: "Government / standards source",
  demonstrated: "Demonstrated",
  modeled: "Modeled",
  community: "Community synthesis",
  vendor: "Vendor-reported",
  unverified: "Unverified",
  insufficient: "Insufficient evidence",
};

export const CAPABILITY_BAND_META: Record<CapabilityBand, { label: string; rank: number }> = {
  extensive: { label: "Extensive", rank: 6 },
  strong: { label: "Strong", rank: 5 },
  moderate: { label: "Moderate", rank: 4 },
  developing: { label: "Developing", rank: 3 },
  limited: { label: "Limited", rank: 2 },
  minimal: { label: "Minimal", rank: 1 },
};

export const DATA_STATUS_META: Record<DataStatus, { label: string; blurb: string }> = {
  comprehensive: {
    label: "Assessed",
    blurb: "Country profile and all three domain outlooks available (sample data)",
  },
  partial: {
    label: "Partially assessed",
    blurb: "Country profile available; domain outlooks incomplete",
  },
  provisional: {
    label: "Provisional",
    blurb: "Preliminary profile pending validation; no domain outlooks yet",
  },
  none: {
    label: "Data not available",
    blurb: "No Observatory assessment for this country yet",
  },
};

export const AUDIENCE_META: Record<BriefAudience, { label: string; intro: string }> = {
  ministry: {
    label: "Ministry / diplomatic leadership",
    intro: "This brief supports ministerial decision-making on quantum-technology policy and investment.",
  },
  regulator: {
    label: "Regulator / standards body",
    intro: "This brief highlights standards, certification and regulatory implications of the analysis.",
  },
  economic: {
    label: "Economic development / investment authority",
    intro: "This brief focuses on investment readiness, capability-building and economic positioning.",
  },
  technical: {
    label: "Technical advisor",
    intro: "This brief provides the technical grounding behind each recommendation, with evidence labels throughout.",
  },
  research: {
    label: "Research / funding organization",
    intro: "This brief identifies research opportunities and capability investments supported by the analysis.",
  },
};

export const SAMPLE_DISCLOSURE =
  "Demonstration content: all assessments, country profiles and sources in this build are illustrative sample data, not real evaluations.";
