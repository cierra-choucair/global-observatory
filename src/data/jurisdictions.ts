import type { Jurisdiction } from "../types";

/** SAMPLE jurisdiction profiles — illustrative values for demo purposes only.
 *  Real profiles follow the Part 6 source hierarchy and refresh rules. */
export const JURISDICTIONS: Jurisdiction[] = [
  {
    id: "are",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    blurb:
      "Resourced national quantum program (Level 3), strong institutional capacity and enabling infrastructure; workforce pipeline still maturing. Net Zero 2050 and water security shape environmental weighting.",
    profileVersion: "ARE-2026.2 (sample)",
    ars: { H: 62, C: 68, W: 55, I: 82, P: 85, R: 55 },
    condMultipliers: { environment: 1.1 },
    priorityMultipliers: { environment: 1.15, risk: 1.3, outcome: 1.05 },
    priorityNotes: [
      {
        criterion: "risk",
        level: 3,
        label: "Digital sovereignty & security — resourced",
        basis: "Funded national cybersecurity and sovereign-cloud programs (sample basis)",
      },
      {
        criterion: "environment",
        level: 2,
        label: "Net Zero 2050 — documented",
        basis: "Adopted national climate strategy; water-scarcity condition multiplier applied separately",
      },
      {
        criterion: "outcome",
        level: 1,
        label: "Advanced-tech outcome premium — emerging",
        basis: "Economic diversification roadmap signals (sample basis)",
      },
    ],
    rovAlignmentBoost: 20,
    sources: [
      "National quantum research program with dedicated budget (Level 3 — resourced)",
      "Adopted net-zero and water-security strategies",
      "Sovereign data-residency rules for government workloads",
    ],
  },
  {
    id: "che",
    name: "Switzerland",
    flag: "🇨🇭",
    blurb:
      "Dense quantum research ecosystem and hardware access; high workforce and infrastructure readiness. ITU headquarters jurisdiction; climate law raises environmental weighting.",
    profileVersion: "CHE-2026.1 (sample)",
    ars: { H: 75, C: 80, W: 85, I: 88, P: 80, R: 70 },
    condMultipliers: {},
    priorityMultipliers: { environment: 1.15, feasibility: 1.05 },
    priorityNotes: [
      {
        criterion: "environment",
        level: 2,
        label: "Climate & innovation law — documented",
        basis: "Adopted federal climate legislation (sample basis)",
      },
      {
        criterion: "feasibility",
        level: 1,
        label: "Research-excellence premium — emerging",
        basis: "Standing federal research priorities (sample basis)",
      },
    ],
    rovAlignmentBoost: 10,
    sources: [
      "National quantum initiative and university-hosted hardware access",
      "Federal climate legislation in force",
    ],
  },
  {
    id: "sgp",
    name: "Singapore",
    flag: "🇸🇬",
    blurb:
      "Resourced national quantum strategy with strong workforce, cloud access and institutional capacity; import dependency keeps resilience moderate.",
    profileVersion: "SGP-2026.1 (sample)",
    ars: { H: 70, C: 78, W: 78, I: 85, P: 82, R: 60 },
    condMultipliers: {},
    priorityMultipliers: { risk: 1.15, performance: 1.05 },
    priorityNotes: [
      {
        criterion: "risk",
        level: 2,
        label: "Cyber-resilience mandate — documented",
        basis: "National digital-security masterplan (sample basis)",
      },
      {
        criterion: "performance",
        level: 1,
        label: "Latency-sensitive services — emerging",
        basis: "Smart-nation service-level targets (sample basis)",
      },
    ],
    rovAlignmentBoost: 15,
    sources: [
      "Funded national quantum strategy (Level 3 — resourced)",
      "Established quantum-safe network testbed",
    ],
  },
  {
    id: "ken",
    name: "Kenya",
    flag: "🇰🇪",
    blurb:
      "No domestic QPU access; cloud access constrained by cost and bandwidth. Strong digital-economy policy momentum makes affordability and access the decisive criteria.",
    profileVersion: "KEN-2026.1 (sample)",
    ars: { H: 25, C: 45, W: 35, I: 45, P: 40, R: 35 },
    condMultipliers: {},
    priorityMultipliers: { economics: 1.3, access: 1.15 },
    priorityNotes: [
      {
        criterion: "economics",
        level: 3,
        label: "Affordability first — resourced",
        basis: "Budgeted digital-economy program prioritising cost-effective compute (sample basis)",
      },
      {
        criterion: "access",
        level: 2,
        label: "Digital inclusion — documented",
        basis: "Adopted national digital masterplan (sample basis)",
      },
    ],
    rovAlignmentBoost: 5,
    sources: [
      "National digital masterplan (documented priority)",
      "Regional research-network participation",
    ],
  },
  {
    id: "bra",
    name: "Brazil",
    flag: "🇧🇷",
    blurb:
      "Growing research base and industrial demand; moderate hardware access via cloud. Climate commitments and cost sensitivity both shape local weighting.",
    profileVersion: "BRA-2026.1 (sample)",
    ars: { H: 45, C: 60, W: 55, I: 60, P: 50, R: 50 },
    condMultipliers: {},
    priorityMultipliers: { environment: 1.15, economics: 1.15 },
    priorityNotes: [
      {
        criterion: "environment",
        level: 2,
        label: "Climate commitments — documented",
        basis: "Adopted national climate plan (sample basis)",
      },
      {
        criterion: "economics",
        level: 2,
        label: "Cost discipline — documented",
        basis: "Public-investment efficiency rules (sample basis)",
      },
    ],
    rovAlignmentBoost: 8,
    sources: [
      "National quantum-computing research network",
      "Adopted climate plan and public-procurement rules",
    ],
  },
];
