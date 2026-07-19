import { useMemo, useState } from "react";
import { COUNTRIES } from "../data/countries";
import {
  CATEGORY_META,
  DOMAINS,
  DOMAIN_IDS,
  EVIDENCE_META,
  HORIZON_META,
} from "../data/labels";
import { USE_CASES } from "../data/useCases";
import type {
  DomainId,
  EvidenceStatus,
  HorizonId,
  PursuitCategory,
  UseCasePublic,
} from "../types";
import { IconSearch } from "./icons";
import { UseCaseCard } from "./UseCaseCard";

type SortKey = "relevance" | "maturity" | "evidence" | "updated";

const EVIDENCE_RANK: Record<EvidenceStatus, number> = {
  demonstrated: 5,
  pilot: 4,
  modeled: 3,
  theoretical: 2,
  insufficient: 1,
};

const MATURITY_FILTERS = [
  { id: "all", label: "Any maturity" },
  { id: "high", label: "TRL 7–9 (near-operational)" },
  { id: "mid", label: "TRL 4–6 (pilot)" },
  { id: "low", label: "TRL 1–3 (research)" },
] as const;

export function RepositoryView() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [modality, setModality] = useState("all");
  const [appType, setAppType] = useState("all");
  const [maturity, setMaturity] = useState<(typeof MATURITY_FILTERS)[number]["id"]>("all");
  const [evidence, setEvidence] = useState<EvidenceStatus | "all">("all");
  const [horizon, setHorizon] = useState<HorizonId | "all">("all");
  const [geo, setGeo] = useState("all");
  const [category, setCategory] = useState<PursuitCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("relevance");

  const modalities = useMemo(
    () => Array.from(new Set(USE_CASES.map((u) => u.modality))).sort(),
    [],
  );
  const appTypes = useMemo(
    () => Array.from(new Set(USE_CASES.map((u) => u.applicationType))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = USE_CASES.filter((u) => {
      const p = u.profiles[0];
      if (domain !== "all" && u.domain !== domain) return false;
      if (modality !== "all" && u.modality !== modality) return false;
      if (appType !== "all" && u.applicationType !== appType) return false;
      if (maturity === "high" && u.trl < 7) return false;
      if (maturity === "mid" && (u.trl < 4 || u.trl > 6)) return false;
      if (maturity === "low" && u.trl > 3) return false;
      if (evidence !== "all" && p.evidence !== evidence) return false;
      if (horizon !== "all" && !u.profiles.some((pr) => pr.horizon === horizon)) return false;
      if (geo !== "all" && !u.coverage.countries.includes(geo)) return false;
      if (category !== "all" && p.category !== category) return false;
      if (
        q &&
        ![u.title, u.oneLiner, u.problem, u.modality, u.applicationType]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
    const bySort: Record<SortKey, (a: UseCasePublic, b: UseCasePublic) => number> = {
      relevance: () => 0,
      maturity: (a, b) => b.trl - a.trl,
      evidence: (a, b) =>
        EVIDENCE_RANK[b.profiles[0].evidence] - EVIDENCE_RANK[a.profiles[0].evidence],
      updated: (a, b) => b.lastUpdated.localeCompare(a.lastUpdated),
    };
    if (sort !== "relevance") list = [...list].sort(bySort[sort]);
    return list;
  }, [search, domain, modality, appType, maturity, evidence, horizon, geo, category, sort]);

  const activeFilterCount = [
    domain !== "all",
    modality !== "all",
    appType !== "all",
    maturity !== "all",
    evidence !== "all",
    horizon !== "all",
    geo !== "all",
    category !== "all",
  ].filter(Boolean).length;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Use Case Repository</h2>
          <p className="page-sub">
            Quantum use cases across three demonstration domains, each with a public
            Classical–Quantum Pursuit Profile, evidence status and time horizon.
            Explore geographic detail on the Global Map.
          </p>
        </div>
      </div>

      <div className="filter-bar" role="search">
        <label className="search-box">
          <IconSearch size={15} />
          <input
            type="search"
            placeholder="Search use cases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search use cases"
          />
        </label>

        <div className="domain-filter" role="group" aria-label="Filter by domain">
          <button className={domain === "all" ? "active" : ""} onClick={() => setDomain("all")}>
            All domains
          </button>
          {DOMAIN_IDS.map((d) => (
            <button key={d} className={domain === d ? "active" : ""} onClick={() => setDomain(d)}>
              {DOMAINS[d].label}
            </button>
          ))}
        </div>

        <div className="select-row">
          <label>
            <span>Modality</span>
            <select value={modality} onChange={(e) => setModality(e.target.value)}>
              <option value="all">Any</option>
              {modalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Application</span>
            <select value={appType} onChange={(e) => setAppType(e.target.value)}>
              <option value="all">Any</option>
              {appTypes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Maturity</span>
            <select value={maturity} onChange={(e) => setMaturity(e.target.value as typeof maturity)}>
              {MATURITY_FILTERS.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Evidence</span>
            <select value={evidence} onChange={(e) => setEvidence(e.target.value as EvidenceStatus | "all")}>
              <option value="all">Any</option>
              {(Object.keys(EVIDENCE_META) as EvidenceStatus[]).map((s) => (
                <option key={s} value={s}>{EVIDENCE_META[s].label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Horizon</span>
            <select value={horizon} onChange={(e) => setHorizon(e.target.value as HorizonId | "all")}>
              <option value="all">Any</option>
              {(Object.keys(HORIZON_META) as HorizonId[]).map((h) => (
                <option key={h} value={h}>{HORIZON_META[h].label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Geography</span>
            <select value={geo} onChange={(e) => setGeo(e.target.value)}>
              <option value="all">Any coverage</option>
              {COUNTRIES.filter((c) => c.dataStatus !== "none" && c.dataStatus !== "provisional").map((c) => (
                <option key={c.iso3} value={c.iso3}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Pursuit category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as PursuitCategory | "all")}>
              <option value="all">Any</option>
              {(Object.keys(CATEGORY_META) as PursuitCategory[]).map((c) => (
                <option key={c} value={c}>{CATEGORY_META[c].label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="relevance">Relevance</option>
              <option value="maturity">Maturity</option>
              <option value="evidence">Evidence strength</option>
              <option value="updated">Most recently updated</option>
            </select>
          </label>
        </div>
      </div>

      <div className="result-line" aria-live="polite">
        {filtered.length} of {USE_CASES.length} use cases
        {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active`}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          No use cases match the current filters. Adjust or clear filters to see the
          full repository.
        </div>
      ) : (
        <div className="grid-cards">
          {filtered.map((uc) => (
            <UseCaseCard key={uc.id} uc={uc} />
          ))}
        </div>
      )}
    </div>
  );
}
