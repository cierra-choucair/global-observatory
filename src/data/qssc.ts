import { ds } from "./helpers";
import type { UseCase } from "../types";

/** SAMPLE evaluations — illustrative data authored for the demo.
 *  Values follow the v1.0 scoring conventions but are not real assessments. */
export const QSSC_USE_CASES: UseCase[] = [
  {
    id: "qssc-qrng",
    domain: "qssc",
    title: "Quantum random number generation for national root-of-trust",
    short:
      "Certifiable physical entropy for national PKI root keys and high-assurance government credentials.",
    problem:
      "Provide certifiably unpredictable entropy for root key generation in the national PKI, satisfying the highest assurance tier of emerging quantum-safe certification schemes.",
    owner: "National cybersecurity authority / PKI operator",
    scale: "National PKI: ~10⁴ root and intermediate key ceremonies per year plus HSM seeding",
    outcomeThreshold:
      "Full entropy per NIST SP 800-90B with physically certifiable source; zero tolerated entropy-source failures",
    frequency: "Continuous seeding; ~10⁴ key ceremonies / year over a 10-year evaluation period",
    horizon: "Current",
    mechanism: {
      primitive: "Quantum measurement randomness (photonic shot noise / branching-path detection)",
      source: "Proven and experimentally demonstrated",
      description:
        "Randomness guaranteed by quantum measurement statistics rather than computational assumptions; device-independent protocols provide certification pathways no classical source can match.",
    },
    alternatives: [
      {
        id: "c-csprng",
        type: "classical",
        name: "CSPRNG + classical hardware entropy",
        approach: "DRBG seeded by ring-oscillator / thermal-noise TRNGs inside certified HSMs",
        trl: 9,
        scores: {
          outcome: ds(0.25, 0.3, 0.32, "demonstrated", "Meets FIPS entropy requirements but cannot provide physically certifiable, device-independent entropy — misses the stretch assurance tier"),
          performance: ds(0.8, 0.85, 0.88, "demonstrated", "Gbps-class throughput, negligible latency"),
          feasibility: ds(0.92, 0.95, 0.96, "demonstrated", "Commodity, fully integrated"),
          economics: ds(0.8, 0.85, 0.88, "demonstrated", "Bundled with existing HSM estate"),
          environment: ds(0.93, 0.95, 0.96, "modeled", "Negligible marginal footprint"),
          access: ds(0.92, 0.95, 0.96, "demonstrated", "Universally procurable"),
          risk: ds(0.35, 0.45, 0.5, "community", "Entropy-source failures are historically hard to detect; auditability limited"),
        },
      },
      {
        id: "q-qrng",
        type: "quantum",
        name: "Certified QRNG appliances",
        approach: "Photonic QRNG modules with continuous health monitoring and entropy certification",
        trl: 9,
        scores: {
          outcome: ds(0.93, 0.95, 0.97, "demonstrated", "Certifiable physical entropy; meets the highest assurance tier"),
          performance: ds(0.88, 0.9, 0.94, "demonstrated", "Gbps rates in commercial devices"),
          feasibility: ds(0.93, 0.95, 0.97, "demonstrated", "Standard rack appliance; no cryogenics"),
          economics: ds(0.78, 0.82, 0.88, "demonstrated", "Appliance cost modest at national-PKI scale"),
          environment: ds(0.86, 0.88, 0.92, "modeled", "Comparable to network appliances"),
          access: ds(0.86, 0.88, 0.92, "demonstrated", "Commercially shipped worldwide"),
          risk: ds(0.82, 0.85, 0.9, "demonstrated", "Certified devices with live health monitoring"),
        },
        scenarioDeltas: {
          "near-term": { economics: 0.03 },
        },
      },
    ],
    comparison: { classical: "c-csprng", quantum: "q-qrng" },
    gates: {
      G1: { state: "pass", note: "Identical task: entropy for root key generation at national scale" },
      G2: { state: "pass", note: "Both meet SP 800-90B; only QRNG meets the certification stretch tier" },
      G3: { state: "pass", note: "Quantum measurement randomness — specific, traceable mechanism" },
      G4: { state: "pass", note: "Commercial appliances; no resource-estimation gap" },
      G5: { state: "pass", note: "No export or procurement barrier for entropy appliances" },
      G6: { state: "pass", note: "Operational deployments documented in multiple national programs" },
    },
    arsFloors: { H: 85, C: 80, W: 75, I: 80, P: 75, R: 70 },
    rov: { U: 45, P: 80, V: 40, S: 55, J: 60, K: 70 },
    eci: { D: 85, B: 80, V: 90, I: 80, R: 75, C: 80, T: 85 },
    coverage: 88,
    evidenceClaims: [
      { text: "Commercial QRNG devices pass SP 800-90B entropy validation at Gbps rates", tag: "demonstrated", source: "Certification reports, independently audited (sample)" },
      { text: "Device-independent randomness expansion demonstrated in laboratory settings", tag: "demonstrated", source: "Peer-reviewed loophole-free Bell-test experiments (sample)" },
      { text: "Cost per protected key ceremony is negligible at national scale", tag: "modeled", source: "UL lifecycle cost model v0.4 (sample)" },
      { text: "Classical TRNG failure modes remain difficult to detect in the field", tag: "community", source: "Post-incident analyses across CVE record (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "Quantum-safe PKI certification schemes finalized in major procurement frameworks", predictedState: "Assurance premium codified; QRNG becomes default for new root deployments", dependency: "Regulatory" },
      { scenario: "ftqc", trigger: "Fault-tolerant quantum computing milestones", predictedState: "No material change — QRNG value is independent of quantum computing progress", dependency: "None" },
    ],
    crossoverTriggers: [
      "A validated attack class against certified QRNG devices",
      "Classical entropy certification reaching equivalent assurance at materially lower cost",
    ],
    crossoverCredible: false,
    drivers: [
      "Certifiable-entropy premium in the outcome value function",
      "TRL 9 supply chain with negligible integration burden",
      "Auditability gap of classical entropy sources (risk domain)",
    ],
    sensitivity: [
      "If regulators accept classical entropy certification at the same tier, the outcome gap halves and QPS returns to parity",
      "Assurance premium value function is the single largest driver — it must be anchored to the adopted certification scheme",
    ],
    summary:
      "Quantum random number generation is the rare case where the quantum alternative is operationally superior today: certified appliances are TRL 9, integration cost is low, and the physically certifiable entropy they provide meets an assurance tier classical sources cannot reach. The verdict is driven by the certification premium, not raw performance. It would flip only if certified QRNG devices were compromised as a class or regulators equalized assurance tiers. Evidence confidence is high and largely demonstrated. No separate research program is needed — this is a procurement decision.",
  },

  {
    id: "qssc-qkd",
    domain: "qssc",
    title: "Metropolitan QKD backbone for government networks",
    short:
      "Quantum key distribution across ministry sites, evaluated against post-quantum cryptography.",
    problem:
      "Protect inter-ministry traffic against harvest-now-decrypt-later adversaries for 25+ years, comparing a metropolitan QKD fiber backbone with hybrid post-quantum cryptography rollout.",
    owner: "Government digital authority / national telecom operator",
    scale: "20–40 government sites over metropolitan dark fiber (≤ 80 km links)",
    outcomeThreshold:
      "Confidentiality of classified traffic against a future cryptographically relevant quantum computer; continuous key availability ≥ 99.9%",
    frequency: "Continuous key supply; 10-year evaluation period",
    horizon: "Current → near-term",
    mechanism: {
      primitive: "Quantum key distribution (BB84 / decoy-state, information-theoretic link security)",
      source: "Proven in theory; extensively demonstrated at metro scale",
      description:
        "Security derives from quantum measurement disturbance rather than computational hardness — but only per link; trusted relay nodes re-expose keys, and authentication still requires classical (post-quantum) cryptography.",
    },
    alternatives: [
      {
        id: "c-pqc",
        type: "classical",
        name: "Hybrid post-quantum cryptography",
        approach: "ML-KEM + ML-DSA hybrid TLS/IPsec across existing network estate with crypto-agility layer",
        trl: 8,
        scores: {
          outcome: ds(0.8, 0.85, 0.9, "demonstrated", "Meets the HNDL threat model end-to-end, including authentication, with crypto-agility as hedge"),
          performance: ds(0.87, 0.9, 0.93, "demonstrated", "Software-speed key establishment; no distance limits"),
          feasibility: ds(0.86, 0.9, 0.94, "demonstrated", "Standardized primitives in mainstream stacks"),
          economics: ds(0.86, 0.9, 0.94, "demonstrated", "Software rollout on existing infrastructure"),
          environment: ds(0.93, 0.95, 0.97, "modeled", "No dedicated hardware"),
          access: ds(0.86, 0.9, 0.94, "demonstrated", "Available to every jurisdiction"),
          risk: ds(0.6, 0.7, 0.8, "community", "Residual mathematical-break risk, mitigated by hybrid constructions"),
        },
        scenarioDeltas: {
          "near-term": { outcome: 0.03 },
        },
      },
      {
        id: "q-qkd",
        type: "quantum",
        name: "Metropolitan QKD backbone",
        approach: "Decoy-state BB84 over dedicated dark fiber with trusted relay nodes",
        trl: 7,
        scores: {
          outcome: ds(0.5, 0.6, 0.7, "demonstrated", "Information-theoretic link security, but trusted nodes break the end-to-end guarantee and authentication still needs PQC"),
          performance: ds(0.4, 0.5, 0.6, "demonstrated", "Key rates and distance limits constrain topology"),
          feasibility: ds(0.5, 0.6, 0.7, "demonstrated", "Mature at metro scale; trusted-node architecture required"),
          economics: ds(0.2, 0.3, 0.4, "modeled", "Dark fiber plus per-node hardware and operations"),
          environment: ds(0.45, 0.55, 0.65, "modeled", "Dedicated hardware per link"),
          access: ds(0.25, 0.35, 0.45, "community", "Physical infrastructure — not cloud-substitutable"),
          risk: ds(0.35, 0.45, 0.55, "community", "Side-channel record, certification schemes immature"),
        },
        scenarioDeltas: {
          "near-term": { economics: 0.1, access: 0.1 },
          ftqc: { outcome: 0.1 },
        },
      },
    ],
    comparison: { classical: "c-pqc", quantum: "q-qkd" },
    gates: {
      G1: { state: "pass", note: "Same threat model and traffic set after careful framing" },
      G2: { state: "pass", note: "Both meet confidentiality threshold under stated assumptions" },
      G3: { state: "pass", note: "QKD mechanism specific and extensively demonstrated" },
      G4: { state: "pass", note: "Commercial systems; costs measurable" },
      G5: { state: "conditional", note: "Certification schemes and procurement frameworks immature in most jurisdictions" },
      G6: { state: "conditional", note: "Operational evidence exists but long-term reliability data is thin" },
    },
    arsCaps: { C: 10 },
    rov: { U: 55, P: 60, V: 60, S: 70, J: 65, K: 60 },
    eci: { D: 70, B: 75, V: 80, I: 75, R: 60, C: 70, T: 75 },
    coverage: 82,
    evidenceClaims: [
      { text: "Metropolitan QKD networks are operational in several countries", tag: "demonstrated", source: "Published national deployment reports (sample)" },
      { text: "PQC standards are finalized and deployed in mainstream protocol stacks", tag: "demonstrated", source: "Standards-body publications and browser/OS release notes (sample)" },
      { text: "QKD hardware cost per node declining ~15% per year", tag: "vendor", source: "Vendor roadmaps — not independently validated (sample)" },
      { text: "End-to-end QKD without trusted nodes requires quantum repeaters", tag: "community", source: "Research-community consensus reviews (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "First QKD certification schemes adopted; hardware cost −30%", predictedState: "Economics and access improve; verdict unchanged — PQC still dominates operationally", dependency: "Economic / regulatory" },
      { scenario: "ftqc", trigger: "Cryptographically relevant quantum computer demonstrated", predictedState: "Value of information-theoretic layers rises; PQC remains sufficient unless mathematically broken", dependency: "Hardware-gated" },
    ],
    crossoverTriggers: [
      "Practical quantum repeaters removing trusted-node exposure",
      "Order-of-magnitude reduction in per-link lifecycle cost",
      "Regulatory mandate for information-theoretic security on defined critical links",
      "A credible mathematical break of deployed lattice-based PQC",
    ],
    crossoverCredible: true,
    drivers: [
      "PQC sufficiency at software cost (outcome + economics)",
      "QKD lifecycle economics and trusted-node security gap",
      "Access: physical infrastructure with no cloud substitute",
    ],
    sensitivity: [
      "A mathematical break of lattice assumptions flips the outcome value function decisively toward QKD",
      "Verdict robust to ±0.10 on every QKD criterion — the gap is structural, not parametric",
    ],
    summary:
      "For protecting government traffic against future quantum attack, hybrid post-quantum cryptography clears the requirement at software cost, while a metropolitan QKD backbone adds physical-layer security only per link, at far higher lifecycle cost and with trusted-node exposure. The operational verdict is a clear classical preference. QKD retains genuine preparation value: fiber, skills and certification groundwork carry forward to future quantum networks, so the recommended lane is prepare/partner rather than dismissal. The verdict would flip if deployed PQC were mathematically broken or repeaters removed trusted nodes at acceptable cost. Evidence confidence is moderate-to-high.",
  },

  {
    id: "qssc-qnet",
    domain: "qssc",
    title: "National quantum network testbed (entanglement distribution)",
    short:
      "Entanglement distribution infrastructure for future quantum-network services, versus doing the minimum today.",
    problem:
      "Decide whether to invest now in an entanglement-distribution testbed enabling future services (blind quantum computing, distributed sensing, secure time transfer), against a do-minimum baseline of PQC plus classical networking.",
    owner: "National research & innovation agency",
    scale: "3–5 node regional testbed, ~100 km spans, memory-assisted links",
    outcomeThreshold:
      "Operational service threshold: entanglement rates and fidelities supporting at least one application beating its classical alternative",
    frequency: "Programmatic investment decision; 10-year horizon",
    horizon: "Research program",
    mechanism: {
      primitive: "Entanglement swapping + quantum teleportation over memory-assisted repeater links",
      source: "Demonstrated in laboratory; service-scale performance modeled",
      description:
        "Distributed entanglement is the enabling resource for quantum-network services; no classical system can replicate it, but current rates and fidelities sit orders of magnitude below service thresholds.",
    },
    alternatives: [
      {
        id: "c-domin",
        type: "classical",
        name: "Do-minimum: PQC + classical networking",
        approach: "Maintain classical network estate with PQC rollout; no quantum-network investment",
        trl: 9,
        scores: {
          outcome: ds(0.75, 0.8, 0.85, "demonstrated", "Meets all current service requirements; provides none of the future quantum services"),
          performance: ds(0.87, 0.9, 0.93, "demonstrated", "Mature networking stack"),
          feasibility: ds(0.92, 0.95, 0.97, "demonstrated", "Business as usual"),
          economics: ds(0.92, 0.95, 0.97, "demonstrated", "No incremental capital"),
          environment: ds(0.93, 0.95, 0.97, "modeled", "No marginal footprint"),
          access: ds(0.92, 0.95, 0.97, "demonstrated", "Universal"),
          risk: ds(0.7, 0.75, 0.8, "community", "Opportunity risk of missing capability build-up"),
        },
      },
      {
        id: "q-entnet",
        type: "quantum",
        name: "Entanglement-distribution testbed",
        approach: "Memory-assisted entanglement swapping across 3–5 nodes; standards and workforce development",
        trl: 3,
        scores: {
          outcome: ds(0.2, 0.3, 0.45, "modeled", "No operational service today; value is future capability"),
          performance: ds(0.08, 0.15, 0.25, "demonstrated", "Lab rates/fidelities far below service thresholds"),
          feasibility: ds(0.15, 0.25, 0.35, "modeled", "Repeater chains beyond two nodes remain laboratory work"),
          economics: ds(0.08, 0.15, 0.25, "modeled", "Dedicated fiber, cryogenics, specialist staff"),
          environment: ds(0.4, 0.5, 0.6, "modeled", "Small absolute footprint at testbed scale"),
          access: ds(0.1, 0.2, 0.3, "community", "A handful of groups worldwide can operate one"),
          risk: ds(0.3, 0.4, 0.5, "community", "Technology and skills-retention risk"),
        },
        scenarioDeltas: {
          "near-term": { performance: 0.1, feasibility: 0.1 },
          ftqc: { outcome: 0.25, performance: 0.3, feasibility: 0.25, economics: 0.15, access: 0.15 },
        },
      },
    ],
    comparison: { classical: "c-domin", quantum: "q-entnet" },
    gates: {
      G1: { state: "pass", note: "Framed as investment decision with do-minimum baseline" },
      G2: { state: "fail", note: "No quantum configuration meets a minimum operational service threshold today" },
      G3: { state: "pass", note: "Entanglement swapping + teleportation — specific and traceable" },
      G4: { state: "conditional", note: "Resource pathway modeled; repeater performance assumptions dominate" },
      G5: { state: "pass", note: "No prohibitive constraint at testbed scale" },
      G6: { state: "fail", note: "No deployment evidence — research infrastructure only" },
    },
    gateOverrides: {
      ftqc: {
        G2: { state: "conditional", note: "Service thresholds plausibly reachable for niche applications" },
      },
    },
    rov: { U: 85, P: 65, V: 75, S: 85, J: 70, K: 65 },
    eci: { D: 55, B: 60, V: 65, I: 70, R: 55, C: 60, T: 80 },
    coverage: 74,
    evidenceClaims: [
      { text: "Entanglement distribution demonstrated over metropolitan fiber and satellite links", tag: "demonstrated", source: "Peer-reviewed field experiments (sample)" },
      { text: "Repeater chains beyond two nodes remain laboratory demonstrations", tag: "community", source: "Research-community reviews (sample)" },
      { text: "Service-grade rates require 10³–10⁴× improvement in memory and multiplexing", tag: "modeled", source: "UL scaling model on published device parameters (sample)" },
    ],
    keyframes: [
      { scenario: "near-term", trigger: "Multi-node memory-assisted repeater field trial", predictedState: "Feasibility and performance improve; still far below service threshold", dependency: "Hardware-gated" },
      { scenario: "ftqc", trigger: "Networked fault-tolerant modules require entanglement backbone", predictedState: "Testbed capability becomes strategic infrastructure for distributed FTQC", dependency: "Hardware-gated" },
    ],
    crossoverTriggers: [
      "Repeater field trials achieving service-relevant entanglement rates",
      "A standardized quantum-network protocol stack",
      "A demonstrated application (sensing, time transfer) beating its classical alternative end-to-end",
    ],
    crossoverCredible: false,
    drivers: [
      "Upside magnitude and spillover (workforce, metrology, standards) dominate ROV",
      "G2 failure: no operational service pathway today",
      "Do-minimum baseline is nearly free",
    ],
    sensitivity: [
      "ROV rests on upside magnitude U — if blind-computation and distributed-sensing demand fail to materialize, ROV falls below 60",
      "Operational verdict is insensitive to any plausible parameter change this decade",
    ],
    summary:
      "An entanglement-distribution testbed cannot be justified operationally: no service threshold is met and none will be soon, so the operational lane is unambiguous. The investment case is a research one, and it is strong — upside magnitude, value of information and spillover into workforce and standards put ROV above the priority-research line. The framework keeps these verdicts separate by design: losing today's operational comparison does not mean the capability should not be built. Reassess when multi-node repeater trials report service-relevant rates. Evidence confidence is moderate.",
  },
];
