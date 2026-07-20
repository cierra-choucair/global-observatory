/** Public citation layer — selective source transparency.
 *
 *  Only records approved for public display exist in this module. The
 *  complete evidence corpus, internal annotations, source-quality scores,
 *  inclusion decisions, extracted benchmarks and evidence-to-score mappings
 *  are retained by Universum Labs and have no representation in this schema.
 *
 *  Verified records reuse citation metadata supplied in project materials
 *  (the Universum Labs framework reference list) plus published NIST
 *  standards already named in the use-case content. Records without
 *  verified metadata are explicit illustrative placeholders: they carry no
 *  DOI, no external URL, and titles that cannot be mistaken for real
 *  publications. */

export type SourceType =
  | "peer-reviewed"
  | "government"
  | "standards"
  | "deployment"
  | "modeled-assessment"
  | "community"
  | "vendor"
  | "road-tour"
  | "ul-internal"
  | "undocumented";

export type SourceStatus =
  | "demonstrated"
  | "pilot"
  | "modeled"
  | "theoretical"
  | "independently-validated"
  | "vendor-reported"
  | "self-reported"
  | "pending-validation"
  | "superseded"
  | "insufficient";

export const SOURCE_TYPE_META: Record<SourceType, string> = {
  "peer-reviewed": "Peer-reviewed research",
  government: "Government publication",
  standards: "Standards publication",
  deployment: "Independently documented deployment",
  "modeled-assessment": "Modeled assessment",
  community: "Community / expert synthesis",
  vendor: "Vendor-reported",
  "road-tour": "ITU Quantum Road Tour contribution",
  "ul-internal": "Internal Universum Labs analysis",
  undocumented: "Insufficiently documented",
};

export const SOURCE_STATUS_META: Record<SourceStatus, string> = {
  demonstrated: "Demonstrated",
  pilot: "Pilot-stage",
  modeled: "Modeled",
  theoretical: "Theoretical",
  "independently-validated": "Independently validated",
  "vendor-reported": "Vendor-reported",
  "self-reported": "Self-reported",
  "pending-validation": "Pending validation",
  superseded: "Superseded",
  insufficient: "Insufficient evidence",
};

export interface PublicSourceRecord {
  id: string;
  useCaseId: string;
  title: string;
  authors?: string[];
  institution?: string;
  publication?: string;
  year?: number;
  publicationDate?: string;
  sourceType: SourceType;
  evidenceStatus: SourceStatus;
  doi?: string;
  officialUrl?: string;
  claimsSupported: string[];
  publicSummary?: string;
  jurisdictionIds?: string[];
  accessStatus?: string;
  lastReviewed?: string;
  supersededBy?: string;
  isSelectedForPublicDisplay: boolean;
  isIllustrative: boolean;
}

export interface UseCaseEvidenceRecord {
  useCaseId: string;
  lastReviewed: string;
  publicVersion: string;
  representative: true;
  limitations: string[];
  /** Public flag when material disagreement exists between sources. */
  mixedEvidenceNote?: string;
}

const R = "2026-07-15"; // evidence last-reviewed date for this sample release
const EV = "Public evidence set EV-2026.2";

export const EVIDENCE_RECORDS: UseCaseEvidenceRecord[] = [
  {
    useCaseId: "sec-qrng",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Certification-report metadata for specific commercial devices is pending publication approval",
      "Long-term field-failure statistics remain limited",
    ],
  },
  {
    useCaseId: "sec-qkd",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Cost trajectories rely on vendor roadmaps without independent validation",
      "Long-term operational reliability data for metropolitan QKD is thin",
    ],
  },
  {
    useCaseId: "sec-qnet",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Service-threshold projections are modeled; no field trial has approached them",
    ],
  },
  {
    useCaseId: "mat-ammonia",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Quantum resource estimates span two orders of magnitude across published studies",
      "Classical machine-learned-potential progress moves the baseline year over year",
    ],
  },
  {
    useCaseId: "mat-battery",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Demonstrations cover fragments below production active-space sizes",
      "Workflow economics are modeled; device pricing is vendor-quoted",
    ],
  },
  {
    useCaseId: "mat-carbon",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Final-stage misranking evidence at open-metal sites is contested in the literature",
    ],
  },
  {
    useCaseId: "en-grid",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "Operational solver performance is documented by system operators, not independently re-benchmarked",
    ],
  },
  {
    useCaseId: "en-cooling",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "The central performance claim rests on vendor case studies with undisclosed baseline tuning",
    ],
    mixedEvidenceNote:
      "Evidence is mixed: vendor-reported speedups conflict with independent benchmark results on comparable problems. The disagreement is material and unresolved; the recommended independent benchmark is designed to settle it.",
  },
  {
    useCaseId: "en-risk",
    lastReviewed: R,
    publicVersion: EV,
    representative: true,
    limitations: [
      "No published end-to-end resource study includes scenario-loading costs — the decisive evidence gap",
    ],
  },
];

