import type { CountryProfile } from "../types";

const V = "2026.2";

/** SAMPLE country profiles — illustrative data authored for the demo.
 *  Capability entries are descriptive public bands; domain outlooks carry
 *  only final public outputs of the Universum Labs analysis. */
export const COUNTRIES: CountryProfile[] = [
  {
    iso3: "ARE",
    mapId: "784",
    name: "United Arab Emirates",
    region: "Arab States",
    dataStatus: "comprehensive",
    lastUpdated: "2026-07-08",
    summary:
      "A resourced national quantum program with strong institutional capacity and enabling infrastructure; the specialist workforce is still concentrated in flagship institutions. Net-zero and water-security strategies, and sovereign data-residency rules, shape how the analysis reads locally.",
    strategies: [
      "National quantum research program with dedicated budget",
      "Net-zero 2050 and water-security strategies",
      "Sovereign data-residency rules for government workloads",
    ],
    capabilities: [
      { area: "Hardware availability", band: "moderate", note: "Regional research systems plus commercial cloud access; no domestic utility-scale hardware" },
      { area: "Cloud substitutability", band: "strong", note: "Multiple providers reachable; residency rules constrain sensitive workloads" },
      { area: "Workforce & research ecosystem", band: "developing", note: "Growing pipeline concentrated in flagship institutions" },
      { area: "Enabling infrastructure", band: "extensive", note: "Advanced datacenter, fiber and energy infrastructure" },
      { area: "Institutional capacity", band: "strong", note: "Well-funded procurement and program management capacity" },
      { area: "Standards & regulatory activity", band: "developing", note: "Active in regional quantum-safe certification discussions" },
      { area: "Resilience & vendor diversity", band: "moderate", note: "Vendor concentration in key technology segments" },
    ],
    programs: [
      "National quantum research center (sample)",
      "Sovereign-cloud program covering government workloads (sample)",
    ],
    deployments: [
      "Certified quantum random number generation in a national credential pilot (sample)",
      "District-cooling optimization pilot with a cloud annealing service (sample)",
    ],
    constraints: [
      "Data-residency rules restrict some cloud-based quantum workloads",
      "Specialist workforce concentrated in a small number of institutions",
    ],
    sovereigntyNotes:
      "Government workloads are subject to data-residency requirements, which affects cloud-based quantum access for sensitive data.",
    sources: [
      { label: "National strategy and budget documents (sample)", provenance: "government" },
      { label: "Observatory country research file (sample)", provenance: "community" },
      { label: "Road Tour contribution, verified (sample)", provenance: "government" },
    ],
    roadTour: {
      available: true,
      latest: "2026-05-19",
      institutionType: "National research institution",
      updatedCategories: ["Workforce & research ecosystem", "Programs & deployments"],
      verification: "verified",
    },
    outlooks: [
      {
        domain: "security",
        profile: {
          category: "hybrid",
          spectrum: { position: 50, low: 40, high: 60 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Certified quantum random number generation is deployable now through standard procurement",
            "Post-quantum cryptography meets the long-horizon threat at software cost and anchors the migration",
            "Sovereign fiber assets improve the economics of preparing for future quantum networking",
          ],
          explanation:
            "A selective pursuit posture fits best: deploy the quantum option that is ready today, anchor protection in post-quantum migration, and prepare infrastructure where sovereign assets lower the cost.",
          lastUpdated: "2026-07-08",
          version: V,
        },
        relevantUseCases: ["sec-qrng", "sec-qkd", "sec-qnet"],
      },
      {
        domain: "materials",
        profile: {
          category: "validation",
          spectrum: { position: 45, low: 35, high: 55 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Cloud access makes hybrid simulation pilots feasible without domestic hardware",
            "Hydrogen-economy strategy raises the value of catalyst-simulation research",
            "Local evidence base is thin — a bounded validation pilot is the right first commitment",
          ],
          explanation:
            "The national profile supports a decisive validation pilot on hybrid materials simulation, with catalyst research tracked as a strategic long-horizon opportunity.",
          lastUpdated: "2026-07-08",
          version: V,
        },
        relevantUseCases: ["mat-battery", "mat-ammonia"],
      },
      {
        domain: "energy",
        profile: {
          category: "classical",
          spectrum: { position: 35, low: 25, high: 45 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Grid optimization requirements are met by classical solvers with margin",
            "District cooling is a major national load where the classical shortfall is real — an independent benchmark is recommended",
            "Quantum-inspired classical options are procurable today for network optimization",
          ],
          explanation:
            "Energy-system optimization remains classical for now, with one targeted exception: district cooling justifies an independent, decisive benchmark given its scale in the national load.",
          lastUpdated: "2026-07-08",
          version: V,
        },
        relevantUseCases: ["en-grid", "en-cooling", "en-risk"],
      },
    ],
    countryUseCaseNotes: [
      { useCaseId: "sec-qrng", note: "Deployable now through standard procurement; certification alignment underway.", category: "quantum" },
      { useCaseId: "sec-qkd", note: "Sovereign fiber assets improve preparation economics; operational case still favors post-quantum cryptography.", category: "prepare" },
      { useCaseId: "mat-battery", note: "Under the national profile, a bounded validation pilot is recommended before scaling.", category: "validation" },
      { useCaseId: "en-cooling", note: "High local relevance: district cooling is a major load; an independent benchmark is recommended.", category: "validation" },
      { useCaseId: "en-grid", note: "Classical pathway confirmed under local conditions.", category: "classical" },
    ],
  },

  {
    iso3: "CHE",
    mapId: "756",
    name: "Switzerland",
    region: "Europe",
    dataStatus: "comprehensive",
    lastUpdated: "2026-06-30",
    summary:
      "A dense quantum research ecosystem with university-hosted hardware, an extensive specialist workforce, and active standards participation. The analysis reads most strongly toward hybrid materials work and research leadership.",
    strategies: [
      "National quantum initiative with university-hosted hardware access",
      "Federal climate legislation in force",
      "Active participation in international standardization",
    ],
    capabilities: [
      { area: "Hardware availability", band: "strong", note: "University-hosted systems plus full cloud access" },
      { area: "Cloud substitutability", band: "strong", note: "Unconstrained for most workloads" },
      { area: "Workforce & research ecosystem", band: "extensive", note: "Deep specialist base across universities and industry labs" },
      { area: "Enabling infrastructure", band: "extensive", note: "First-class compute, networking and laboratory infrastructure" },
      { area: "Institutional capacity", band: "strong", note: "Established funding and procurement mechanisms" },
      { area: "Standards & regulatory activity", band: "strong", note: "Active contributor to international quantum-safe standardization" },
      { area: "Resilience & vendor diversity", band: "moderate", note: "Good diversity; some dependence on foreign hardware roadmaps" },
    ],
    programs: ["National quantum initiative (sample)", "University-industry quantum hubs (sample)"],
    deployments: [
      "Long-running quantum key distribution research links (sample)",
      "Hybrid materials-simulation pilots with industrial chemistry partners (sample)",
    ],
    constraints: ["Scale-up of pilots depends on industrial partnerships"],
    sources: [
      { label: "Federal research program documentation (sample)", provenance: "government" },
      { label: "Observatory country research file (sample)", provenance: "community" },
      { label: "Road Tour contribution, verified (sample)", provenance: "peer-reviewed" },
    ],
    roadTour: {
      available: true,
      latest: "2026-04-14",
      institutionType: "Academic consortium",
      updatedCategories: ["Hardware availability", "Standards & regulatory activity"],
      verification: "verified",
    },
    outlooks: [
      {
        domain: "security",
        profile: {
          category: "classical",
          spectrum: { position: 30, low: 25, high: 40 },
          confidence: "high",
          evidence: "demonstrated",
          horizon: "current",
          drivers: [
            "Post-quantum migration is mature and meets the operational requirement",
            "Quantum key distribution heritage carries research and standards value rather than an operational case",
            "Standards leadership is the highest-leverage national contribution",
          ],
          explanation:
            "Operational protection is anchored in post-quantum cryptography; the country's quantum-communications strength is best expressed through research infrastructure and standards leadership.",
          lastUpdated: "2026-06-30",
          version: V,
        },
        relevantUseCases: ["sec-qkd", "sec-qrng", "sec-qnet"],
      },
      {
        domain: "materials",
        profile: {
          category: "hybrid",
          spectrum: { position: 55, low: 45, high: 60 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Hardware access and workforce depth make hybrid pilots low-friction",
            "Industrial chemistry demand provides real validation problems",
            "Method-development capacity feeds improvements back into the evidence base",
          ],
          explanation:
            "The strongest domain outlook: hybrid quantum–classical simulation pilots are practical today and the ecosystem can both use and improve them.",
          lastUpdated: "2026-06-30",
          version: V,
        },
        relevantUseCases: ["mat-battery", "mat-ammonia"],
      },
      {
        domain: "energy",
        profile: {
          category: "monitor",
          spectrum: { position: 30, low: 20, high: 35 },
          confidence: "moderate",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Grid optimization needs are met classically with margin",
            "District-cooling exposure is limited compared with other jurisdictions",
            "Research capacity keeps monitoring costs low",
          ],
          explanation:
            "No operational quantum case in the energy domain; the research ecosystem makes monitoring essentially free.",
          lastUpdated: "2026-06-30",
          version: V,
        },
        relevantUseCases: ["en-grid", "en-risk"],
      },
    ],
    countryUseCaseNotes: [
      { useCaseId: "mat-battery", note: "Pilot-ready under the national profile; industrial partnerships available.", category: "hybrid" },
      { useCaseId: "sec-qnet", note: "Strong fit for research leadership and standards contributions.", category: "research" },
    ],
  },

  {
    iso3: "SGP",
    mapId: "702",
    name: "Singapore",
    region: "Asia-Pacific",
    dataStatus: "comprehensive",
    lastUpdated: "2026-07-01",
    summary:
      "A resourced national quantum strategy with strong workforce, cloud access and institutional capacity; an active quantum-safe network testbed makes security the most developed domain. Import dependence keeps resilience a watch item.",
    strategies: [
      "Funded national quantum strategy",
      "National quantum-safe network testbed",
      "Digital-security masterplan",
    ],
    capabilities: [
      { area: "Hardware availability", band: "strong", note: "Regional systems and full cloud access" },
      { area: "Cloud substitutability", band: "strong", note: "Unconstrained for most workloads" },
      { area: "Workforce & research ecosystem", band: "strong", note: "Established research centers and industry programs" },
      { area: "Enabling infrastructure", band: "extensive", note: "World-class digital and physical infrastructure" },
      { area: "Institutional capacity", band: "strong", note: "Fast, well-resourced program execution" },
      { area: "Standards & regulatory activity", band: "strong", note: "Active quantum-safe certification and testbed activity" },
      { area: "Resilience & vendor diversity", band: "developing", note: "Import dependence across the hardware stack" },
    ],
    programs: ["National quantum office and research centers (sample)", "Quantum-safe network testbed (sample)"],
    deployments: [
      "Operational quantum-safe network trials spanning PQC and QKD segments (sample)",
      "District-cooling optimization studies (sample)",
    ],
    constraints: ["Hardware import dependence", "Talent competition with the wider tech sector"],
    sources: [
      { label: "National strategy documents (sample)", provenance: "government" },
      { label: "Testbed technical reports (sample)", provenance: "government" },
      { label: "Road Tour contribution, verified (sample)", provenance: "government" },
    ],
    roadTour: {
      available: true,
      latest: "2026-06-02",
      institutionType: "Government agency",
      updatedCategories: ["Programs & deployments", "Standards & regulatory activity"],
      verification: "verified",
    },
    outlooks: [
      {
        domain: "security",
        profile: {
          category: "validation",
          spectrum: { position: 45, low: 35, high: 55 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "An operational quantum-safe testbed generates direct local evidence",
            "Post-quantum migration proceeds as the protection baseline",
            "Testbed results will determine whether QKD segments earn a lasting operational role",
          ],
          explanation:
            "The national testbed makes this the rare jurisdiction that can settle its own quantum-communications questions with local evidence; validation is under way by design.",
          lastUpdated: "2026-07-01",
          version: V,
        },
        relevantUseCases: ["sec-qkd", "sec-qrng", "sec-qnet"],
      },
      {
        domain: "materials",
        profile: {
          category: "hybrid",
          spectrum: { position: 50, low: 45, high: 60 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Cloud access and research capacity support hybrid pilots today",
            "Advanced-manufacturing strategy provides candidate applications",
            "Evidence base still rests on small demonstrated fragments",
          ],
          explanation:
            "Hybrid simulation pilots are practical now; the binding question is which industrial applications to validate first.",
          lastUpdated: "2026-07-01",
          version: V,
        },
        relevantUseCases: ["mat-battery"],
      },
      {
        domain: "energy",
        profile: {
          category: "monitor",
          spectrum: { position: 35, low: 25, high: 45 },
          confidence: "moderate",
          evidence: "pilot",
          horizon: "current",
          drivers: [
            "Classical optimization meets grid requirements",
            "Significant district-cooling load makes the pending independent benchmark directly relevant",
            "Quantum-inspired alternatives are procurable today",
          ],
          explanation:
            "Classical approaches remain sufficient; the district-cooling benchmark question is worth watching closely given the national cooling load.",
          lastUpdated: "2026-07-01",
          version: V,
        },
        relevantUseCases: ["en-grid", "en-cooling"],
      },
    ],
    countryUseCaseNotes: [
      { useCaseId: "sec-qkd", note: "Active testbed segments generate local evidence directly.", category: "validation" },
      { useCaseId: "en-cooling", note: "Large district-cooling load makes the benchmark question locally material.", category: "validation" },
    ],
  },

  {
    iso3: "KEN",
    mapId: "404",
    name: "Kenya",
    region: "Africa",
    dataStatus: "partial",
    lastUpdated: "2026-05-28",
    summary:
      "A growing digital-economy policy program with developing university capacity. No domestic quantum hardware; cloud access is constrained by cost and bandwidth, so affordability and partnership models dominate the local analysis. The materials domain has not yet been assessed.",
    strategies: [
      "National digital masterplan (documented priority)",
      "Regional research-network participation",
    ],
    capabilities: [
      { area: "Hardware availability", band: "minimal", note: "No domestic quantum hardware" },
      { area: "Cloud substitutability", band: "limited", note: "Access constrained by cost and bandwidth" },
      { area: "Workforce & research ecosystem", band: "developing", note: "Growing university programs; small specialist base" },
      { area: "Enabling infrastructure", band: "developing", note: "Expanding datacenter and fiber footprint" },
      { area: "Institutional capacity", band: "developing", note: "Procurement affordability is the binding constraint" },
      { area: "Standards & regulatory activity", band: "limited", note: "Early-stage engagement through regional bodies" },
      { area: "Resilience & vendor diversity", band: "limited", note: "Dependent on foreign providers across the stack" },
    ],
    programs: ["University consortium quantum-skills program (sample)"],
    deployments: [],
    constraints: [
      "Bandwidth and cloud-egress costs",
      "Procurement affordability",
      "Specialist retention",
    ],
    sources: [
      { label: "National digital masterplan (sample)", provenance: "government" },
      { label: "Road Tour contribution, self-reported (sample)", provenance: "unverified" },
    ],
    roadTour: {
      available: true,
      latest: "2026-03-11",
      institutionType: "University consortium",
      updatedCategories: ["Workforce & research ecosystem"],
      verification: "self-reported",
    },
    outlooks: [
      {
        domain: "security",
        profile: {
          category: "classical",
          spectrum: { position: 25, low: 20, high: 35 },
          confidence: "low",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Post-quantum migration is the actionable national priority",
            "Certified entropy appliances are deployable through standard procurement where assurance needs justify them",
            "Dedicated quantum-communications infrastructure is not currently justified",
          ],
          explanation:
            "Protection against future quantum threats is achievable now through software migration; the one quantum purchase that makes sense ships as standard equipment.",
          lastUpdated: "2026-05-28",
          version: V,
          provisional: true,
        },
        relevantUseCases: ["sec-qrng", "sec-qkd"],
      },
      {
        domain: "energy",
        profile: {
          category: "classical",
          spectrum: { position: 25, low: 20, high: 35 },
          confidence: "low",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Grid optimization requirements are met by classical tooling",
            "Affordability priorities favor conventional compute investment",
            "Partnership models are the credible route to future capability",
          ],
          explanation:
            "Classical approaches serve current needs; capability-building through partnerships is the recommended posture for future options.",
          lastUpdated: "2026-05-28",
          version: V,
          provisional: true,
        },
        relevantUseCases: ["en-grid"],
      },
    ],
    countryUseCaseNotes: [
      { useCaseId: "sec-qrng", note: "Deployable through standard procurement; not dependent on quantum-computing access.", category: "quantum" },
      { useCaseId: "mat-battery", note: "Access constraints favor partnership-based participation in remote pilots.", category: "prepare" },
    ],
  },

  {
    iso3: "BRA",
    mapId: "076",
    name: "Brazil",
    region: "Americas",
    dataStatus: "comprehensive",
    lastUpdated: "2026-06-05",
    summary:
      "A growing research network with industrial demand in agriculture, energy and materials; moderate hardware access via cloud. Climate commitments and cost discipline both shape the local analysis.",
    strategies: [
      "National quantum-computing research network",
      "Adopted national climate plan",
      "Public-investment efficiency rules",
    ],
    capabilities: [
      { area: "Hardware availability", band: "developing", note: "Cloud access plus regional research collaborations" },
      { area: "Cloud substitutability", band: "moderate", note: "Broadly available; cost-sensitive at scale" },
      { area: "Workforce & research ecosystem", band: "moderate", note: "Established research groups; growing graduate pipeline" },
      { area: "Enabling infrastructure", band: "moderate", note: "Solid compute base with regional variation" },
      { area: "Institutional capacity", band: "developing", note: "Program continuity depends on budget cycles" },
      { area: "Standards & regulatory activity", band: "developing", note: "Participation through regional and international bodies" },
      { area: "Resilience & vendor diversity", band: "moderate", note: "Diverse providers; currency exposure on cloud pricing" },
    ],
    programs: ["National research-network quantum initiative (sample)"],
    deployments: ["University-industry simulation pilots in chemistry and agriculture (sample)"],
    constraints: ["Budget-cycle continuity", "Cloud cost exposure"],
    sources: [
      { label: "Research-network documentation (sample)", provenance: "government" },
      { label: "Observatory country research file (sample)", provenance: "community" },
    ],
    roadTour: { available: false },
    outlooks: [
      {
        domain: "security",
        profile: {
          category: "classical",
          spectrum: { position: 30, low: 25, high: 40 },
          confidence: "moderate",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Post-quantum migration is the actionable protection pathway",
            "No current operational case for dedicated quantum-communications infrastructure",
            "Regional standards participation preserves future options",
          ],
          explanation:
            "Software migration to post-quantum cryptography covers the threat model; infrastructure investment is not currently indicated.",
          lastUpdated: "2026-06-05",
          version: V,
        },
        relevantUseCases: ["sec-qrng", "sec-qkd"],
      },
      {
        domain: "materials",
        profile: {
          category: "research",
          spectrum: { position: 35, low: 25, high: 45 },
          confidence: "moderate",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Catalyst simulation aligns with fertilizer and green-hydrogen industrial interests",
            "Research-network strength supports meaningful participation without domestic hardware",
            "Operational cases remain ahead of the local evidence base",
          ],
          explanation:
            "The research pathway fits national industrial interests — particularly ammonia and agricultural chemistry — while cloud partnerships cover access.",
          lastUpdated: "2026-06-05",
          version: V,
        },
        relevantUseCases: ["mat-ammonia", "mat-battery", "mat-carbon"],
      },
      {
        domain: "energy",
        profile: {
          category: "monitor",
          spectrum: { position: 30, low: 20, high: 40 },
          confidence: "moderate",
          evidence: "modeled",
          horizon: "current",
          drivers: [
            "Classical optimization meets grid-operation needs",
            "Hydro-dominated system structure differs from the benchmark cases",
            "Monitoring costs are low given research-network capacity",
          ],
          explanation:
            "No operational case today; the distinctive structure of the national grid means external benchmark results transfer imperfectly and are worth tracking.",
          lastUpdated: "2026-06-05",
          version: V,
        },
        relevantUseCases: ["en-grid", "en-risk"],
      },
    ],
    countryUseCaseNotes: [
      { useCaseId: "mat-ammonia", note: "Strong strategic fit with fertilizer industry and green-hydrogen plans.", category: "research" },
    ],
  },

  // ---- Provisional profiles (no domain outlooks yet) ----
  {
    iso3: "DEU",
    mapId: "276",
    name: "Germany",
    region: "Europe",
    dataStatus: "provisional",
    lastUpdated: "2026-04-22",
    summary:
      "Provisional profile pending validation: an established national quantum program with an extensive research ecosystem. Full country assessment scheduled for a future dataset release.",
    strategies: [],
    capabilities: [],
    programs: [],
    deployments: [],
    constraints: [],
    sources: [{ label: "Preliminary desk research (sample)", provenance: "community" }],
    roadTour: { available: false },
    outlooks: [],
    countryUseCaseNotes: [],
  },
  {
    iso3: "JPN",
    mapId: "392",
    name: "Japan",
    region: "Asia-Pacific",
    dataStatus: "provisional",
    lastUpdated: "2026-04-22",
    summary:
      "Provisional profile pending validation: long-standing quantum research investment and industrial activity. Full country assessment scheduled for a future dataset release.",
    strategies: [],
    capabilities: [],
    programs: [],
    deployments: [],
    constraints: [],
    sources: [{ label: "Preliminary desk research (sample)", provenance: "community" }],
    roadTour: { available: false },
    outlooks: [],
    countryUseCaseNotes: [],
  },
  {
    iso3: "IND",
    mapId: "356",
    name: "India",
    region: "Asia-Pacific",
    dataStatus: "provisional",
    lastUpdated: "2026-05-02",
    summary:
      "Provisional profile pending validation: a national quantum mission is underway with growing research capacity. Full country assessment scheduled for a future dataset release.",
    strategies: [],
    capabilities: [],
    programs: [],
    deployments: [],
    constraints: [],
    sources: [{ label: "Preliminary desk research (sample)", provenance: "community" }],
    roadTour: { available: false },
    outlooks: [],
    countryUseCaseNotes: [],
  },
  {
    iso3: "NGA",
    mapId: "566",
    name: "Nigeria",
    region: "Africa",
    dataStatus: "provisional",
    lastUpdated: "2026-06-18",
    summary:
      "Provisional profile from an initial Road Tour contact: digital-economy programs with early quantum-skills interest. Contribution pending validation.",
    strategies: [],
    capabilities: [],
    programs: [],
    deployments: [],
    constraints: [],
    sources: [{ label: "Road Tour contact notes, pending validation (sample)", provenance: "unverified" }],
    roadTour: {
      available: true,
      latest: "2026-06-18",
      institutionType: "Government agency",
      updatedCategories: ["Institutional capacity"],
      verification: "pending",
    },
    outlooks: [],
    countryUseCaseNotes: [],
  },
];

/** Marker coordinates for states too small to click at map resolution. */
export const COUNTRY_MARKERS: Record<string, [number, number]> = {
  SGP: [103.82, 1.352],
};

export const countryByIso = (iso3: string): CountryProfile | undefined =>
  COUNTRIES.find((c) => c.iso3 === iso3);

export const countryByMapId = (mapId: string): CountryProfile | undefined =>
  COUNTRIES.find((c) => c.mapId === mapId);
