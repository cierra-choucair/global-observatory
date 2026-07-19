import {
  CATEGORY_META,
  CONFIDENCE_META,
  DATA_STATUS_META,
  EVIDENCE_META,
  HORIZON_META,
  PROVENANCE_META,
} from "../data/labels";
import type {
  ConfidenceBand,
  DataStatus,
  EvidenceStatus,
  HorizonId,
  Provenance,
  PursuitCategory,
} from "../types";

const TONE_DOT: Record<string, string> = {
  quantum: "var(--accent)",
  mixed: "var(--violet)",
  classical: "var(--classical)",
  caution: "var(--serious)",
};

/** Public pursuit-category badge. Tooltip carries interpretation only. */
export function CategoryBadge({
  category,
  compact = false,
}: {
  category: PursuitCategory;
  compact?: boolean;
}) {
  const meta = CATEGORY_META[category];
  return (
    <span className={`chip lane-${meta.tone}${compact ? " chip-sm" : ""}`} title={meta.blurb}>
      <span className="dot" style={{ background: TONE_DOT[meta.tone] }} />
      {meta.label}
    </span>
  );
}

export function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  const meta = EVIDENCE_META[status];
  return (
    <span className={`evidence-chip tag-${status}`} title={meta.blurb}>
      <span className="sym">{meta.symbol}</span>
      {meta.label}
    </span>
  );
}

export function ConfidenceBadge({ band }: { band: ConfidenceBand }) {
  const meta = CONFIDENCE_META[band];
  return (
    <span className="evidence-chip" title={meta.blurb}>
      <span className="sym conf">{band === "high" ? "●●●" : band === "moderate" ? "●●○" : band === "low" ? "●○○" : "○○○"}</span>
      {meta.label}
    </span>
  );
}

export function HorizonBadge({ horizon }: { horizon: HorizonId }) {
  return (
    <span className="evidence-chip" title={HORIZON_META[horizon].label}>
      {HORIZON_META[horizon].short}
    </span>
  );
}

export function ProvenanceBadge({ p }: { p: Provenance }) {
  return <span className={`prov-chip prov-${p}`}>{PROVENANCE_META[p]}</span>;
}

export function DataStatusBadge({ status }: { status: DataStatus }) {
  return (
    <span className={`status-chip ds-${status}`} title={DATA_STATUS_META[status].blurb}>
      {DATA_STATUS_META[status].label}
    </span>
  );
}

export function SampleTag() {
  return <span className="sample-tag">Sample data</span>;
}

export function FreshnessTag({ date }: { date: string }) {
  return <span className="fresh-tag">Updated {date}</span>;
}
