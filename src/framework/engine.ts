import {
  ARS_WEIGHTS,
  ECI_WEIGHTS,
  GLOBAL_WEIGHTS,
  MIN_COVERAGE,
  MULTIPLIER_MAX,
  MULTIPLIER_MIN,
  ROV_WEIGHTS,
} from "./spec";
import type {
  AlternativeEval,
  ArsComponents,
  CriterionId,
  EciComponents,
  GateId,
  GateRecord,
  Jurisdiction,
  LaneId,
  RovComponents,
  ScenarioId,
  Triple,
  UseCase,
} from "../types";

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const clamp01 = (x: number) => clamp(x, 0, 1);

export type Weights = Record<CriterionId, number>;

/** wᴸ = Normalize[wᵍ ⊙ m_cond ⊙ m_priority], multipliers bounded 0.75–1.50 (Part 6.3). */
export function deriveLocalWeights(
  cond: Partial<Record<CriterionId, number>>,
  priority: Partial<Record<CriterionId, number>>,
): Weights {
  const raw = {} as Weights;
  let total = 0;
  for (const id of Object.keys(GLOBAL_WEIGHTS) as CriterionId[]) {
    const m =
      clamp(cond[id] ?? 1, MULTIPLIER_MIN, MULTIPLIER_MAX) *
      clamp(priority[id] ?? 1, MULTIPLIER_MIN, MULTIPLIER_MAX);
    raw[id] = GLOBAL_WEIGHTS[id] * m;
    total += raw[id];
  }
  for (const id of Object.keys(raw) as CriterionId[]) raw[id] /= total;
  return raw;
}

/** ARS = 0.25H + 0.20C + 0.20W + 0.15I + 0.10P + 0.10R (Part 7.1),
 *  with per-use-case component ceilings (e.g. QKD is not cloud-substitutable). */
export function computeArs(
  base: ArsComponents,
  caps?: Partial<ArsComponents>,
  floors?: Partial<ArsComponents>,
): { score: number; components: ArsComponents } {
  const c: ArsComponents = { ...base };
  if (caps) {
    for (const k of Object.keys(caps) as (keyof ArsComponents)[]) {
      c[k] = Math.min(c[k], caps[k]!);
    }
  }
  if (floors) {
    for (const k of Object.keys(floors) as (keyof ArsComponents)[]) {
      c[k] = Math.max(c[k], floors[k]!);
    }
  }
  const score =
    ARS_WEIGHTS.H * c.H +
    ARS_WEIGHTS.C * c.C +
    ARS_WEIGHTS.W * c.W +
    ARS_WEIGHTS.I * c.I +
    ARS_WEIGHTS.P * c.P +
    ARS_WEIGHTS.R * c.R;
  return { score, components: c };
}

export function computeRov(r: RovComponents, alignmentBoost = 0): number {
  const J = clamp(r.J + alignmentBoost, 0, 100);
  return (
    ROV_WEIGHTS.U * r.U +
    ROV_WEIGHTS.P * r.P +
    ROV_WEIGHTS.V * r.V +
    ROV_WEIGHTS.S * r.S +
    ROV_WEIGHTS.J * J +
    ROV_WEIGHTS.K * r.K
  );
}

export function computeEci(e: EciComponents): number {
  return (
    ECI_WEIGHTS.D * e.D +
    ECI_WEIGHTS.B * e.B +
    ECI_WEIGHTS.V * e.V +
    ECI_WEIGHTS.I * e.I +
    ECI_WEIGHTS.R * e.R +
    ECI_WEIGHTS.C * e.C +
    ECI_WEIGHTS.T * e.T
  );
}

/** Criterion triple for an alternative under a scenario, with additive
 *  scenario deltas clamped to [0, 1]. */
export function scenarioValue(
  alt: AlternativeEval,
  criterion: CriterionId,
  scenario: ScenarioId,
): Triple {
  const base = alt.scores[criterion].value;
  const delta = alt.scenarioDeltas?.[scenario]?.[criterion] ?? 0;
  return {
    low: clamp01(base.low + delta),
    central: clamp01(base.central + delta),
    high: clamp01(base.high + delta),
  };
}

export interface UtilityOptions {
  scenario: ScenarioId;
  weights: Weights;
  /** When set, replaces the access criterion value with the local ARS (÷100). */
  localAccess?: number;
}

