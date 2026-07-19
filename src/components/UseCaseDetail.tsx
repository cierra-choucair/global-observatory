import { useMemo, useState } from "react";
import { countryByIso } from "../data/countries";
import { CATEGORY_META, DOMAINS, HORIZON_META } from "../data/labels";
import { getUseCaseAnalysis } from "../services/observatory";
import { navigate } from "../router";
import { useAppState } from "../state";
import type { HorizonId, UseCasePublic } from "../types";
import {
  CategoryBadge,
  ConfidenceBadge,
  EvidenceBadge,
  HorizonBadge,
  ProvenanceBadge,
  SampleTag,
} from "./badges";
import { ExplainerModal } from "./ExplainerModal";
import { IconBack, IconCheck, IconInfo, IconPlus } from "./icons";
import { SpectrumMeter } from "./SpectrumMeter";

function Section({
  title,
  children,
  open = false,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details className="disclosure" open={open}>
      <summary>{title}</summary>
      <div className="disclosure-body">{children}</div>
    </details>
  );
}

export function UseCaseDetail({ uc, related }: { uc: UseCasePublic; related: UseCasePublic[] }) {
  const { brief, toggleBriefUseCase, selectedCountry } = useAppState();
  const [horizon, setHorizon] = useState<HorizonId>(uc.profiles[0].horizon);
  const [explainer, setExplainer] = useState(false);

  const analysis = useMemo(
    () => getUseCaseAnalysis(uc.id, selectedCountry, horizon)!,
    [uc.id, selectedCountry, horizon],
  );
  const p = analysis.profile;
  const inBrief = brief.useCaseIds.includes(uc.id);
  const country = selectedCountry ? countryByIso(selectedCountry) : undefined;

  return (
    <div>
      <button className="back-link" onClick={() => navigate("/use-cases")}>
        <IconBack size={14} /> Back to repository
      </button>

      <div className="detail-header">
        <span className="domain-tag">{DOMAINS[uc.domain].label}</span>
        <h2>{uc.title}</h2>
        <p className="short">{uc.oneLiner}</p>
        <div className="header-chips">
          <CategoryBadge category={p.category} />
          <EvidenceBadge status={p.evidence} />
          <ConfidenceBadge band={p.confidence} />
          <HorizonBadge horizon={p.horizon} />
          <SampleTag />
        </div>
        <div className="header-actions">
          <button
            className={`mini-btn${inBrief ? " active" : ""}`}
            onClick={() => toggleBriefUseCase(uc.id)}
            aria-pressed={inBrief}
          >
            {inBrief ? <IconCheck size={13} /> : <IconPlus size={13} />}
            {inBrief ? "In policy brief" : "Add to policy brief"}
          </button>
          <button className="mini-btn" onClick={() => navigate("/compare")}>
            Compare
          </button>
          <button className="mini-btn" onClick={() => navigate("/map")}>
            View on map
          </button>
        </div>
      </div>

      <div className="detail-cols">
        <div className="detail-main">
          {/* Pursuit profile — result, not method */}
          <div className="panel">
            <div className="panel-head-row">
              <h3>Classical–Quantum Pursuit Profile</h3>
              <button className="linklike info-link" onClick={() => setExplainer(true)}>
                <IconInfo size={13} /> How to read the analysis
              </button>
            </div>
            {uc.profiles.length > 1 && (
              <div className="seg seg-inline" role="group" aria-label="Analysis horizon">
                {uc.profiles.map((pr) => (
                  <button
                    key={pr.horizon}
                    className={horizon === pr.horizon ? "active" : ""}
                    onClick={() => setHorizon(pr.horizon)}
                  >
                    {HORIZON_META[pr.horizon].short}
                  </button>
                ))}
              </div>
            )}
            <SpectrumMeter spectrum={p.spectrum} />
            <p className="profile-reading">
              <b>{CATEGORY_META[p.category].label}.</b> {p.explanation}
            </p>
            {analysis.localNote && country && (
              <p className="local-note">
                <b>{country.name} context:</b> {analysis.localNote}
              </p>
            )}
            {analysis.globalFallback && country && (
              <p className="local-note muted">
                No country-specific analysis for {country.name} yet — the global
                assessment is shown.
              </p>
            )}
            <div className="section-title" style={{ marginTop: 12 }}>Why the result leans this way</div>
            <ul className="bullets">
              {p.drivers.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="rail-note">
              Classical–Quantum analysis provided by Universum Labs · {p.version} ·
              updated {p.lastUpdated}
            </p>
          </div>

          <Section title="Problem being addressed" open>
            <p>{uc.problem}</p>
            <div className="fact-grid" style={{ marginTop: 10 }}>
              <div className="fact"><div className="k">Technology modality</div><div className="v">{uc.modality}</div></div>
              <div className="fact"><div className="k">Application type</div><div className="v">{uc.applicationType}</div></div>
              <div className="fact"><div className="k">Maturity</div><div className="v">TRL {uc.trl} — {uc.maturityLabel}</div></div>
            </div>
          </Section>

          <Section title="Best credible classical baseline">
            <p>{uc.classicalBaseline}</p>
          </Section>

          <Section title="Proposed quantum or quantum-inspired pathway">
            <p>{uc.quantumPathway}</p>
          </Section>

          <Section title="Evidence summary">
            <p>{uc.evidenceSummary}</p>
            <div className="section-title" style={{ marginTop: 12 }}>Sources</div>
            <ul className="source-list">
              {uc.sources.map((s) => (
                <li key={s.label}>
                  <ProvenanceBadge p={s.provenance} />
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
            <p className="rail-note">
              Provenance labels distinguish demonstrated evidence from modeled
              projections and vendor claims throughout.
            </p>
          </Section>

          <Section title="Access and feasibility considerations">
            <ul className="bullets">
              {uc.accessNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Section>

          <Section title="Known deployments, pilots and research activity">
            <ul className="bullets">
              {uc.activity.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="section-title" style={{ marginTop: 12 }}>Geographic coverage</div>
            <p>
              {uc.coverage.global ? "Global assessment available. " : ""}
              {uc.coverage.countries.length > 0
                ? `Country-specific analysis: ${uc.coverage.countries
                    .map((c) => countryByIso(c)?.name ?? c)
                    .join(", ")}.`
                : "No country-specific analyses yet."}
            </p>
          </Section>

          <Section title="Policy and workforce implications">
            <ul className="bullets">
              {uc.policyImplications.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="detail-rail">
          <div className="panel">
            <h3>Related use cases</h3>
            <ul className="related-list">
              {related.map((r) => (
                <li key={r.id}>
                  <button className="linklike" onClick={() => navigate(`/use-cases/${r.id}`)}>
                    {r.title}
                  </button>
                  <span className="rail-note">{DOMAINS[r.domain].short}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Data notes</h3>
            <p className="rail-note">
              Sample dataset {p.version}. Last updated {uc.lastUpdated}. All
              content in this demonstration is illustrative — see About / Data
              Notes for provenance conventions.
            </p>
          </div>
        </aside>
      </div>

      {explainer && <ExplainerModal onClose={() => setExplainer(false)} />}
    </div>
  );
}
