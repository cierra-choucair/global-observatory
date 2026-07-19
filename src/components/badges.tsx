import { EVIDENCE_TAGS, LANES } from "../framework/spec";
import type { AlternativeType, EvidenceTag, GateState, LaneId } from "../types";

const LANE_DOT: Record<string, string> = {
  quantum: "var(--accent)",
  mixed: "#4a3aa7",
  classical: "var(--classical)",
  caution: "var(--serious)",
};

export function LaneBadge({ lane, title }: { lane: LaneId; title?: string }) {
  const spec = LANES[lane];
  return (
    <span className={`chip lane-${spec.tone}`} title={title ?? spec.rule}>
      <span className="dot" style={{ background: LANE_DOT[spec.tone] }} />
      {spec.label}
    </span>
  );
}

export function EvidenceChip({ tag }: { tag: EvidenceTag }) {
  const spec = EVIDENCE_TAGS[tag];
  return (
    <span className={`evidence-chip tag-${tag}`} title={spec.blurb}>
      <span className="sym">{spec.symbol}</span>
      {spec.label}
    </span>
  );
}

export const TYPE_COLOR: Record<AlternativeType, string> = {
  quantum: "var(--accent)",
  classical: "var(--classical)",
  hybrid: "var(--hybrid)",
  "quantum-inspired": "var(--qinspired)",
};

export const TYPE_LABEL: Record<AlternativeType, string> = {
  quantum: "Quantum",
  classical: "Classical",
  hybrid: "Hybrid",
  "quantum-inspired": "Quantum-inspired",
};

export function TypeChip({ type }: { type: AlternativeType }) {
  return (
    <span className="type-chip">
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: TYPE_COLOR[type],
          marginRight: 6,
        }}
      />
      {TYPE_LABEL[type]}
    </span>
  );
}

const GATE_SYMBOL: Record<GateState, string> = {
  pass: "✓",
  conditional: "!",
  fail: "✕",
};

export function GateStateDot({ state }: { state: GateState }) {
  return (
    <span
      className={`g-state ${state}`}
      title={state === "pass" ? "Pass" : state === "conditional" ? "Conditional" : "Fail"}
    >
      {GATE_SYMBOL[state]}
    </span>
  );
}
