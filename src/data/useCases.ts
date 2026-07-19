import type { UseCasePublic } from "../types";

const V = "2026.2";

/** SAMPLE use-case records — illustrative content authored for the demo.
 *  Pursuit profiles hold only final public outputs of the Universum Labs
 *  analysis; no scoring inputs or intermediate values exist client-side. */
export const USE_CASES: UseCasePublic[] = [
  {
    id: "sec-qrng",
    domain: "security",
    title: "Quantum random number generation for national root-of-trust",
    oneLiner:
      "Certifiable physical entropy for national PKI root keys and high-assurance government credentials.",
    problem:
      "National PKI operators need certifiably unpredictable entropy for root key generation, satisfying the highest assurance tier of emerging quantum-safe certification schemes.",
    modality: "Photonic QRNG appliances",
    applicationType: "Key generation & root of trust",
    trl: 9,
    maturityLabel: "Operational",
    profiles: [
      {
        category: "quantum",
        spectrum: { position: 60, low: 55, high: 65 },
        confidence: "high",
        evidence: "demonstrated",
        horizon: "current",
        drivers: [
          "Certified devices provide a physically verifiable entropy assurance tier that classical sources cannot reach",
          "Mature commercial supply chain with low integration burden",
          "Classical entropy-source failures are historically hard to detect in the field",
        ],
        explanation:
          "One of the few applications where the quantum option is operationally superior today: certified appliances are mature, affordable at national scale, and meet an assurance tier driven by certification requirements rather than raw performance.",
        lastUpdated: "2026-07-02",
        version: V,
      },
    ],
    classicalBaseline:
      "Cryptographically secure pseudo-random generators seeded by hardware entropy inside certified HSMs — sufficient for standard assurance tiers, but without physically certifiable unpredictability.",
    quantumPathway:
      "Rack-mounted photonic QRNG appliances with continuous health monitoring and entropy certification; no cryogenics or specialist operation required.",
    evidenceSummary:
      "Commercial devices pass recognized entropy validation at gigabit rates; device-independent protocols have been demonstrated in laboratory settings. The assessment rests primarily on demonstrated evidence.",
    accessNotes: [
      "Ships as standard equipment — deployable in any jurisdiction without quantum-computing access",
      "Procurement and integration comparable to conventional network appliances",
    ],
    activity: [
      "Operational deployments documented in multiple national PKI and government credential programs",
      "Entropy-as-a-service offerings available from several providers",
    ],
    coverage: { global: true, countries: ["ARE", "CHE", "SGP", "KEN"] },
    policyImplications: [
      "Primarily a procurement and certification decision, not a research program",
      "Certification-scheme adoption determines the size of the assurance premium",
    ],
    sources: [
      { label: "Entropy certification reports, independently audited (sample)", provenance: "government" },
      { label: "Loophole-free randomness-expansion experiments (sample)", provenance: "peer-reviewed" },
      { label: "Lifecycle cost analysis at national PKI scale (sample)", provenance: "modeled" },
    ],
    related: ["sec-qkd", "sec-qnet"],
    lastUpdated: "2026-07-02",
  },

  {
    id: "sec-qkd",
    domain: "security",
    title: "Metropolitan QKD backbone for government networks",
    oneLiner:
      "Quantum key distribution across ministry sites, evaluated against post-quantum cryptography.",
    problem:
      "Protecting inter-ministry traffic against harvest-now-decrypt-later adversaries for 25+ years, comparing a metropolitan QKD fiber backbone with a hybrid post-quantum cryptography rollout.",
    modality: "QKD over dedicated fiber (trusted-relay architecture)",
    applicationType: "Secure communications",
    trl: 7,
    maturityLabel: "Near-operational",
    profiles: [
      {
        category: "classical",
        spectrum: { position: 30, low: 25, high: 40 },
        confidence: "moderate",
        evidence: "pilot",
        horizon: "current",
        drivers: [
          "Hybrid post-quantum cryptography meets the long-horizon threat model end-to-end at software cost",
          "QKD secures individual links only, with trusted relay nodes re-exposing keys",
          "Lifecycle cost of dedicated fiber and per-node hardware is substantially higher",
        ],
        explanation:
          "Post-quantum cryptography is currently the stronger pathway for protecting government traffic against future quantum attack. QKD retains genuine preparation value: fiber, skills and certification groundwork carry forward to future quantum networks.",
        lastUpdated: "2026-06-28",
        version: V,
      },
      {
        category: "prepare",
        spectrum: { position: 35, low: 25, high: 50 },
        confidence: "low",
        evidence: "modeled",
        horizon: "longer",
        drivers: [
          "Practical quantum repeaters would remove trusted-relay exposure",
          "A mathematical break of deployed post-quantum schemes would flip the comparison decisively",
          "Certification schemes and costs are on improving trajectories",
        ],
        explanation:
          "In the longer term the comparison could narrow if repeater technology matures or confidence in deployed post-quantum schemes weakens. Preparation and partnership are the recommended posture where sovereign fiber assets exist.",
        lastUpdated: "2026-06-28",
        version: V,
      },
    ],
    classicalBaseline:
      "Hybrid post-quantum cryptography (standardized lattice-based key establishment and signatures) rolled out in software across the existing network estate, with crypto-agility as a hedge.",
    quantumPathway:
      "Decoy-state QKD over dedicated dark fiber linking 20–40 government sites, using trusted relay nodes for links beyond direct reach.",
    evidenceSummary:
      "Metropolitan QKD networks are operational in several countries and post-quantum standards are deployed in mainstream protocol stacks. Long-term reliability data for QKD remains thin, and cost projections are largely vendor-reported.",
    accessNotes: [
      "Requires physical fiber infrastructure — cloud access is not a substitute",
      "Certification and procurement frameworks remain immature in most jurisdictions",
    ],
    activity: [
      "National metropolitan QKD deployments reported in several countries",
      "Post-quantum migration programs underway across government networks worldwide",
    ],
    coverage: { global: true, countries: ["ARE", "CHE", "SGP"] },
    policyImplications: [
      "Post-quantum migration planning is urgent regardless of the QKD decision",
      "Sovereign fiber assets change the preparation economics materially",
    ],
    sources: [
      { label: "National deployment reports (sample)", provenance: "government" },
      { label: "Post-quantum standards publications (sample)", provenance: "government" },
      { label: "QKD cost-trajectory roadmaps (sample)", provenance: "vendor" },
      { label: "Trusted-node security analyses (sample)", provenance: "peer-reviewed" },
    ],
    related: ["sec-qrng", "sec-qnet"],
    lastUpdated: "2026-06-28",
  },

  {
    id: "sec-qnet",
    domain: "security",
    title: "National quantum network testbed (entanglement distribution)",
    oneLiner:
      "Entanglement-distribution infrastructure for future quantum-network services, versus doing the minimum today.",
    problem:
      "Whether to invest now in an entanglement-distribution testbed enabling future services — blind quantum computing, distributed sensing, secure time transfer — against a do-minimum baseline.",
    modality: "Entanglement distribution (memory-assisted links)",
    applicationType: "Network infrastructure & research",
    trl: 3,
    maturityLabel: "Proof of concept",
    profiles: [
      {
        category: "research",
        spectrum: { position: 20, low: 10, high: 25 },
        confidence: "moderate",
        evidence: "modeled",
        horizon: "current",
        drivers: [
          "No quantum-network service meets an operational threshold today",
          "Upside and spillover value — workforce, metrology, standards — are among the highest in the portfolio",
          "The do-minimum baseline is nearly free, keeping the operational bar high",
        ],
        explanation:
          "There is no operational case for entanglement infrastructure today, and the analysis says so plainly. The investment case is a research one, and it is strong: capability build-up, standards influence and skills carry value independent of today's verdict.",
        lastUpdated: "2026-06-15",
        version: V,
      },
    ],
    classicalBaseline:
      "Maintain the classical network estate with post-quantum cryptography; no quantum-network investment.",
    quantumPathway:
      "A 3–5 node regional testbed distributing entanglement over ~100 km spans with memory-assisted links, paired with standards and workforce development.",
    evidenceSummary:
      "Entanglement distribution is demonstrated over metropolitan fiber and satellite links; multi-node repeater chains remain laboratory work. Service-grade rates require orders-of-magnitude improvements, an assessment based on modeled scaling of published device parameters.",
    accessNotes: [
      "A small number of research groups worldwide can operate such infrastructure",
      "Value is regional: shared testbeds and partnerships are credible entry routes",
    ],
    activity: [
      "Field demonstrations of entanglement distribution reported by several national programs",
      "Standardization efforts on quantum-network architectures in early stages",
    ],
    coverage: { global: true, countries: ["CHE", "SGP"] },
    policyImplications: [
      "A staged research program with explicit milestones fits the evidence better than infrastructure commitments",
      "Workforce and standards participation are the near-term deliverables",
    ],
    sources: [
      { label: "Field experiments on entanglement distribution (sample)", provenance: "peer-reviewed" },
      { label: "Research-community reviews of repeater progress (sample)", provenance: "community" },
      { label: "Scaling analysis of published device parameters (sample)", provenance: "modeled" },
    ],
    related: ["sec-qkd", "sec-qrng"],
    lastUpdated: "2026-06-15",
  },

  {
    id: "mat-ammonia",
    domain: "materials",
    title: "Catalyst discovery for green ammonia synthesis",
    oneLiner:
      "Chemically accurate simulation of nitrogen-reduction active sites — the canonical long-horizon quantum chemistry target.",
    problem:
      "Ranking candidate catalysts for low-temperature ammonia synthesis requires reaction energetics beyond the error bars of today's classical methods on multi-metal active sites.",
    modality: "Fault-tolerant quantum chemistry (with hybrid stepping stones)",
    applicationType: "Catalyst design",
    trl: 3,
    maturityLabel: "Proof of concept",
    profiles: [
      {
        category: "research",
        spectrum: { position: 30, low: 20, high: 40 },
        confidence: "moderate",
        evidence: "modeled",
        horizon: "current",
        drivers: [
          "Classical error bars on multi-metal active sites exceed the decision margin — a real gap",
          "Quantum resource requirements remain far beyond current hardware",
          "Strategic alignment with hydrogen-economy programs raises the research value",
        ],
        explanation:
          "The classical pipeline wins on every operational dimension today, so the current recommendation is research, not procurement. The gap quantum simulation would close is real and matters for catalyst choice.",
        lastUpdated: "2026-07-05",
        version: V,
      },
      {
        category: "validation",
        spectrum: { position: 50, low: 40, high: 60 },
        confidence: "moderate",
        evidence: "modeled",
        horizon: "longer",
        drivers: [
          "Under application-relevant fault-tolerant assumptions the comparison reaches balance",
          "The uncertainty range spans both outcomes — a decisive head-to-head validation is the right commitment",
          "Classical machine-learned methods continue to improve and could close part of the gap first",
        ],
        explanation:
          "In the application-relevant fault-tolerant period the analysis reaches a balanced, uncertain position: exactly the moment to commission a decisive validation rather than commit either way.",
        lastUpdated: "2026-07-05",
        version: V,
      },
    ],
    classicalBaseline:
      "High-throughput density-functional screening with machine-learned potentials and targeted experimental validation — a useful ranking signal whose error bars exceed the decision margin on correlated multi-metal sites.",
    quantumPathway:
      "Phase-estimation-based quantum chemistry for active-site energetics at chemical accuracy, with today's hybrid embedding experiments as stepping stones.",
    evidenceSummary:
      "Chemical accuracy at active-site scale exists in resource estimates only, and those estimates span two orders of magnitude across studies. Classical method error on multi-metal barriers is well documented. The assessment is dominated by modeled evidence.",
    accessNotes: [
      "Future access assumed via cloud services to fault-tolerant hardware",
      "Hybrid stepping-stone experiments run on today's cloud devices",
    ],
    activity: [
      "Resource-estimation studies published for nitrogen-fixation active sites",
      "Hybrid embedding demonstrations on small fragments reported by several groups",
    ],
    coverage: { global: true, countries: ["ARE", "CHE", "BRA"] },
    policyImplications: [
      "Fits national hydrogen strategies as a research and capability investment",
      "A defined re-assessment trigger exists: published hardware milestones for application-relevant fault tolerance",
    ],
    sources: [
      { label: "Resource-estimation studies for active-site chemistry (sample)", provenance: "peer-reviewed" },
      { label: "Machine-learned potential benchmark suites (sample)", provenance: "demonstrated" },
      { label: "Cross-study synthesis of resource estimates (sample)", provenance: "community" },
    ],
    related: ["mat-battery", "mat-carbon"],
    lastUpdated: "2026-07-05",
  },

  {
    id: "mat-battery",
    domain: "materials",
    title: "Battery electrolyte formulation (hybrid pipeline)",
    oneLiner:
      "Quantum-computed corrections for correlated electrolyte chemistry inside a classical screening funnel.",
    problem:
      "Predicting redox potentials and degradation pathways for an electrolyte additive class where standard classical methods show systematic errors above the decision threshold.",
    modality: "Hybrid quantum–classical simulation (cloud devices)",
    applicationType: "Formulation design",
    trl: 5,
    maturityLabel: "Pilot",
    profiles: [
      {
        category: "hybrid",
        spectrum: { position: 55, low: 50, high: 60 },
        confidence: "moderate",
        evidence: "pilot",
        horizon: "current",
        drivers: [
          "For this chemistry class, classical methods show systematic errors above the decision threshold",
          "The hybrid pipeline meets the accuracy requirement on today's cloud hardware in pilot studies",
          "Cost per candidate and reproducibility of error mitigation remain the main operational risks",
        ],
        explanation:
          "The portfolio's strongest near-term operational case: a hybrid workflow corrects exactly the classical errors that break candidate ranking. The uncertainty range still touches the balanced zone, so a bounded pilot with explicit success criteria is the recommended commitment.",
        lastUpdated: "2026-07-10",
        version: V,
      },
    ],
    classicalBaseline:
      "The standard electrolyte screening funnel — density-functional theory with empirical corrections, molecular dynamics and machine-learned surrogates — which shows systematic redox-potential errors on the target additive class.",
    quantumPathway:
      "The same classical funnel with quantum-computed active-space corrections inserted for correlated fragments, running on current-generation cloud quantum devices with error mitigation.",
    evidenceSummary:
      "Reference-grade energies have been reproduced on demonstrated fragments in peer-reviewed hardware experiments; workflow economics are modeled; device-improvement projections are vendor-reported and labeled as such.",
    accessNotes: [
      "Cloud-substitutable — multiple providers offer suitable devices",
      "Requires hybrid-workflow skills; a practical target for partnership models",
    ],
    activity: [
      "Peer-reviewed hardware demonstrations on electrolyte fragments",
      "Industrial pilot studies underway with battery-materials programs",
    ],
    coverage: { global: true, countries: ["ARE", "CHE", "SGP", "KEN"] },
    policyImplications: [
      "A negative pilot cleanly returns the verdict to the classical pathway; a positive one justifies scaling",
      "Suits jurisdictions with battery-industry strategies and cloud access",
    ],
    sources: [
      { label: "Hardware experiments on electrolyte fragments (sample)", provenance: "peer-reviewed" },
      { label: "Method-benchmark literature on classical error (sample)", provenance: "demonstrated" },
      { label: "Workflow cost model (sample)", provenance: "modeled" },
      { label: "Device throughput projections (sample)", provenance: "vendor" },
    ],
    related: ["mat-ammonia", "mat-carbon"],
    lastUpdated: "2026-07-10",
  },

  {
    id: "mat-carbon",
    domain: "materials",
    title: "Carbon-capture sorbent screening (metal-organic frameworks)",
    oneLiner:
      "High-throughput screening of sorbent materials for direct air capture — where classical methods are genuinely good enough.",
    problem:
      "Screening very large candidate libraries for working capacity and selectivity, and deciding whether quantum simulation should replace any stage of the classical funnel.",
    modality: "Quantum-assisted final-stage simulation (prospective)",
    applicationType: "Materials screening",
    trl: 3,
    maturityLabel: "Proof of concept",
    profiles: [
      {
        category: "monitor",
        spectrum: { position: 30, low: 20, high: 35 },
        confidence: "moderate",
        evidence: "modeled",
        horizon: "current",
        drivers: [
          "Classical screening funnels meet enrichment targets with validated performance",
          "A credible quantum contribution exists only for a thin final-ranking slice of the workload",
          "Even optimistic long-horizon assumptions leave the screening stages classical",
        ],
        explanation:
          "This use case shows the analysis saying classical is good enough with a straight face: screening physics is well served classically, and quantum relevance is confined to final-stage energetics of unusual sites. Worth tracking, not funding.",
        lastUpdated: "2026-06-20",
        version: V,
      },
    ],
    classicalBaseline:
      "Force-field and machine-learned surrogate screening for bulk candidates, density-functional theory for finalists, experimental validation for top candidates — meeting enrichment targets.",
    quantumPathway:
      "Prospective quantum simulation of final-stage adsorption energetics at strongly correlated open-metal sites, a small fraction of the screening workload.",
    evidenceSummary:
      "Classical funnel performance is demonstrated in published screening campaigns. Quantum advantage projections are modeled and limited to a narrow slice of the problem.",
    accessNotes: [
      "No near-term access requirement — classical screening runs on conventional infrastructure",
    ],
    activity: [
      "Published screening campaigns covering very large candidate libraries",
      "Method-comparison studies on open-metal-site energetics",
    ],
    coverage: { global: true, countries: ["BRA"] },
    policyImplications: [
      "Carbon-management programs need no quantum line item today",
      "Re-assessment triggers: evidence of systematic misranking at open-metal sites, or long-horizon cost parity for final-stage simulation",
    ],
    sources: [
      { label: "Published screening studies (sample)", provenance: "peer-reviewed" },
      { label: "Method-comparison synthesis (sample)", provenance: "community" },
      { label: "Final-stage advantage projections (sample)", provenance: "modeled" },
    ],
    related: ["mat-ammonia", "mat-battery"],
    lastUpdated: "2026-06-20",
  },

  {
    id: "en-grid",
    domain: "energy",
    title: "National grid unit commitment & dispatch",
    oneLiner:
      "Day-ahead unit commitment at national scale — a stress test the classical baseline passes comfortably.",
    problem:
      "Solving day-ahead unit commitment and dispatch for a national grid within the market-clearing window, and deciding whether any quantum approach warrants investment.",
    modality: "Quantum optimization (gate-model and annealing, prospective)",
    applicationType: "Grid optimization",
    trl: 4,
    maturityLabel: "Proof of concept",
    profiles: [
      {
        category: "classical",
        spectrum: { position: 25, low: 20, high: 35 },
        confidence: "high",
        evidence: "modeled",
        horizon: "current",
        drivers: [
          "Commercial optimization solvers meet the operational requirement with margin",
          "No accepted mechanism gives quantum approaches an advantage on this problem class",
          "The conclusion holds even under optimistic long-horizon hardware assumptions",
        ],
        explanation:
          "The portfolio's clearest classical result, and one of its best-evidenced: operational requirements are met with margin, and independent benchmarks show quantum approaches matching but not beating tuned classical methods on subproblems.",
        lastUpdated: "2026-06-25",
        version: V,
      },
    ],
    classicalBaseline:
      "Commercial mixed-integer optimization with decomposition and warm starts on conventional hardware — solving national-scale instances well inside the market window.",
    quantumPathway:
      "Reformulations for gate-model or annealing hardware, which discard structure classical solvers exploit; no configuration approaches operational requirements at scale.",
    evidenceSummary:
      "Classical performance is demonstrated in operational settings. Quantum results on subproblems come from independent benchmarks (matching, not beating, classical heuristics) and modeled circuit analyses.",
    accessNotes: [
      "Not access-limited — the constraint is the absence of a credible advantage mechanism",
    ],
    activity: [
      "Independent benchmark studies on unit-commitment subproblems",
      "Continued classical solver improvements year over year",
    ],
    coverage: { global: true, countries: ["ARE", "KEN", "BRA"] },
    policyImplications: [
      "Grid operators need no dedicated quantum program for this function",
      "Documented re-assessment triggers: a proven scaling advantage on constrained integer programs, or a structural explosion in stochastic instance sizes",
    ],
    sources: [
      { label: "System-operator performance reports (sample)", provenance: "government" },
      { label: "Independent benchmark studies (sample)", provenance: "peer-reviewed" },
      { label: "Circuit-depth analyses (sample)", provenance: "modeled" },
    ],
    related: ["en-cooling", "en-risk"],
    lastUpdated: "2026-06-25",
  },

  {
    id: "en-cooling",
    domain: "energy",
    title: "District cooling network optimization",
    oneLiner:
      "Real-time re-optimization of district cooling — wide uncertainty driven by vendor benchmarks demands a decisive test.",
    problem:
      "Re-optimizing chiller dispatch and network setpoints every 15 minutes; the classical baseline times out on the largest networks, costing an estimated 8–12% excess energy.",
    modality: "Quantum annealing service (with quantum-inspired alternatives)",
    applicationType: "Network optimization",
    trl: 6,
    maturityLabel: "Pilot",
    profiles: [
      {
        category: "validation",
        spectrum: { position: 45, low: 35, high: 60 },
        confidence: "low",
        evidence: "pilot",
        horizon: "current",
        drivers: [
          "The classical shortfall is real: timeouts cost an estimated 8–12% excess energy on the largest networks",
          "Reported quantum speedups were measured against unoptimized baselines and lack independent validation",
          "Quantum-inspired classical alternatives already meet the operational requirement in independent tests",
        ],
        explanation:
          "A genuine operational problem with an unusually wide uncertainty range, driven by vendor-reported benchmarks. The recommendation is one independent, decisive benchmark against a strong classical baseline — noting that a quantum-inspired classical option is already available.",
        lastUpdated: "2026-07-12",
        version: V,
      },
    ],
    classicalBaseline:
      "Commercial mixed-integer optimization with rolling horizons — reliable but timing out on the largest networks at peak, leaving setpoints measurably off optimal.",
    quantumPathway:
      "A cloud quantum-annealing service on embedded dispatch problems; vendor case studies report in-window near-optimal setpoints. Quantum-inspired digital annealers offer a classical route to similar results.",
    evidenceSummary:
      "Vendor-reported results are labeled as such throughout; independent studies show tuned classical and quantum-inspired methods matching the quantum service on comparable problems. Independence and benchmark quality are the binding evidence gaps.",
    accessNotes: [
      "Cloud service available today; single-vendor concentration is a consideration",
      "Dispatch data is cloud-permissible in most jurisdictions",
    ],
    activity: [
      "Vendor case studies on district-cooling and comparable network problems",
      "Independent benchmarks of annealing versus tuned classical heuristics",
    ],
    coverage: { global: true, countries: ["ARE", "SGP"] },
    policyImplications: [
      "A cheap, decisive benchmark could settle a real procurement question",
      "Relevant wherever district cooling is a significant energy load",
    ],
    sources: [
      { label: "Vendor case studies — benchmark integrity flagged (sample)", provenance: "vendor" },
      { label: "Independent benchmark studies (sample)", provenance: "peer-reviewed" },
      { label: "Embedding-overhead analyses (sample)", provenance: "modeled" },
    ],
    related: ["en-grid", "en-risk"],
    lastUpdated: "2026-07-12",
  },

  {
    id: "en-risk",
    domain: "energy",
    title: "Day-ahead energy portfolio risk simulation",
    oneLiner:
      "Quantum amplitude estimation for market-risk simulation — the case the Observatory declines to score.",
    problem:
      "Computing day-ahead portfolio risk measures for an energy trading book, evaluating quantum amplitude estimation against GPU Monte Carlo simulation.",
    modality: "Quantum amplitude estimation (prospective)",
    applicationType: "Risk simulation",
    trl: 3,
    maturityLabel: "Proof of concept",
    profiles: [
      {
        category: "insufficient",
        spectrum: null,
        confidence: "very-low",
        evidence: "insufficient",
        horizon: "current",
        drivers: [
          "The cost of loading realistic market scenarios onto quantum hardware is unknown, not merely uncertain",
          "Published studies use simplified models that break comparison equivalence with production workloads",
          "No independent replication of reported finance benchmarks exists",
        ],
        explanation:
          "The evidence base does not support an assessment, and the Observatory reports that rather than guessing. A single credible end-to-end study including data loading would make this case scoreable — in either direction. Monte Carlo remains the operational answer meanwhile.",
        lastUpdated: "2026-06-10",
        version: V,
      },
    ],
    classicalBaseline:
      "Vectorized Monte Carlo scenario simulation with variance reduction on GPU clusters — meeting regulatory confidence bands nightly.",
    quantumPathway:
      "Amplitude estimation over quantum-encoded scenario distributions — a proven mechanism in principle whose end-to-end cost, including scenario loading, has never been credibly estimated.",
    evidenceSummary:
      "The theoretical speedup is established for idealized access models only. State-preparation costs are unknown; vendor projections do not disclose assumptions; no independent replications exist. Gaps are reported as gaps.",
    accessNotes: [
      "Not currently assessable — access questions are moot until the evidence gap closes",
    ],
    activity: [
      "Foundational algorithm literature on amplitude estimation",
      "Vendor whitepapers projecting advantage without disclosed assumptions",
    ],
    coverage: { global: true, countries: [] },
    policyImplications: [
      "Illustrates the Observatory's evidence floor: missing evidence is never converted into a low score",
      "A published end-to-end resource study is the named trigger for re-assessment",
    ],
    sources: [
      { label: "Foundational algorithm literature (sample)", provenance: "peer-reviewed" },
      { label: "State-preparation cost: no published end-to-end study (sample)", provenance: "insufficient" },
      { label: "Vendor advantage projections, assumptions undisclosed (sample)", provenance: "vendor" },
      { label: "Replication search, evidence date recorded (sample)", provenance: "community" },
    ],
    related: ["en-grid", "en-cooling"],
    lastUpdated: "2026-06-10",
  },
];

export const useCaseById = (id: string): UseCasePublic | undefined =>
  USE_CASES.find((u) => u.id === id);
