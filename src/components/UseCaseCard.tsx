import { navigate } from "../router";
import { useAppState } from "../state";
import { CATEGORY_META, DOMAINS } from "../data/labels";
import type { UseCasePublic } from "../types";
import { CategoryBadge, ConfidenceBadge, EvidenceBadge, HorizonBadge } from "./badges";
import { SpectrumMeter } from "./SpectrumMeter";
import { IconCheck, IconGlobe, IconPlus } from "./icons";

export function UseCaseCard({ uc }: { uc: UseCasePublic }) {
  const { brief, toggleBriefUseCase } = useAppState();
  const p = uc.profiles[0];
  const inBrief = brief.useCaseIds.includes(uc.id);

  return (
    <article className="uc-card" aria-label={uc.title}>
      <div className="uc-card-top">
        <span className="domain-tag">{DOMAINS[uc.domain].label}</span>
        <span className="fresh-tag">Updated {uc.lastUpdated}</span>
      </div>
      <h3>
        <button className="linklike" onClick={() => navigate(`/use-cases/${uc.id}`)}>
          {uc.title}
        </button>
      </h3>
      <p className="short">{uc.oneLiner}</p>
      <div className="uc-meta">
        <span>{uc.modality}</span>
        <span aria-hidden="true">·</span>
        <span>TRL {uc.trl} — {uc.maturityLabel}</span>
      </div>
      <SpectrumMeter spectrum={p.spectrum} compact />
      <div className="uc-card-badges">
        <CategoryBadge category={p.category} compact />
        <span className="uc-badge-row">
          <EvidenceBadge status={p.evidence} />
          <HorizonBadge horizon={p.horizon} />
          <ConfidenceBadge band={p.confidence} />
        </span>
      </div>
      <div className="uc-card-foot">
        <span className="coverage" title={
          uc.coverage.countries.length
            ? `Country-specific analysis: ${uc.coverage.countries.join(", ")}`
            : "Global assessment only"
        }>
          <IconGlobe size={13} />
          {uc.coverage.global ? "Global" : "Regional"}
          {uc.coverage.countries.length > 0 && ` · ${uc.coverage.countries.length} country profiles`}
        </span>
        <span className="uc-actions">
          <button
            className={`mini-btn${inBrief ? " active" : ""}`}
            onClick={() => toggleBriefUseCase(uc.id)}
            aria-pressed={inBrief}
            title={inBrief ? "Remove from policy brief" : `Add to policy brief (${CATEGORY_META[p.category].label})`}
          >
            {inBrief ? <IconCheck size={13} /> : <IconPlus size={13} />}
            {inBrief ? "In brief" : "Add to brief"}
          </button>
          <button className="mini-btn" onClick={() => navigate(`/use-cases/${uc.id}`)}>
            Details
          </button>
        </span>
      </div>
    </article>
  );
}
