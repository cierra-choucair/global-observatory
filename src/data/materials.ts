import { ds } from "./helpers";
import type { UseCase } from "../types";

/** SAMPLE evaluations — illustrative data authored for the demo. */
export const MATERIALS_USE_CASES: UseCase[] = [
  {
    id: "mat-ammonia",
    domain: "materials",
    title: "Catalyst discovery for green ammonia synthesis",
    short:
      "Chemically accurate simulation of nitrogen-reduction active sites — the canonical FTQC chemistry target.",
    problem:
      "Rank candidate catalysts for low-temperature ammonia synthesis by computing active-site reaction energetics to chemical accuracy (±1 kcal/mol), where DFT error bars exceed the decision margin.",
    owner: "National hydrogen program / industrial chemistry consortium",
    scale: "Multi-metal active sites, 50–200 correlated orbitals; ~10³ candidate evaluations per campaign",
    outcomeThreshold: "±1 kcal/mol on rate-determining barriers, validated against experiment",
    frequency: "~10³ high-accuracy evaluations per year across the national program",
    horizon: "Current → application-relevant FTQC",
    mechanism: {
      primitive: "Quantum phase estimation on qubitized electronic-structure Hamiltonians",
      source: "Proven asymptotics; resource requirements modeled",
      description:
        "QPE computes ground- and transition-state energies of strongly correlated systems with controllable error — precisely where DFT and coupled-cluster approximations break down on multi-metal active sites.",
    },
    alternatives: [
      {
        id: "c-dftml",
        type: "classical",
        name: "DFT + ML potentials + experiment",
        approach: "High-throughput DFT screening, ML interatomic potentials, targeted experimental validation",
        trl: 9,
        scores: {
          outcome: ds(0.5, 0.6, 0.7, "demonstrated", "Useful ranking signal, but error bars on correlated multi-metal sites exceed the ±1 kcal/mol decision margin"),
          performance: ds(0.55, 0.65, 0.75, "demonstrated", "High throughput at screening accuracy"),
          feasibility: ds(0.85, 0.9, 0.94, "demonstrated", "Mature HPC toolchain"),
          economics: ds(0.6, 0.7, 0.8, "demonstrated", "Significant HPC + experimental validation cost"),
          environment: ds(0.6, 0.7, 0.8, "modeled", "Large HPC campaigns"),
          access: ds(0.8, 0.85, 0.9, "demonstrated", "Broad availability"),
          risk: ds(0.75, 0.8, 0.85, "community", "Known failure modes, well understood"),
        },
        scenarioDeltas: {
          "near-term": { outcome: 0.03 },
          ftqc: { outcome: 0.05, performance: 0.05 },
        },
      },
      {
        id: "q-qpe",
        type: "quantum",
        name: "Fault-tolerant quantum chemistry (QPE)",
        approach: "Qubitized QPE for active-site energetics; current hybrid embedding experiments as stepping stones",
        trl: 3,
        scores: {
          outcome: ds(0.2, 0.35, 0.5, "modeled", "Cannot yet reach relevant active-site sizes; fragment demonstrations only"),
          performance: ds(0.1, 0.2, 0.3, "modeled", "Runtime estimates dominated by T-gate counts"),
          feasibility: ds(0.2, 0.3, 0.4, "modeled", "10⁵–10⁶ physical qubits required at target error rates"),
          economics: ds(0.1, 0.2, 0.3, "modeled", "FTQC access pricing unknown"),
          environment: ds(0.3, 0.4, 0.5, "modeled", "Cryoplant overhead vs. displaced HPC — boundary-dependent"),
          access: ds(0.4, 0.5, 0.6, "community", "Cloud access assumed for future systems"),
          risk: ds(0.4, 0.5, 0.6, "community", "Roadmap and vendor concentration risk"),
        },
        scenarioDeltas: {
          "near-term": { outcome: 0.05, feasibility: 0.05 },
          ftqc: {
            outcome: 0.55,
            performance: 0.55,
            feasibility: 0.4,
            economics: 0.35,
            environment: 0.2,
            access: 0.15,
            risk: 0.1,
          },
        },
      },
    ],
    comparison: { classical: "c-dftml", quantum: "q-qpe" },
    gates: {
      G1: { state: "pass", note: "Same energetics task and accuracy threshold" },
      G2: { state: "conditional", note: "Quantum meets threshold only on fragment models today" },
      G3: { state: "pass", note: "QPE chemical-accuracy mechanism — strongest known quantum chemistry case" },
      G4: { state: "conditional", note: "Resource pathway modeled; estimates span an order of magnitude" },
      G5: { state: "pass", note: "No prohibitive constraint" },
      G6: { state: "conditional", note: "No operational deployment evidence" },
    },
    gateOverrides: {
      ftqc: {
        G2: { state: "pass", note: "Chemical accuracy at active-site scale under keyframe assumptions" },
        G4: { state: "pass", note: "Keyframe fixes one coherent hardware scenario" },
      },
    },
    rov: { U: 90, P: 75, V: 80, S: 80, J: 75, K: 70 },
    eci: { D: 60, B: 65, V: 60, I: 75, R: 70, C: 65, T: 70 },
    coverage: 78,
    evidenceClaims: [
      { text: "QPE reaches chemical accuracy for FeMoco-scale active sites — in resource estimates only", tag: "modeled", source: "Peer-reviewed resource-estimation studies (sample)" },
      { text: "ML potentials reach near-DFT accuracy at a fraction of the cost", tag: "demonstrated", source: "Published benchmark suites (sample)" },
      { text: "Quantum resource estimates for nitrogenase-scale systems span two orders of magnitude across studies", tag: "community", source: "Cross-study synthesis (sample)" },
      { text: "DFT functional spread on multi-metal barriers exceeds 5 kcal/mol", tag: "demonstrated", source: "Method-comparison literature (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "100-logical-qubit era demonstrations on embedded fragments", predictedState: "Stepping-stone value; no operational crossover", dependency: "Hardware-gated" },
      { scenario: "ftqc", trigger: "~10⁵–10⁶ physical qubits, logical error ≤10⁻¹⁰, <1 week per active-site energy", predictedState: "QPS interval crosses parity — commission decisive head-to-head validation", dependency: "Hardware + algorithm-gated" },
    ],
    crossoverTriggers: [
      "Logical-qubit counts and error rates reaching the published keyframe",
      "10× reduction in T-count via algorithmic improvements",
      "Evidence that ML potentials stagnate on strongly correlated systems",
    ],
    crossoverCredible: true,
    drivers: [
      "Chemical-accuracy premium on correlated active sites",
      "FTQC resource gap (feasibility + economics today)",
      "Strategic alignment with national hydrogen programs (ROV)",
    ],
    sensitivity: [
      "Value of closing the last kcal/mol: if catalyst choice is insensitive below 3 kcal/mol, the quantum premium halves",
      "Classical MLIP progress rate is the largest external uncertainty",
    ],
    summary:
      "Green ammonia catalysis is the canonical case where quantum simulation could eventually matter: DFT error bars on multi-metal active sites exceed the decision margin, and phase estimation closes that gap in principle. Today the comparison is not close — the classical pipeline wins on every operational domain, and the current lane is priority research, not procurement. Under the application-relevant FTQC keyframe the score interval crosses parity, which is exactly when a decisive head-to-head validation should be commissioned. Research option value is among the highest in the portfolio, reinforced by hydrogen-economy strategic alignment. Evidence confidence is moderate, dominated by modeled resource estimates.",
  },

  {
    id: "mat-battery",
    domain: "materials",
    title: "Battery electrolyte formulation (hybrid pipeline)",
    short:
      "Quantum-computed corrections for correlated electrolyte chemistry inside a classical screening funnel.",
    problem:
      "Predict redox potentials and degradation pathways for a class of electrolyte additives where DFT shows systematic errors above 0.3 V, using a hybrid pipeline that inserts quantum-computed active-space energies into the classical funnel.",
    owner: "National battery-materials program / industrial partner",
    scale: "Active spaces of 40–100 orbitals; ~200 high-accuracy candidate evaluations per year",
    outcomeThreshold: "Redox potentials within 0.1 V; degradation-pathway ranking validated against cell tests",
    frequency: "~200 evaluations/year, each feeding a formulation decision",
    horizon: "Current",
    mechanism: {
      primitive: "Sample-based quantum diagonalization / VQE on correlated active spaces",
      source: "Experimentally demonstrated on ≤ 40-orbital fragments",
      description:
        "Quantum devices sample configuration subspaces of correlated fragments that classical heuristics truncate, correcting exactly the systematic DFT errors that break candidate ranking for this chemistry class.",
    },
    alternatives: [
      {
        id: "c-dft",
        type: "classical",
        name: "DFT/MD + ML funnel",
        approach: "Standard electrolyte screening: DFT with empirical corrections, MD, ML surrogates",
        trl: 9,
        scores: {
          outcome: ds(0.28, 0.35, 0.42, "demonstrated", "Systematic redox-potential errors >0.3 V on the target additive class — below the decision threshold"),
          performance: ds(0.6, 0.65, 0.7, "demonstrated", "High throughput at insufficient accuracy"),
          feasibility: ds(0.87, 0.9, 0.93, "demonstrated", "Mature toolchain"),
          economics: ds(0.75, 0.8, 0.85, "demonstrated", "Standard HPC costs"),
          environment: ds(0.75, 0.8, 0.85, "modeled", "Routine HPC footprint"),
          access: ds(0.82, 0.85, 0.88, "demonstrated", "Broad availability"),
          risk: ds(0.75, 0.8, 0.85, "community", "Known limitations"),
        },
        scenarioDeltas: {
          "near-term": { outcome: 0.03 },
        },
      },
      {
        id: "q-hybrid",
        type: "hybrid",
        name: "Hybrid quantum-classical pipeline",
        approach: "Classical funnel with quantum-computed active-space corrections on 100-qubit-class cloud devices",
        trl: 5,
        scores: {
          outcome: ds(0.85, 0.92, 0.96, "demonstrated", "Reproduces reference-grade energies on demonstrated fragments; corrects the systematic DFT error"),
          performance: ds(0.7, 0.78, 0.85, "demonstrated", "Quantum step is the throughput bottleneck"),
          feasibility: ds(0.75, 0.8, 0.85, "demonstrated", "Runs on today's cloud devices with error mitigation"),
          economics: ds(0.62, 0.7, 0.78, "modeled", "QPU time ~4× cost per candidate vs. classical funnel"),
          environment: ds(0.7, 0.75, 0.8, "modeled", "Modest — cloud QPU share is small"),
          access: ds(0.7, 0.75, 0.8, "demonstrated", "Multiple cloud providers offer suitable devices"),
          risk: ds(0.7, 0.75, 0.8, "community", "Error-mitigation reproducibility is the main operational risk"),
        },
        scenarioDeltas: {
          "near-term": { performance: 0.05, economics: 0.05, feasibility: 0.05 },
          ftqc: { outcome: 0.03, performance: 0.12, economics: 0.15, feasibility: 0.1 },
        },
      },
    ],
    comparison: { classical: "c-dft", quantum: "q-hybrid" },
    gates: {
      G1: { state: "pass", note: "Same candidate set, thresholds and validation protocol" },
      G2: { state: "pass", note: "Hybrid meets 0.1 V threshold on demonstrated fragments" },
      G3: { state: "pass", note: "Active-space sampling mechanism specific and demonstrated" },
      G4: { state: "pass", note: "Runs end-to-end on current cloud hardware" },
      G5: { state: "pass", note: "No prohibitive constraint; cloud-substitutable" },
      G6: { state: "conditional", note: "Operational validation limited to pilot studies" },
    },
    rov: { U: 75, P: 70, V: 75, S: 70, J: 65, K: 75 },
    eci: { D: 65, B: 60, V: 70, I: 60, R: 65, C: 60, T: 85 },
    coverage: 76,
    evidenceClaims: [
      { text: "Quantum diagonalization reproduced reference-grade energies on 40-orbital electrolyte fragments", tag: "demonstrated", source: "Peer-reviewed hardware experiments (sample)" },
      { text: "DFT redox-potential errors exceed 0.3 V for the target additive class", tag: "demonstrated", source: "Method-benchmark literature (sample)" },
      { text: "Hybrid workflow costs ~4× per candidate vs. the classical funnel", tag: "modeled", source: "UL cost model on published cloud pricing (sample)" },
      { text: "Device vendors project 3× throughput improvement by 2027", tag: "vendor", source: "Vendor roadmaps — not independently validated (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "3× device throughput; mitigation overhead −50%", predictedState: "Pilot economics improve; central QPS moves further into quantum preference", dependency: "Hardware-gated" },
      { scenario: "ftqc", trigger: "Early fault-tolerant devices", predictedState: "Bottleneck shifts from accuracy to integration; economics improve materially", dependency: "Hardware-gated" },
    ],
    crossoverTriggers: [
      "Already at the pilot line — the decisive question is whether pilot results replicate on 100+-orbital active spaces",
      "If classical embedding corrections close half the redox error, QPS returns to parity",
    ],
    crossoverCredible: true,
    drivers: [
      "Outcome accuracy gap on correlated chemistry (largest single driver)",
      "TRL 5 maturity — runs on today's cloud devices",
      "QPU cost per candidate (economics)",
    ],
    sensitivity: [
      "QPS interval includes parity at its lower bound — the pilot must be bounded and decision-focused",
      "If DFT+embedding corrections improve, the outcome gap narrows ~6 QPS points",
    ],
    summary:
      "This is the portfolio's strongest near-term operational case: for one chemistry class where DFT systematically fails, a hybrid pipeline with quantum-computed corrections meets the accuracy threshold on today's cloud hardware. Central QPS sits just inside quantum preference, with an interval that still touches parity — so the recommended lane is a bounded operational pilot with explicit success criteria, not a production commitment. Cost per candidate and error-mitigation reproducibility are the main risks. A negative pilot cleanly returns the verdict to classical default; a positive one justifies scaling. Evidence confidence is moderate.",
  },

  {
    id: "mat-carbon",
    domain: "materials",
    title: "CO₂ capture sorbent screening (MOFs)",
    short:
      "High-throughput screening of metal-organic frameworks for direct air capture — where classical is genuinely good enough.",
    problem:
      "Screen 10⁵ MOF candidates per campaign for CO₂ working capacity and selectivity, deciding whether quantum simulation should replace any stage of the classical funnel.",
    owner: "National carbon-management program",
    scale: "10⁵ candidates/campaign at screening accuracy; ~10² final-stage high-accuracy rankings",
    outcomeThreshold: "Screening: correct top-1% enrichment; final stage: adsorption energetics within 2 kJ/mol",
    frequency: "2–3 campaigns per year",
    horizon: "Current",
    mechanism: {
      primitive: "QPE on open-metal-site clusters (final ranking stage only)",
      source: "Modeled; advantage projected only for strongly correlated sites",
      description:
        "Screening-stage physics is weakly correlated and well served classically; a credible quantum mechanism exists only for final-stage energetics of open-metal sites, a small fraction of the workload.",
    },
    alternatives: [
      {
        id: "c-funnel",
        type: "classical",
        name: "Classical screening funnel",
        approach: "Force-field + ML surrogates for bulk screening; DFT for finalists; experiment for validation",
        trl: 9,
        scores: {
          outcome: ds(0.75, 0.8, 0.85, "demonstrated", "Meets screening enrichment targets; final-stage accuracy contested only for open-metal sites"),
          performance: ds(0.75, 0.8, 0.85, "demonstrated", "10⁵ candidates per campaign"),
          feasibility: ds(0.87, 0.9, 0.93, "demonstrated", "Mature stack"),
          economics: ds(0.8, 0.85, 0.9, "demonstrated", "Routine HPC"),
          environment: ds(0.75, 0.8, 0.85, "modeled", "Standard campaign footprint"),
          access: ds(0.87, 0.9, 0.93, "demonstrated", "Broad availability"),
          risk: ds(0.8, 0.85, 0.9, "community", "Well-understood failure modes"),
        },
        scenarioDeltas: {
          ftqc: { outcome: 0.02 },
        },
      },
      {
        id: "q-mof",
        type: "quantum",
        name: "Quantum-assisted final ranking",
        approach: "QPE/embedding for open-metal-site energetics on the final candidate set",
        trl: 3,
        scores: {
          outcome: ds(0.35, 0.5, 0.6, "modeled", "Marginal value confined to a small slice of the funnel"),
          performance: ds(0.2, 0.3, 0.4, "modeled", "Far below screening throughput needs"),
          feasibility: ds(0.25, 0.35, 0.45, "modeled", "Fragment-scale only"),
          economics: ds(0.2, 0.3, 0.4, "modeled", "High cost per candidate"),
          environment: ds(0.4, 0.5, 0.6, "modeled", "Boundary-dependent"),
          access: ds(0.45, 0.55, 0.65, "community", "Cloud access assumed"),
          risk: ds(0.45, 0.55, 0.65, "community", "Roadmap risk"),
        },
        scenarioDeltas: {
          "near-term": { outcome: 0.05 },
          ftqc: { outcome: 0.3, performance: 0.35, feasibility: 0.3, economics: 0.25, environment: 0.1, access: 0.1, risk: 0.05 },
        },
      },
    ],
    comparison: { classical: "c-funnel", quantum: "q-mof" },
    gates: {
      G1: { state: "pass", note: "Framed per funnel stage to keep equivalence honest" },
      G2: { state: "conditional", note: "Quantum meets final-stage threshold on fragments only" },
      G3: { state: "pass", note: "Mechanism credible only for open-metal-site correlation" },
      G4: { state: "conditional", note: "Modeled resource estimates" },
      G5: { state: "pass", note: "No constraint" },
      G6: { state: "conditional", note: "No deployment evidence" },
    },
    rov: { U: 70, P: 55, V: 65, S: 60, J: 65, K: 60 },
    eci: { D: 65, B: 70, V: 60, I: 65, R: 70, C: 65, T: 75 },
    coverage: 80,
    evidenceClaims: [
      { text: "Classical funnels evaluate 10⁵ MOF candidates per campaign with validated enrichment", tag: "demonstrated", source: "Published screening studies (sample)" },
      { text: "Screening-stage accuracy needs are met classically; final-stage open-metal energetics remain contested", tag: "community", source: "Method-comparison synthesis (sample)" },
      { text: "Quantum advantage projected only for strongly correlated open-metal sites", tag: "modeled", source: "Resource-estimation studies (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "Improved classical embedding for open-metal sites", predictedState: "Classical sufficiency margin widens", dependency: "Algorithm-gated (classical)" },
      { scenario: "ftqc", trigger: "FTQC at final-ranking cost parity", predictedState: "Quantum takes the final-ranking stage only; screening remains classical", dependency: "Hardware + economic" },
    ],
    crossoverTriggers: [
      "Evidence that the classical funnel systematically misranks top candidates at open-metal sites",
      "FTQC cost per final-stage evaluation reaching parity with DFT",
    ],
    crossoverCredible: false,
    drivers: [
      "Classical sufficiency margin at the screening stage",
      "Small share of workload where a quantum mechanism applies",
      "Screening economics",
    ],
    sensitivity: [
      "If final-stage misranking is shown to cost real capture performance, the outcome value function shifts and ROV rises",
      "Verdict robust to weight perturbations — no single ±0.05 change flips the lane",
    ],
    summary:
      "MOF screening shows the framework saying 'classical is good enough' with a straight face: enrichment targets are met, the physics is mostly weakly correlated, and a credible quantum mechanism exists only for a thin final-ranking slice. The operational verdict is classical preference and even the FTQC keyframe leaves screening classical. Research option value sits in the scoped-monitoring band — worth benchmark development, not a dedicated program. Reassess if open-metal-site misranking is shown to matter or FTQC reaches cost parity on final-stage evaluations. Evidence confidence is moderate.",
  },
];
