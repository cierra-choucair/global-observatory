import { ds } from "./helpers";
import type { UseCase } from "../types";

/** SAMPLE evaluations — illustrative data authored for the demo. */
export const ENERGY_USE_CASES: UseCase[] = [
  {
    id: "en-grid",
    domain: "energy",
    title: "National grid unit commitment & dispatch",
    short:
      "Day-ahead unit commitment at national scale — a stress test the classical baseline passes comfortably.",
    problem:
      "Solve day-ahead unit commitment and dispatch for a national grid (thousands of units, security constraints) within the market-clearing window, and decide whether any quantum approach warrants investment.",
    owner: "Transmission system operator / energy market operator",
    scale: "3,000–8,000 units, 24–48h horizon, security-constrained; solved daily",
    outcomeThreshold: "Feasible schedule within 0.5% of optimal cost, delivered inside the market window",
    frequency: "365 solves/year plus intraday re-dispatch",
    horizon: "Current",
    mechanism: {
      primitive: "QAOA / quantum annealing on QUBO reformulations",
      source: "Hypothesized; no accepted mechanism for advantage at scale",
      description:
        "Mapping unit commitment to QUBO discards structure MILP solvers exploit; no accepted theoretical mechanism predicts super-classical performance on this instance family.",
    },
    alternatives: [
      {
        id: "c-milp",
        type: "classical",
        name: "Commercial MILP + heuristics",
        approach: "Branch-and-cut MILP with decomposition and warm starts on commodity HPC",
        trl: 9,
        scores: {
          outcome: ds(0.8, 0.85, 0.9, "demonstrated", "Solves national-scale UC to <0.5% gap inside the market window"),
          performance: ds(0.8, 0.85, 0.9, "demonstrated", "Continual solver improvements"),
          feasibility: ds(0.92, 0.95, 0.97, "demonstrated", "Decades of operational hardening"),
          economics: ds(0.8, 0.85, 0.9, "demonstrated", "License + modest HPC"),
          environment: ds(0.8, 0.85, 0.9, "modeled", "Negligible vs. grid impact"),
          access: ds(0.87, 0.9, 0.93, "demonstrated", "Universal"),
          risk: ds(0.8, 0.85, 0.9, "demonstrated", "Proven operational reliability"),
        },
        scenarioDeltas: {
          "near-term": { performance: 0.02 },
          ftqc: { performance: 0.03 },
        },
      },
      {
        id: "q-qaoa",
        type: "quantum",
        name: "QAOA / annealing pathway",
        approach: "QUBO reformulation on gate-model QAOA or annealing hardware",
        trl: 4,
        scores: {
          outcome: ds(0.3, 0.4, 0.5, "demonstrated", "Feasible only on toy subproblems; no advantage at scale"),
          performance: ds(0.2, 0.3, 0.4, "demonstrated", "Orders of magnitude off operational requirements"),
          feasibility: ds(0.25, 0.35, 0.45, "modeled", "Constraint encoding overhead dominates"),
          economics: ds(0.2, 0.3, 0.4, "modeled", "QPU access cost without offsetting value"),
          environment: ds(0.35, 0.45, 0.55, "modeled", "Boundary-dependent"),
          access: ds(0.5, 0.6, 0.7, "community", "Cloud-accessible hardware exists"),
          risk: ds(0.4, 0.5, 0.6, "community", "Vendor and roadmap risk"),
        },
        scenarioDeltas: {
          "near-term": { performance: 0.05, feasibility: 0.05 },
          ftqc: { outcome: 0.25, performance: 0.25, feasibility: 0.2, economics: 0.15 },
        },
      },
    ],
    comparison: { classical: "c-milp", quantum: "q-qaoa" },
    gates: {
      G1: { state: "pass", note: "Same instance family and market-window requirement" },
      G2: { state: "fail", note: "No quantum configuration meets operational requirements at scale" },
      G3: { state: "conditional", note: "No accepted mechanism for advantage on constrained integer programs" },
      G4: { state: "conditional", note: "Resource pathway modeled on QUBO embeddings" },
      G5: { state: "pass", note: "No constraint" },
      G6: { state: "conditional", note: "Benchmark evidence only" },
    },
    rov: { U: 60, P: 45, V: 55, S: 55, J: 55, K: 60 },
    eci: { D: 75, B: 80, V: 70, I: 70, R: 65, C: 70, T: 75 },
    coverage: 84,
    evidenceClaims: [
      { text: "Commercial MILP solves national-scale UC to <0.5% gap within operational windows", tag: "demonstrated", source: "TSO operational reports (sample)" },
      { text: "QAOA depth required for constraint satisfaction exceeds near-term coherence budgets", tag: "modeled", source: "Peer-reviewed circuit analyses (sample)" },
      { text: "Annealing results on UC subproblems match but do not beat tuned classical heuristics", tag: "demonstrated", source: "Independent benchmark studies (sample)" },
      { text: "No accepted theoretical mechanism predicts super-quadratic advantage on this class", tag: "community", source: "Complexity-theory synthesis (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "Larger annealers; QAOA error mitigation improves", predictedState: "Gap narrows slightly; verdict unchanged", dependency: "Hardware-gated" },
      { scenario: "ftqc", trigger: "Optimistic fault-tolerant assumptions", predictedState: "Even then MILP remains preferred for this instance family", dependency: "Hardware + algorithm-gated" },
    ],
    crossoverTriggers: [
      "A proven quantum scaling advantage on constrained integer programs",
      "Stochastic renewable-driven UC instances growing 100× beyond MILP tractability",
    ],
    crossoverCredible: false,
    drivers: [
      "Classical sufficiency: requirements met with margin",
      "Absence of a credible quantum mechanism (G3)",
      "Quantum economics without offsetting value",
    ],
    sensitivity: [
      "Verdict robust: no plausible weight or value change flips the lane",
      "Re-evaluate only if instance structure changes fundamentally (massive stochastic UC)",
    ],
    summary:
      "Unit commitment is the portfolio's clearest classical default: commercial MILP meets the operational requirement with margin, and no accepted mechanism gives quantum an advantage on this problem class — a conclusion that holds even under optimistic fault-tolerant assumptions. Research option value is modest, so no dedicated program is warranted. The Observatory records the two triggers that would reopen the file: a proven scaling advantage on constrained integer programs, or a structural explosion in stochastic instances beyond MILP tractability. Evidence confidence is high — this negative verdict is one of the best-evidenced results in the portfolio.",
  },

  {
    id: "en-cooling",
    domain: "energy",
    title: "District cooling network optimization",
    short:
      "Real-time re-optimization of district cooling — wide uncertainty driven by vendor benchmarks demands a decisive test.",
    problem:
      "Re-optimize chiller dispatch and network setpoints for large district cooling systems every 15 minutes; the classical MILP times out on the largest networks, costing an estimated 8–12% excess pumping and chilling energy.",
    owner: "District cooling utility / municipal energy authority",
    scale: "Networks of 50–200 plants and substations; 15-minute re-optimization cycle",
    outcomeThreshold: "Feasible setpoints within the 15-minute window at ≤2% cost above optimal",
    frequency: "~35,000 optimization cycles per year per network",
    horizon: "Current → near-term",
    mechanism: {
      primitive: "Quantum annealing on QUBO-embedded dispatch problems",
      source: "Vendor-demonstrated; independent validation absent",
      description:
        "Annealing samples low-energy configurations of the embedded dispatch QUBO; plausible for this topology, but embedding overhead is disputed and reported speedups were measured against unoptimized baselines.",
    },
    alternatives: [
      {
        id: "c-milp2",
        type: "classical",
        name: "MILP with rolling horizon",
        approach: "Commercial MILP, rolling-horizon decomposition",
        trl: 9,
        scores: {
          outcome: ds(0.5, 0.55, 0.6, "demonstrated", "Times out on largest networks — 8–12% excess energy vs. optimal"),
          performance: ds(0.55, 0.6, 0.65, "demonstrated", "Window violations on peak days"),
          feasibility: ds(0.87, 0.9, 0.93, "demonstrated", "Standard deployment"),
          economics: ds(0.75, 0.8, 0.85, "demonstrated", "Known costs"),
          environment: ds(0.7, 0.75, 0.8, "modeled", "Excess energy is the environmental cost"),
          access: ds(0.87, 0.9, 0.93, "demonstrated", "Universal"),
          risk: ds(0.8, 0.85, 0.9, "demonstrated", "Proven reliability"),
        },
      },
      {
        id: "q-anneal",
        type: "quantum",
        name: "Quantum annealing service",
        approach: "Cloud annealing QPU on embedded dispatch QUBOs",
        trl: 6,
        scores: {
          outcome: ds(0.6, 0.75, 0.95, "vendor", "Vendor case studies report near-optimal setpoints in-window; interval wide pending independent validation"),
          performance: ds(0.5, 0.65, 0.9, "vendor", "Reported 100× speedups measured against unoptimized baselines"),
          feasibility: ds(0.45, 0.55, 0.7, "modeled", "Embedding overhead for dense constraints disputed"),
          economics: ds(0.4, 0.55, 0.75, "modeled", "Per-cycle QPU pricing at volume uncertain"),
          environment: ds(0.5, 0.6, 0.75, "modeled", "Net effect depends on realized energy savings"),
          access: ds(0.5, 0.6, 0.7, "demonstrated", "Cloud service available"),
          risk: ds(0.5, 0.6, 0.7, "community", "Single-vendor concentration"),
        },
        scenarioDeltas: {
          "near-term": { performance: 0.05, economics: 0.05 },
          ftqc: { outcome: 0.05, performance: 0.05 },
        },
      },
      {
        id: "qi-digital",
        type: "quantum-inspired",
        name: "Quantum-inspired digital annealer",
        approach: "CMOS annealing / tensor-network heuristics on classical hardware",
        trl: 8,
        scores: {
          outcome: ds(0.75, 0.8, 0.88, "demonstrated", "Matches QPU results on network QUBOs in independent tests"),
          performance: ds(0.72, 0.8, 0.86, "demonstrated", "In-window at full network scale"),
          feasibility: ds(0.8, 0.85, 0.9, "demonstrated", "Standard datacenter deployment"),
          economics: ds(0.8, 0.85, 0.9, "demonstrated", "Conventional pricing"),
          environment: ds(0.75, 0.8, 0.85, "modeled", "Standard footprint"),
          access: ds(0.8, 0.85, 0.9, "demonstrated", "Multiple providers"),
          risk: ds(0.75, 0.8, 0.85, "community", "Ordinary vendor risk"),
        },
      },
    ],
    comparison: { classical: "c-milp2", quantum: "q-anneal" },
    gates: {
      G1: { state: "pass", note: "Same network instances and window requirement" },
      G2: { state: "conditional", note: "Quantum meets window on vendor-reported cases only" },
      G3: { state: "conditional", note: "Annealing mechanism plausible; embedding overhead disputed" },
      G4: { state: "conditional", note: "Resource pathway vendor-modeled" },
      G5: { state: "pass", note: "Dispatch data cloud-permissible in most jurisdictions" },
      G6: { state: "conditional", note: "No independent operational evidence" },
    },
    rov: { U: 65, P: 55, V: 75, S: 60, J: 70, K: 80 },
    eci: { D: 55, B: 45, V: 55, I: 40, R: 45, C: 50, T: 80 },
    coverage: 72,
    evidenceClaims: [
      { text: "Vendor-reported 100× speedups were measured against unoptimized classical baselines", tag: "vendor", source: "Vendor case studies — benchmark integrity flagged (sample)" },
      { text: "Tuned simulated annealing and digital annealers match QPU results on network QUBOs", tag: "demonstrated", source: "Independent benchmark studies (sample)" },
      { text: "Embedding overhead for dense cooling-network constraints grows quadratically", tag: "modeled", source: "Peer-reviewed embedding analyses (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "Independent benchmark against strong classical baseline", predictedState: "Interval collapses to one side — pilot or classical default", dependency: "Evidence-gated" },
      { scenario: "ftqc", trigger: "FTQC milestones", predictedState: "Largely irrelevant — annealing pathway is not fault-tolerance-gated", dependency: "None" },
    ],
    crossoverTriggers: [
      "An independent benchmark showing ≥10× time-to-target at fixed quality vs. tuned classical baselines",
      "Per-cycle QPU pricing commitments at operational volume",
    ],
    crossoverCredible: true,
    drivers: [
      "Benchmark-integrity uncertainty (widest interval in the portfolio)",
      "Classical timeout cost: 8–12% excess energy",
      "Quantum-inspired alternative currently outperforms both headline options",
    ],
    sensitivity: [
      "If the independent benchmark confirms even 3× advantage, central QPS moves ~6 points into pilot territory",
      "If refuted, the lane drops to classical default — with the quantum-inspired option as the likely procurement",
    ],
    summary:
      "District cooling optimization has a real, costly classical shortfall — but the quantum case rests on vendor benchmarks measured against weak baselines, which the evidence framework flags directly: benchmark integrity and independence score lowest in the portfolio and the QPS interval spans parity. The recommended lane is targeted validation: one independent, decisive benchmark against a strong classical baseline. Meanwhile the quantum-inspired digital annealer already meets the operational requirement classically and currently scores best of all alternatives — a procurement insight the panel surfaces on its own line. This case is the demo of epistemic honesty: wide intervals shown, vendor claims labeled, and the smallest decisive test named.",
  },

  {
    id: "en-risk",
    domain: "energy",
    title: "Day-ahead energy portfolio risk (amplitude estimation)",
    short:
      "Quantum amplitude estimation for market-risk simulation — the case the Observatory refuses to score.",
    problem:
      "Compute day-ahead portfolio risk measures (VaR/CVaR) for an energy trading book, evaluating quantum amplitude estimation against GPU Monte Carlo.",
    owner: "Energy trading desk / market regulator",
    scale: "10⁵–10⁶ scenario paths across ~500 instruments, nightly",
    outcomeThreshold: "Risk measures within regulatory confidence bands before market open",
    frequency: "~250 runs/year plus intraday updates",
    horizon: "Current",
    mechanism: {
      primitive: "Quantum amplitude estimation (quadratic sampling advantage)",
      source: "Proven for idealized oracles; end-to-end pathway unknown",
      description:
        "QAE's quadratic speedup is proven only relative to oracle access; preparing realistic market-scenario distributions may consume the entire advantage, and no end-to-end resource study exists.",
    },
    alternatives: [
      {
        id: "c-mc",
        type: "classical",
        name: "GPU Monte Carlo",
        approach: "Vectorized scenario simulation with variance-reduction on GPU clusters",
        trl: 9,
        scores: {
          outcome: ds(0.75, 0.8, 0.85, "demonstrated", "Meets regulatory bands nightly"),
          performance: ds(0.75, 0.8, 0.85, "demonstrated", "Comfortably in-window"),
          feasibility: ds(0.92, 0.95, 0.97, "demonstrated", "Standard estate"),
          economics: ds(0.8, 0.85, 0.9, "demonstrated", "Known GPU costs"),
          environment: ds(0.75, 0.8, 0.85, "modeled", "Standard datacenter footprint"),
          access: ds(0.87, 0.9, 0.93, "demonstrated", "Universal"),
          risk: ds(0.8, 0.85, 0.9, "demonstrated", "Proven controls"),
        },
      },
      {
        id: "q-qae",
        type: "quantum",
        name: "Quantum amplitude estimation",
        approach: "QAE over quantum-encoded scenario distributions",
        trl: 3,
        scores: {
          outcome: ds(0.25, 0.45, 0.6, "modeled", "Simplified payoff models only; equivalence to production books unestablished"),
          performance: ds(0.15, 0.3, 0.5, "modeled", "Depends entirely on unproven state-preparation costs"),
          feasibility: ds(0.2, 0.3, 0.4, "modeled", "No end-to-end resource study"),
          economics: ds(0.15, 0.25, 0.35, "unknown", "Cannot be estimated without a resource pathway"),
          environment: ds(0.35, 0.45, 0.55, "unknown", "No defensible boundary can be drawn"),
          access: ds(0.4, 0.5, 0.6, "community", "Future cloud access assumed"),
          risk: ds(0.4, 0.5, 0.6, "community", "Model-risk implications unexamined"),
        },
        scenarioDeltas: {
          "near-term": { feasibility: 0.05 },
          ftqc: { outcome: 0.15, performance: 0.2, feasibility: 0.15 },
        },
      },
    ],
    comparison: { classical: "c-mc", quantum: "q-qae" },
    gates: {
      G1: { state: "conditional", note: "Equivalence unresolved — quantum studies use simplified payoff models" },
      G2: { state: "fail", note: "No quantum configuration meets the nightly requirement" },
      G3: { state: "pass", note: "QAE mechanism proven — for oracle access only" },
      G4: { state: "fail", note: "No credible end-to-end resource pathway including state preparation" },
      G5: { state: "pass", note: "No constraint" },
      G6: { state: "fail", note: "Coverage below floor on critical domains" },
    },
    rov: { U: 60, P: 40, V: 70, S: 50, J: 50, K: 65 },
    eci: { D: 45, B: 35, V: 40, I: 30, R: 35, C: 40, T: 70 },
    coverage: 58,
    evidenceClaims: [
      { text: "Quadratic QAE speedup proven for idealized oracle access", tag: "modeled", source: "Foundational algorithm literature (sample)" },
      { text: "State-preparation cost for realistic market scenarios is unknown", tag: "unknown", source: "No published end-to-end study (sample)" },
      { text: "Vendor whitepapers project advantage by 2028 without disclosed assumptions", tag: "vendor", source: "Vendor publications — assumptions not disclosed (sample)" },
      { text: "No independent replication of published finance-QAE benchmarks", tag: "community", source: "Literature search, evidence date recorded (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "First end-to-end resource study including state preparation", predictedState: "Coverage crosses the floor; case becomes scoreable", dependency: "Evidence-gated" },
      { scenario: "ftqc", trigger: "Fault-tolerant QAE demonstrations", predictedState: "Re-evaluation warranted only if state-preparation problem is solved", dependency: "Algorithm-gated" },
    ],
    crossoverTriggers: [
      "A published end-to-end resource estimate including state preparation",
      "Independent replication of any finance-QAE benchmark on realistic scenario distributions",
    ],
    crossoverCredible: false,
    drivers: [
      "Weighted evidence coverage 58% — below the 70% floor",
      "Benchmark equivalence unresolved (G1 conditional)",
      "State-preparation cost unknown, not merely uncertain",
    ],
    sensitivity: [
      "Not applicable — the framework withholds an operational score below the coverage floor",
      "A single credible end-to-end study would make the case scoreable either way",
    ],
    summary:
      "This case exists to show what the Observatory does when the evidence isn't there: it refuses to produce a score. Quantum amplitude estimation has a proven mechanism in principle, but the cost of loading realistic market scenarios is unknown, published studies use simplified payoff models that break benchmark equivalence, and weighted evidence coverage sits at 58% — below the 70% floor the methodology requires. Rather than imputing the gaps, the panel reports 'insufficient evidence' with the exact studies that would change that. Monte Carlo remains the operational answer meanwhile. Unknowns stay visible; they are never scored as zeros or averaged away.",
  },
];