/** Sₐ = 100 × Σ wᵢ · vᵢ (Part 4.1), propagated over low/central/high. */
export function computeUtility(alt: AlternativeEval, opts: UtilityOptions): Triple {
  let low = 0;
  let central = 0;
  let high = 0;
  for (const id of Object.keys(opts.weights) as CriterionId[]) {
    const w = opts.weights[id];
    let v = scenarioValue(alt, id, opts.scenario);
    if (id === "access" && opts.localAccess !== undefined) {
      const a = clamp01(opts.localAccess);
      // Keep the authored interval width so localization does not fake certainty.
      const half = (v.high - v.low) / 2;
      v = {
        low: clamp01(a - half),
        central: a,
        high: clamp01(a + half),
      };
    }
    low += w * v.low;
    central += w * v.central;
    high += w * v.high;
  }
  return { low: low * 100, central: central * 100, high: high * 100 };
}

/** QPS = clip[50 + ΔQC/2] with conservative interval propagation:
 *  ΔQC⁻ = SQ⁻ − SC⁺ and ΔQC⁺ = SQ⁺ − SC⁻ (Part 4.4). */
export function computeQps(sq: Triple, sc: Triple): Triple {
  return {
    low: clamp(50 + (sq.low - sc.high) / 2, 0, 100),
    central: clamp(50 + (sq.central - sc.central) / 2, 0, 100),
    high: clamp(50 + (sq.high - sc.low) / 2, 0, 100),
  };
}

export function gateState(
  uc: UseCase,
  gate: GateId,
  scenario: ScenarioId,
): GateRecord {
  return uc.gateOverrides?.[scenario]?.[gate] ?? uc.gates[gate];
}

export interface PursuitProfile {
  scenario: ScenarioId;
  jurisdiction: Jurisdiction | null;
  weights: Weights;
  classicalUtility: Triple;
  quantumUtility: Triple;
  qps: Triple;
  ars: number;
  arsComponents: ArsComponents;
  rov: number;
  eci: number;
  coverage: number;
  quantumTrl: number;
  gates: Record<GateId, GateRecord>;
  lane: LaneId;
  laneReasons: string[];
}

export interface EvaluateOptions {
  scenario: ScenarioId;
  jurisdiction?: Jurisdiction | null;
  /** What-if overrides on the jurisdiction's priority multipliers. */
  priorityOverrides?: Partial<Record<CriterionId, number>>;
}

const GATE_IDS: GateId[] = ["G1", "G2", "G3", "G4", "G5", "G6"];

/** Full evaluation of a use case: utilities, QPS, companion indicators and
 *  decision lane, globally or under a jurisdiction profile. */
export function evaluate(uc: UseCase, opts: EvaluateOptions): PursuitProfile {
  const j = opts.jurisdiction ?? null;
  const weights = j
    ? deriveLocalWeights(j.condMultipliers, {
        ...j.priorityMultipliers,
        ...opts.priorityOverrides,
      })
    : opts.priorityOverrides && Object.keys(opts.priorityOverrides).length > 0
      ? deriveLocalWeights({}, opts.priorityOverrides)
      : { ...GLOBAL_WEIGHTS };

  // Reference-scenario access when no jurisdiction is selected: the use case's
  // authored global access value stands. Locally, ARS replaces it.
  const arsBase: ArsComponents = j
    ? j.ars
    : { H: 65, C: 70, W: 60, I: 70, P: 60, R: 55 }; // fixed global reference profile
  const { score: ars, components: arsComponents } = computeArs(
    arsBase,
    uc.arsCaps,
    uc.arsFloors,
  );

  const classical = uc.alternatives.find((a) => a.id === uc.comparison.classical)!;
  const quantum = uc.alternatives.find((a) => a.id === uc.comparison.quantum)!;

  const localAccess = j ? ars / 100 : undefined;
  const sc = computeUtility(classical, { scenario: opts.scenario, weights });
  const sq = computeUtility(quantum, {
    scenario: opts.scenario,
    weights,
    localAccess,
  });
  const qps = computeQps(sq, sc);

  const rov = computeRov(uc.rov, j?.rovAlignmentBoost ?? 0);
  const eci = computeEci(uc.eci);

  const gates = {} as Record<GateId, GateRecord>;
  for (const g of GATE_IDS) gates[g] = gateState(uc, g, opts.scenario);

  const { lane, laneReasons } = decideLane({
    qps,
    ars,
    rov,
    eci,
    coverage: uc.coverage,
    quantumTrl: quantum.trl,
    gates,
    crossoverCredible: uc.crossoverCredible,
  });

  return {
    scenario: opts.scenario,
    jurisdiction: j,
    weights,
    classicalUtility: sc,
    quantumUtility: sq,
    qps,
    ars,
    arsComponents,
    rov,
    eci,
    coverage: uc.coverage,
    quantumTrl: quantum.trl,
    gates,
    lane,
    laneReasons,
  };
}