/** Ordered anchor sources per use case. Order defines [n] reference numbers. */
export const SOURCES: PublicSourceRecord[] = [
  // ---------------- sec-qrng ----------------
  {
    id: "src-qrng-sp80090b",
    useCaseId: "sec-qrng",
    title: "Recommendation for the Entropy Sources Used for Random Bit Generation (NIST SP 800-90B)",
    institution: "National Institute of Standards and Technology",
    publication: "NIST Special Publication 800-90B",
    year: 2018,
    sourceType: "standards",
    evidenceStatus: "independently-validated",
    doi: "10.6028/NIST.SP.800-90B",
    claimsSupported: [
      "Entropy-source validation requirements against which commercial QRNG devices are certified",
    ],
    publicSummary:
      "Defines the entropy-source validation regime referenced by the assurance-tier claims in this analysis.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-qrng-cert",
    useCaseId: "sec-qrng",
    title: "Illustrative source record — QRNG device certification report (citation metadata pending)",
    sourceType: "government",
    evidenceStatus: "demonstrated",
    claimsSupported: [
      "Commercial QRNG devices pass entropy validation at gigabit rates",
    ],
    publicSummary:
      "Placeholder for an independently audited certification report; verified metadata has not yet been supplied for public display.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-qrng-lab",
    useCaseId: "sec-qrng",
    title: "Illustrative source record — laboratory demonstration of certified quantum randomness (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: [
      "Device-independent randomness expansion demonstrated under specified operating conditions",
    ],
    publicSummary:
      "Placeholder for peer-reviewed laboratory demonstrations; verified metadata pending.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-qrng-ul-cost",
    useCaseId: "sec-qrng",
    title: "Universum Labs lifecycle cost analysis at national PKI scale (public summary)",
    institution: "Universum Labs",
    year: 2026,
    sourceType: "ul-internal",
    evidenceStatus: "modeled",
    claimsSupported: ["Cost per protected key ceremony is negligible at national scale"],
    publicSummary:
      "Approved public summary of an internal modeled analysis; model internals and assumptions beyond this summary are not published.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- sec-qkd ----------------
  {
    id: "src-qkd-fips203",
    useCaseId: "sec-qkd",
    title: "Module-Lattice-Based Key-Encapsulation Mechanism Standard (FIPS 203)",
    institution: "National Institute of Standards and Technology",
    publication: "Federal Information Processing Standards",
    year: 2024,
    sourceType: "standards",
    evidenceStatus: "independently-validated",
    doi: "10.6028/NIST.FIPS.203",
    claimsSupported: [
      "Post-quantum key establishment is standardized and deployable in mainstream protocol stacks",
    ],
    publicSummary:
      "The standardized key-establishment mechanism underlying the hybrid post-quantum baseline in this comparison.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-qkd-fips204",
    useCaseId: "sec-qkd",
    title: "Module-Lattice-Based Digital Signature Standard (FIPS 204)",
    institution: "National Institute of Standards and Technology",
    publication: "Federal Information Processing Standards",
    year: 2024,
    sourceType: "standards",
    evidenceStatus: "independently-validated",
    doi: "10.6028/NIST.FIPS.204",
    claimsSupported: [
      "Post-quantum digital signatures are standardized, covering the authentication QKD still requires classically",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-qkd-chenmoody",
    useCaseId: "sec-qkd",
    title: "Cryptography in the Quantum Era",
    authors: ["Chen, L.", "Moody, D."],
    institution: "National Institute of Standards and Technology",
    sourceType: "government",
    evidenceStatus: "theoretical",
    officialUrl: "https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=927462",
    claimsSupported: [
      "The quantum threat to deployed cryptography is structure-specific; migration to post-quantum algorithms addresses it",
    ],
    publicSummary:
      "Government analysis of quantum-era cryptography underpinning the harvest-now-decrypt-later threat framing.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-qkd-deploy",
    useCaseId: "sec-qkd",
    title: "Illustrative source record — national metropolitan QKD deployment reports (citation metadata pending)",
    sourceType: "deployment",
    evidenceStatus: "pilot",
    claimsSupported: ["Metropolitan QKD networks are operational in several countries"],
    publicSummary:
      "Placeholder for independently documented deployment reports; verified metadata pending.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-qkd-vendor",
    useCaseId: "sec-qkd",
    title: "Illustrative source record — vendor QKD cost-trajectory roadmap (citation metadata pending)",
    institution: "Illustrative vendor (sample)",
    sourceType: "vendor",
    evidenceStatus: "vendor-reported",
    claimsSupported: ["QKD hardware cost per node declining year over year"],
    publicSummary:
      "Vendor-reported projection. Independent validation: none — treated as a claim, not evidence of realized cost.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- sec-qnet ----------------
  {
    id: "src-qnet-field",
    useCaseId: "sec-qnet",
    title: "Illustrative source record — entanglement-distribution field experiments (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Entanglement distribution demonstrated over metropolitan fiber and satellite links"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-qnet-review",
    useCaseId: "sec-qnet",
    title: "Illustrative source record — research-community review of quantum-repeater progress (citation metadata pending)",
    sourceType: "community",
    evidenceStatus: "theoretical",
    claimsSupported: ["Repeater chains beyond two nodes remain laboratory demonstrations"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-qnet-ul-scaling",
    useCaseId: "sec-qnet",
    title: "Universum Labs scaling analysis on published device parameters (public summary)",
    institution: "Universum Labs",
    year: 2026,
    sourceType: "ul-internal",
    evidenceStatus: "modeled",
    claimsSupported: ["Service-grade entanglement rates require orders-of-magnitude improvements in memory and multiplexing"],
    publicSummary:
      "Approved public summary of an internal modeled analysis; underlying model and data extractions are not published.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- mat-ammonia ----------------
  {
    id: "src-ammonia-beverland",
    useCaseId: "mat-ammonia",
    title: "Assessing Requirements to Scale to Practical Quantum Advantage",
    authors: ["Beverland, M. E.", "et al."],
    publication: "arXiv:2211.07629",
    year: 2022,
    sourceType: "modeled-assessment",
    evidenceStatus: "modeled",
    officialUrl: "https://arxiv.org/abs/2211.07629",
    claimsSupported: [
      "Full-stack resource estimates connecting quantum-chemistry algorithms to hardware requirements",
    ],
    publicSummary:
      "Resource-estimation framework spanning algorithms, architecture, error correction and physical qubits — the basis for the hardware-requirement claims in this analysis.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-ammonia-fellous",
    useCaseId: "mat-ammonia",
    title: "Optimizing Resource Efficiencies for Scalable Full-Stack Quantum Computers",
    authors: ["Fellous-Asiani, M.", "et al."],
    publication: "PRX Quantum 4, 040319",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "modeled",
    doi: "10.1103/PRXQuantum.4.040319",
    claimsSupported: [
      "Resource and energy comparisons must include the full enabling stack, not the processor alone",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-ammonia-mlip",
    useCaseId: "mat-ammonia",
    title: "Illustrative source record — machine-learned potential benchmark suites (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Machine-learned potentials reach near-DFT accuracy at a fraction of the cost"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-ammonia-synth",
    useCaseId: "mat-ammonia",
    title: "Illustrative source record — cross-study synthesis of active-site resource estimates (citation metadata pending)",
    sourceType: "community",
    evidenceStatus: "modeled",
    claimsSupported: ["Published resource estimates for nitrogen-fixation-scale systems span two orders of magnitude"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- mat-battery ----------------
  {
    id: "src-battery-fragment",
    useCaseId: "mat-battery",
    title: "Illustrative source record — hardware experiments on electrolyte fragments (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: [
      "Quantum diagonalization reproduced reference-grade energies on demonstrated electrolyte fragments",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-battery-dft",
    useCaseId: "mat-battery",
    title: "Illustrative source record — method-benchmark literature on classical redox errors (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Classical redox-potential errors exceed the decision threshold for the target additive class"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-battery-bova",
    useCaseId: "mat-battery",
    title: "Quantum Economic Advantage",
    authors: ["Bova, F.", "Goldfarb, A.", "Melko, R. G."],
    publication: "Management Science",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "theoretical",
    doi: "10.1287/mnsc.2022.4578",
    claimsSupported: [
      "Economic value from quantum approaches does not require strict asymptotic computational advantage",
    ],
    publicSummary:
      "Economic analysis supporting the framing that a bounded pilot can be justified by decision value, not only by raw speedup.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-battery-ul-cost",
    useCaseId: "mat-battery",
    title: "Universum Labs hybrid-workflow cost model (public summary)",
    institution: "Universum Labs",
    year: 2026,
    sourceType: "ul-internal",
    evidenceStatus: "modeled",
    claimsSupported: ["Hybrid workflow costs a low single-digit multiple per candidate versus the classical funnel"],
    publicSummary:
      "Approved public summary of an internal cost model based on published cloud pricing; model internals are not published.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-battery-vendor",
    useCaseId: "mat-battery",
    title: "Illustrative source record — vendor device-throughput projections (citation metadata pending)",
    institution: "Illustrative vendor (sample)",
    sourceType: "vendor",
    evidenceStatus: "vendor-reported",
    claimsSupported: ["Projected multi-fold device throughput improvement by 2027"],
    publicSummary:
      "Vendor-reported roadmap projection. Independent validation: none.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- mat-carbon ----------------
  {
    id: "src-carbon-screen",
    useCaseId: "mat-carbon",
    title: "Illustrative source record — published sorbent screening campaigns (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Classical funnels evaluate very large candidate libraries with validated enrichment"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-carbon-methods",
    useCaseId: "mat-carbon",
    title: "Illustrative source record — method-comparison synthesis on open-metal-site energetics (citation metadata pending)",
    sourceType: "community",
    evidenceStatus: "modeled",
    claimsSupported: ["Final-stage accuracy at open-metal sites remains contested"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-carbon-ul",
    useCaseId: "mat-carbon",
    title: "Universum Labs final-stage advantage projection (public summary)",
    institution: "Universum Labs",
    year: 2026,
    sourceType: "ul-internal",
    evidenceStatus: "modeled",
    claimsSupported: ["A credible quantum contribution is confined to final-stage energetics of strongly correlated sites"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- en-grid ----------------
  {
    id: "src-grid-hoefler",
    useCaseId: "en-grid",
    title: "Disentangling Hype from Practicality: On Realistically Achieving Quantum Advantage",
    authors: ["Hoefler, T.", "Häner, T.", "Troyer, M."],
    publication: "Communications of the ACM 66(5), 82–87",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "theoretical",
    doi: "10.1145/3571725",
    claimsSupported: [
      "Modest polynomial speedups are unlikely to survive end-to-end overheads on this problem class",
    ],
    publicSummary:
      "Analysis of the conditions under which quantum approaches deliver practical advantage — supporting the absence-of-mechanism finding.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-grid-jaschke",
    useCaseId: "en-grid",
    title: "Is Quantum Computing Green? An Estimate for an Energy-Efficiency Quantum Advantage",
    authors: ["Jaschke, D.", "Montangero, S."],
    publication: "Quantum Science and Technology 8, 025001",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "modeled",
    officialUrl: "https://arxiv.org/abs/2205.12092",
    claimsSupported: [
      "Energy-efficiency comparisons between quantum and classical computation are boundary-dependent",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-grid-tso",
    useCaseId: "en-grid",
    title: "Illustrative source record — system-operator performance reports (citation metadata pending)",
    sourceType: "government",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Commercial solvers meet national-scale unit-commitment requirements inside the market window"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-grid-bench",
    useCaseId: "en-grid",
    title: "Illustrative source record — independent annealing benchmark studies (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Annealing results on unit-commitment subproblems match but do not beat tuned classical heuristics"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- en-cooling ----------------
  {
    id: "src-cooling-lubinski",
    useCaseId: "en-cooling",
    title: "Application-Oriented Performance Benchmarks for Quantum Computing",
    authors: ["Lubinski, T.", "et al."],
    publication: "IEEE Transactions on Quantum Engineering 4, 1–32",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    doi: "10.1109/TQE.2023.3253761",
    claimsSupported: [
      "Application-oriented benchmark methodology exists for the recommended independent, decisive test",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-cooling-mills",
    useCaseId: "en-cooling",
    title: "Application-Motivated, Holistic Benchmarking of a Full Quantum Computing Stack",
    authors: ["Mills, D.", "et al."],
    publication: "Quantum 5, 415",
    year: 2021,
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    doi: "10.22331/q-2021-03-22-415",
    claimsSupported: ["Benchmarks must evaluate the full stack at fixed solution quality, not device metrics"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-cooling-darpa",
    useCaseId: "en-cooling",
    title: "Quantum Benchmarking Initiative (program description)",
    institution: "DARPA",
    sourceType: "government",
    evidenceStatus: "independently-validated",
    officialUrl: "https://www.darpa.mil/research/programs/quantum-benchmarking-initiative",
    claimsSupported: [
      "Staged, independently validated benchmarking is the accepted approach for assessing utility-scale claims",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-cooling-vendor",
    useCaseId: "en-cooling",
    title: "Illustrative source record — vendor district-cooling case studies (citation metadata pending)",
    institution: "Illustrative vendor (sample)",
    sourceType: "vendor",
    evidenceStatus: "vendor-reported",
    claimsSupported: ["Reported large speedups on embedded dispatch problems"],
    publicSummary:
      "Vendor-reported results measured against unoptimized baselines. Independent validation: none — this is the central evidence gap in the analysis.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-cooling-indep",
    useCaseId: "en-cooling",
    title: "Illustrative source record — independent benchmarks on network optimization problems (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "demonstrated",
    claimsSupported: ["Tuned classical and quantum-inspired methods match the quantum service on comparable problems"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-cooling-roadtour",
    useCaseId: "en-cooling",
    title: "ITU Quantum Road Tour observation — district-cooling optimization pilot (sample record)",
    institution: "National research institution (contributor type)",
    year: 2026,
    publicationDate: "2026-05-19",
    sourceType: "road-tour",
    evidenceStatus: "self-reported",
    jurisdictionIds: ["ARE"],
    claimsSupported: ["A national district-cooling optimization pilot with a cloud annealing service is underway"],
    publicSummary:
      "Approved Road Tour metadata only: country, collection date, contributor type and capability category. Respondent identity and interview content are not published.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },

  // ---------------- en-risk ----------------
  {
    id: "src-risk-hoefler",
    useCaseId: "en-risk",
    title: "Disentangling Hype from Practicality: On Realistically Achieving Quantum Advantage",
    authors: ["Hoefler, T.", "Häner, T.", "Troyer, M."],
    publication: "Communications of the ACM 66(5), 82–87",
    year: 2023,
    sourceType: "peer-reviewed",
    evidenceStatus: "theoretical",
    doi: "10.1145/3571725",
    claimsSupported: [
      "Quadratic sampling advantages are unlikely to survive end-to-end input and orchestration costs",
    ],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: false,
  },
  {
    id: "src-risk-qae",
    useCaseId: "en-risk",
    title: "Illustrative source record — foundational amplitude-estimation literature (citation metadata pending)",
    sourceType: "peer-reviewed",
    evidenceStatus: "theoretical",
    claimsSupported: ["The quadratic estimation speedup is proven for idealized oracle access"],
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-risk-gap",
    useCaseId: "en-risk",
    title: "Evidence gap record — state-preparation cost for realistic market scenarios",
    sourceType: "undocumented",
    evidenceStatus: "insufficient",
    claimsSupported: ["No published end-to-end resource study includes scenario-loading costs"],
    publicSummary:
      "Recorded as a gap, not a source: the absence of this study is why the analysis withholds an assessment.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
  {
    id: "src-risk-vendor",
    useCaseId: "en-risk",
    title: "Illustrative source record — vendor advantage projections (citation metadata pending)",
    institution: "Illustrative vendor (sample)",
    sourceType: "vendor",
    evidenceStatus: "vendor-reported",
    claimsSupported: ["Projected quantum advantage in risk simulation by 2028, assumptions undisclosed"],
    publicSummary: "Vendor-reported projection. Independent validation: none.",
    lastReviewed: R,
    isSelectedForPublicDisplay: true,
    isIllustrative: true,
  },
];

/** Claim-level reference map: section keys to citation ids.
 *  Keys: "driver:<i>", "evidenceSummary", "classicalBaseline",
 *  "quantumPathway", "activity:<i>", "access:<i>", "policy:<i>". */
export const CLAIM_REFS: Record<string, Record<string, string[]>> = {
  "sec-qrng": {
    "driver:0": ["src-qrng-sp80090b", "src-qrng-lab"],
    evidenceSummary: ["src-qrng-sp80090b", "src-qrng-cert", "src-qrng-lab"],
    "activity:0": ["src-qrng-cert"],
    "policy:0": ["src-qrng-ul-cost"],
  },
  "sec-qkd": {
    "driver:0": ["src-qkd-fips203", "src-qkd-fips204", "src-qkd-chenmoody"],
    "driver:2": ["src-qkd-vendor"],
    classicalBaseline: ["src-qkd-fips203", "src-qkd-fips204"],
    evidenceSummary: ["src-qkd-deploy", "src-qkd-vendor"],
    "activity:0": ["src-qkd-deploy"],
    "activity:1": ["src-qkd-chenmoody"],
  },
  "sec-qnet": {
    "driver:0": ["src-qnet-ul-scaling"],
    evidenceSummary: ["src-qnet-field", "src-qnet-review", "src-qnet-ul-scaling"],
    "activity:0": ["src-qnet-field"],
  },
  "mat-ammonia": {
    "driver:1": ["src-ammonia-beverland", "src-ammonia-synth"],
    classicalBaseline: ["src-ammonia-mlip"],
    quantumPathway: ["src-ammonia-beverland", "src-ammonia-fellous"],
    evidenceSummary: ["src-ammonia-beverland", "src-ammonia-synth"],
  },
  "mat-battery": {
    "driver:1": ["src-battery-fragment"],
    "driver:0": ["src-battery-dft"],
    evidenceSummary: ["src-battery-fragment", "src-battery-ul-cost", "src-battery-vendor"],
    "policy:0": ["src-battery-bova"],
  },
  "mat-carbon": {
    "driver:0": ["src-carbon-screen"],
    "driver:1": ["src-carbon-methods", "src-carbon-ul"],
    evidenceSummary: ["src-carbon-screen", "src-carbon-methods"],
  },
  "en-grid": {
    "driver:0": ["src-grid-tso"],
    "driver:1": ["src-grid-hoefler"],
    evidenceSummary: ["src-grid-tso", "src-grid-bench"],
    "access:0": ["src-grid-hoefler"],
  },
  "en-cooling": {
    "driver:1": ["src-cooling-vendor"],
    "driver:2": ["src-cooling-indep"],
    evidenceSummary: ["src-cooling-vendor", "src-cooling-indep"],
    "policy:0": ["src-cooling-lubinski", "src-cooling-mills", "src-cooling-darpa"],
    "activity:0": ["src-cooling-vendor", "src-cooling-roadtour"],
  },
  "en-risk": {
    "driver:0": ["src-risk-gap"],
    "driver:1": ["src-risk-qae"],
    "driver:2": ["src-risk-vendor"],
    evidenceSummary: ["src-risk-hoefler", "src-risk-gap"],
    quantumPathway: ["src-risk-qae", "src-risk-hoefler"],
  },
};

export const sourcesForUseCase = (useCaseId: string): PublicSourceRecord[] =>
  SOURCES.filter((s) => s.useCaseId === useCaseId && s.isSelectedForPublicDisplay);

export const evidenceRecordFor = (useCaseId: string): UseCaseEvidenceRecord | undefined =>
  EVIDENCE_RECORDS.find((e) => e.useCaseId === useCaseId);

/** 1-based reference number of a citation within its use case's ordered list. */
export const refNumber = (useCaseId: string, citationId: string): number =>
  sourcesForUseCase(useCaseId).findIndex((s) => s.id === citationId) + 1;