interface LaneInputs {
  qps: Triple;
  ars: number;
  rov: number;
  eci: number;
  coverage: number;
  quantumTrl: number;
  gates: Record<GateId, GateRecord>;
  crossoverCredible: boolean;
}

/** Part 11.1 Version 1.0 default lane rules, applied in order. */
export function decideLane(x: LaneInputs): { lane: LaneId; laneReasons: string[] } {
  const failed = GATE_IDS.filter((g) => x.gates[g].state === "fail");
  const allPass = GATE_IDS.every((g) => x.gates[g].state === "pass");
  const pilotGatesOk = GATE_IDS.every(
    (g) => g === "G6" || x.gates[g].state !== "fail",
  );

  if (x.coverage < MIN_COVERAGE || x.gates.G1.state === "fail") {
    return {
      lane: "insufficient",
      laneReasons: [
        x.coverage < MIN_COVERAGE
          ? `Weighted evidence coverage ${x.coverage}% is below the ${MIN_COVERAGE}% floor`
          : "Problem equivalence (G1) cannot be established",
        "No operational recommendation may be issued (Part 9.3)",
      ],
    };
  }

  if (
    allPass &&
    x.qps.low >= 56 &&
    x.ars >= 75 &&
    x.eci >= 75 &&
    x.quantumTrl >= 7
  ) {
    return {
      lane: "deploy",
      laneReasons: [
        "All gates pass; QPS lower bound stays in the quantum-preference band",
        `ARS ${x.ars.toFixed(0)} ≥ 75 · ECI ${x.eci.toFixed(0)} ≥ 75 · TRL ${x.quantumTrl} ≥ 7`,
      ],
    };
  }

  if (
    pilotGatesOk &&
    x.qps.central >= 56 &&
    x.ars >= 60 &&
    x.eci >= 60 &&
    x.quantumTrl >= 5
  ) {
    return {
      lane: "pilot",
      laneReasons: [
        "Central QPS reaches the quantum-preference band and pilot gates pass",
        `ARS ${x.ars.toFixed(0)} ≥ 60 · ECI ${x.eci.toFixed(0)} ≥ 60 · TRL ${x.quantumTrl} ≥ 5`,
      ],
    };
  }

  if (x.qps.high >= 56 && x.qps.low < 56 && x.ars >= 60 && failed.length === 0) {
    return {
      lane: "validate",
      laneReasons: [
        `QPS interval [${x.qps.low.toFixed(0)}–${x.qps.high.toFixed(0)}] crosses parity`,
        "Commission the smallest decisive benchmark before committing",
      ],
    };
  }

  if (
    x.crossoverCredible &&
    x.rov >= 60 &&
    (x.ars < 60 || x.gates.G5.state !== "pass")
  ) {
    return {
      lane: "prepare",
      laneReasons: [
        "Crossover is credible and capability lead time matters",
        `Access or readiness blocks operational use today (ARS ${x.ars.toFixed(0)})`,
      ],
    };
  }

  if (x.rov >= 75) {
    return {
      lane: "research",
      laneReasons: [
        `ROV ${x.rov.toFixed(0)} ≥ 75 with a testable pathway`,
        "Research value is independent of today's operational verdict (Part 8)",
      ],
    };
  }

  if (x.qps.high <= 44 && x.rov < 60) {
    return {
      lane: "classical",
      laneReasons: [
        "Classical clears requirements; QPS upper bound stays in the classical band",
        `ROV ${x.rov.toFixed(0)} < 60 — no separate research case`,
      ],
    };
  }

  return {
    lane: "monitor",
    laneReasons: [
      "Classical remains sufficient for now",
      x.rov >= 40
        ? `ROV ${x.rov.toFixed(0)} supports inexpensive, highly informative experiments`
        : "Crossover depends primarily on external milestones",
    ],
  };
}
