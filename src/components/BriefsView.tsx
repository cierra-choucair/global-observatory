import { useMemo, useState } from "react";
import { ACTION_LIBRARY } from "../data/actions";
import {
  SOURCE_STATUS_META,
  SOURCE_TYPE_META,
  sourcesForUseCase,
} from "../data/citations";
import type { PublicSourceRecord } from "../data/citations";
import { COUNTRIES, countryByIso } from "../data/countries";
import {
  AUDIENCE_META,
  CAPABILITY_BAND_META,
  CATEGORY_META,
  DATA_STATUS_META,
  DATA_VERSION,
  DOMAINS,
  DOMAIN_IDS,
  SAMPLE_DISCLOSURE,
} from "../data/labels";
import { USE_CASES, useCaseById } from "../data/useCases";
import { getUseCaseAnalysis } from "../services/observatory";
import type { AnalysisResult } from "../services/observatory";
import { navigate } from "../router";
import { useAppState } from "../state";
import type { BriefAudience, DomainId, PursuitCategory } from "../types";
import {
  CategoryBadge,
  ConfidenceBadge,
  DataStatusBadge,
  EvidenceBadge,
  ProvenanceBadge,
} from "./badges";
import { IconCheck, IconDownload } from "./icons";
import { SpectrumMeter } from "./SpectrumMeter";

const STEPS = [
  "Geography",
  "Audience",
  "Domains & use cases",
  "Local context",
  "Analysis",
  "Preview",
];

const ASSESSED = COUNTRIES.filter(
  (c) => c.dataStatus === "comprehensive" || c.dataStatus === "partial",
);

function citationTail(s: PublicSourceRecord): string {
  const who = s.authors?.join(", ") ?? s.institution ?? "";
  const tail = [who, s.publication, s.year ? String(s.year) : ""].filter(Boolean).join(", ");
  return tail ? `. ${tail}` : "";
}

function defaultTitle(countryName: string): string {
  return `Quantum Technology Policy Brief — ${countryName}`;
}

function defaultSummary(
  countryName: string,
  audience: BriefAudience,
  useCaseCount: number,
  domains: DomainId[],
  categories: PursuitCategory[],
): string {
  const domainText = domains.map((d) => DOMAINS[d].label).join("; ");
  const counts = new Map<PursuitCategory, number>();
  for (const c of categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  const catText = Array.from(counts.entries())
    .map(([c, n]) => `${n} × ${CATEGORY_META[c].label.toLowerCase()}`)
    .join(", ");
  return (
    `${AUDIENCE_META[audience].intro} It covers ${useCaseCount} use case${useCaseCount === 1 ? "" : "s"} ` +
    `across the following domain${domains.length === 1 ? "" : "s"}: ${domainText}. ` +
    `The Classical–Quantum analysis for ${countryName} currently reads: ${catText}. ` +
    `Recommendations distinguish demonstrated evidence from modeled projections throughout, ` +
    `and all assessments in this demonstration are illustrative sample data.`
  );
}

export function BriefsView() {
  const {
    brief,
    updateBrief,
    setBriefGeo,
    setBriefAudience,
    toggleBriefUseCase,
    toggleBriefDomain,
    clearBrief,
    saveDraft,
    hasSavedDraft,
    loadDraft,
  } = useAppState();

  const [step, setStep] = useState(0);
  const [analysisState, setAnalysisState] = useState<"idle" | "running" | "done">("idle");
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [savedNote, setSavedNote] = useState(false);

  const country = brief.geoId ? countryByIso(brief.geoId) : undefined;

  const effectiveDomains = useMemo(() => {
    const fromUcs = brief.useCaseIds
      .map((id) => useCaseById(id)?.domain)
      .filter((d): d is DomainId => !!d);
    return Array.from(new Set([...brief.domains, ...fromUcs]));
  }, [brief.useCaseIds, brief.domains]);

  const canNext =
    step === 0
      ? !!brief.geoId
      : step === 1
        ? !!brief.audience
        : step === 2
          ? brief.useCaseIds.length > 0 || brief.domains.length > 0
          : true;

  const runAnalysis = () => {
    setAnalysisState("running");
    window.setTimeout(() => {
      const res = brief.useCaseIds
        .map((id) => getUseCaseAnalysis(id, brief.geoId))
        .filter((r): r is AnalysisResult => !!r);
      setResults(res);
      setAnalysisState("done");
      if (country && brief.audience) {
        updateBrief({
          title: brief.title || defaultTitle(country.name),
          executiveSummary:
            brief.executiveSummary ||
            defaultSummary(
              country.name,
              brief.audience,
              res.length,
              effectiveDomains,
              res.map((r) => r.profile.category),
            ),
        });
      }
    }, 700);
  };

  const actionsByHorizon = useMemo(() => {
    const cats = new Set<PursuitCategory>();
    for (const r of results) cats.add(r.profile.category);
    for (const d of effectiveDomains) {
      const o = country?.outlooks.find((x) => x.domain === d);
      if (o) cats.add(o.profile.category);
    }
    const dedupe = (xs: string[]) => Array.from(new Set(xs));
    return {
      near: dedupe(Array.from(cats).flatMap((c) => ACTION_LIBRARY[c].near)),
      medium: dedupe(Array.from(cats).flatMap((c) => ACTION_LIBRARY[c].medium)),
      longer: dedupe(Array.from(cats).flatMap((c) => ACTION_LIBRARY[c].longer)),
    };
  }, [results, effectiveDomains, country]);

  const allSources = useMemo(() => {
    const seen = new Map<string, { label: string; provenance: string }>();
    for (const id of brief.useCaseIds) {
      for (const s of useCaseById(id)?.sources ?? []) seen.set(s.label, s);
    }
    for (const s of country?.sources ?? []) seen.set(s.label, s);
    return Array.from(seen.values());
  }, [brief.useCaseIds, country]);

  const startOver = () => {
    clearBrief();
    setStep(0);
    setAnalysisState("idle");
    setResults([]);
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Policy Brief Generator</h2>
          <p className="page-sub">
            Build an evidence-labeled policy brief from the Observatory's analysis
            for a selected geography, audience and set of use cases.
          </p>
        </div>
        {hasSavedDraft && step === 0 && (
          <button className="mini-btn" onClick={loadDraft}>
            Load saved draft
          </button>
        )}
      </div>

      <ol className="stepper" aria-label="Brief generation steps">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={i === step ? "current" : i < step ? "done" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <button
              className="step-btn"
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
            >
              <span className="step-num">{i < step ? <IconCheck size={11} /> : i + 1}</span>
              {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="panel wizard-panel">
        {step === 0 && (
          <div>
            <h3>Step 1 — Select geography</h3>
            <p className="page-sub">
              Choose a country with an Observatory profile. You can also start a
              brief directly from the Global Map. Regional and multi-country
              briefs are planned; this demonstration supports one country per
              brief.
            </p>
            <div className="geo-grid">
              {ASSESSED.map((c) => (
                <button
                  key={c.iso3}
                  className={`geo-card${brief.geoId === c.iso3 ? " active" : ""}`}
                  onClick={() => setBriefGeo(c.iso3)}
                  aria-pressed={brief.geoId === c.iso3}
                >
                  <b>{c.name}</b>
                  <span className="rail-note">{c.region}</span>
                  <DataStatusBadge status={c.dataStatus} />
                </button>
              ))}
            </div>
            <button className="linklike" onClick={() => navigate("/map")}>
              Or select from the Global Map
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3>Step 2 — Select intended audience</h3>
            <div className="geo-grid">
              {(Object.keys(AUDIENCE_META) as BriefAudience[]).map((a) => (
                <button
                  key={a}
                  className={`geo-card${brief.audience === a ? " active" : ""}`}
                  onClick={() => setBriefAudience(a)}
                  aria-pressed={brief.audience === a}
                >
                  <b>{AUDIENCE_META[a].label}</b>
                  <span className="rail-note">{AUDIENCE_META[a].intro}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Step 3 — Select domains and use cases</h3>
            <p className="page-sub">
              Select whole domains for domain-level outlooks, individual use
              cases, or both. Items added from repository cards and country
              panels appear here automatically.
            </p>
            <div className="mini-title">Domains</div>
            <div className="domain-filter">
              {DOMAIN_IDS.map((d) => (
                <button
                  key={d}
                  className={brief.domains.includes(d) ? "active" : ""}
                  onClick={() => toggleBriefDomain(d)}
                  aria-pressed={brief.domains.includes(d)}
                >
                  {DOMAINS[d].label}
                </button>
              ))}
            </div>
            <div className="mini-title">Use cases</div>
            <div className="uc-select-list">
              {USE_CASES.map((u) => (
                <label key={u.id} className="uc-select-row">
                  <input
                    type="checkbox"
                    checked={brief.useCaseIds.includes(u.id)}
                    onChange={() => toggleBriefUseCase(u.id)}
                  />
                  <span>
                    <b>{u.title}</b>
                    <span className="rail-note"> · {DOMAINS[u.domain].short} · {CATEGORY_META[u.profiles[0].category].label}</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="result-line">
              Selected: {brief.useCaseIds.length} use case{brief.useCaseIds.length === 1 ? "" : "s"},{" "}
              {brief.domains.length} domain{brief.domains.length === 1 ? "" : "s"}
            </p>
          </div>
        )}

        {step === 3 && country && (
          <div>
            <h3>Step 4 — Review local context: {country.name}</h3>
            <p>{country.summary}</p>
            <div className="mini-title">Capabilities</div>
            <table className="cap-table compact">
              <tbody>
                {country.capabilities.map((c) => (
                  <tr key={c.area}>
                    <td className="cap-area">{c.area}</td>
                    <td>
                      <span className={`band-chip band-${c.band}`}>
                        {CAPABILITY_BAND_META[c.band].label}
                      </span>
                    </td>
                    <td className="cap-note">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mini-title">Domain outlooks</div>
            <div className="outlook-row">
              {DOMAIN_IDS.map((d) => {
                const o = country.outlooks.find((x) => x.domain === d);
                return (
                  <div key={d} className="outlook-mini">
                    <b>{DOMAINS[d].short}</b>
                    {o ? (
                      <>
                        <SpectrumMeter spectrum={o.profile.spectrum} compact />
                        <CategoryBadge category={o.profile.category} compact />
                      </>
                    ) : (
                      <span className="muted">Not yet assessed</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="rail-note">
              Data status: {country.dataStatus} · profile updated {country.lastUpdated}.
              Evidence coverage and freshness are carried into the brief.
            </p>
          </div>
        )}
        {step === 3 && !country && <p className="muted">Select a geography first.</p>}

        {step === 4 && (
          <div>
            <h3>Step 5 — Run the Classical–Quantum analysis</h3>
            <p className="page-sub">
              The analysis runs as a managed Universum Labs service. Only final
              public results — categories, spectrum positions, confidence,
              drivers — are returned to this application.
            </p>
            {analysisState === "idle" && (
              <button className="mini-btn primary" onClick={runAnalysis}>
                Run analysis for {country?.name ?? "selection"}
              </button>
            )}
            {analysisState === "running" && (
              <p className="muted" role="status">Requesting analysis from the Universum Labs service…</p>
            )}
            {analysisState === "done" && (
              <div>
                <p className="result-line" role="status">
                  Analysis complete — {results.length} use-case result{results.length === 1 ? "" : "s"}
                  {effectiveDomains.length > 0 && `, ${effectiveDomains.length} domain outlook${effectiveDomains.length === 1 ? "" : "s"}`}.
                </p>
                <ul className="analysis-list">
                  {results.map((r) => {
                    const uc = useCaseById(r.scope.id)!;
                    return (
                      <li key={r.scope.id}>
                        <span>{uc.title}</span>
                        <CategoryBadge category={r.profile.category} compact />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {step === 5 && country && brief.audience && (
          <BriefPreview
            countryName={country.name}
            results={results}
            effectiveDomains={effectiveDomains}
            actionsByHorizon={actionsByHorizon}
            allSources={allSources}
            onSave={() => {
              saveDraft();
              setSavedNote(true);
              window.setTimeout(() => setSavedNote(false), 2500);
            }}
            savedNote={savedNote}
            onStartOver={startOver}
          />
        )}
        {step === 5 && (!country || !brief.audience) && (
          <p className="muted">Complete the earlier steps first.</p>
        )}
      </div>

      <div className="wizard-controls">
        <button className="mini-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button
            className="mini-btn primary"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext || (step === 4 && analysisState !== "done")}
          >
            {step === 4 ? "Generate brief" : "Continue"}
          </button>
        )}
        <button className="mini-btn" onClick={startOver} style={{ marginLeft: "auto" }}>
          Start over
        </button>
      </div>
    </div>
  );
}

function BriefPreview({
  countryName,
  results,
  effectiveDomains,
  actionsByHorizon,
  allSources,
  onSave,
  savedNote,
  onStartOver,
}: {
  countryName: string;
  results: AnalysisResult[];
  effectiveDomains: DomainId[];
  actionsByHorizon: { near: string[]; medium: string[]; longer: string[] };
  allSources: { label: string; provenance: string }[];
  onSave: () => void;
  savedNote: boolean;
  onStartOver: () => void;
}) {
  const { brief, updateBrief } = useAppState();
  const country = countryByIso(brief.geoId!)!;
  const audience = AUDIENCE_META[brief.audience!];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="preview-tools no-print">
        <h3>Step 6 — Preview and export</h3>
        <div className="preview-actions">
          <button className="mini-btn primary" onClick={() => window.print()}>
            <IconDownload size={13} /> Download PDF
          </button>
          <button className="mini-btn" onClick={onSave}>
            {savedNote ? "Draft saved" : "Save draft"}
          </button>
          <button className="mini-btn" onClick={onStartOver}>
            Start over
          </button>
        </div>
        <label className="edit-field">
          <span>Title (editable)</span>
          <input
            value={brief.title}
            onChange={(e) => updateBrief({ title: e.target.value })}
          />
        </label>
        <label className="edit-field">
          <span>Executive summary (editable)</span>
          <textarea
            rows={4}
            value={brief.executiveSummary}
            onChange={(e) => updateBrief({ executiveSummary: e.target.value })}
          />
        </label>
      </div>

      <article className="brief-doc" aria-label="Policy brief preview">
        <header className="brief-head">
          <div className="brief-org">Global Quantum Use Case &amp; Readiness Observatory</div>
          <h1>{brief.title || defaultTitle(countryName)}</h1>
          <div className="brief-meta">
            <span>Geography: {countryName}</span>
            <span>Audience: {audience.label}</span>
            <span>Date: {today}</span>
            <span>{DATA_VERSION}</span>
          </div>
          <div className="brief-disclosure">{SAMPLE_DISCLOSURE}</div>
        </header>

        <section>
          <h2>Executive summary</h2>
          <p>{brief.executiveSummary}</p>
        </section>

        <section>
          <h2>National capability summary</h2>
          <p>{country.summary}</p>
          <ul>
            {country.capabilities.map((c) => (
              <li key={c.area}>
                <b>{c.area}:</b> {CAPABILITY_BAND_META[c.band].label} — {c.note}
              </li>
            ))}
          </ul>
        </section>

        {effectiveDomains.length > 0 && (
          <section>
            <h2>Domain-level Classical–Quantum outlooks</h2>
            {effectiveDomains.map((d) => {
              const o = country.outlooks.find((x) => x.domain === d);
              if (!o)
                return (
                  <p key={d}>
                    <b>{DOMAINS[d].label}:</b> not yet assessed for {countryName}.
                  </p>
                );
              return (
                <div key={d} className="brief-outlook">
                  <h3>{DOMAINS[d].label}</h3>
                  <SpectrumMeter spectrum={o.profile.spectrum} />
                  <p>
                    <b>{CATEGORY_META[o.profile.category].label}.</b>{" "}
                    {o.profile.explanation}
                  </p>
                  <ul>
                    {o.profile.drivers.map((dr) => (
                      <li key={dr}>{dr}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        )}

        {results.length > 0 && (
          <section>
            <h2>Selected use cases</h2>
            {results.map((r) => {
              const uc = useCaseById(r.scope.id)!;
              const p = r.profile;
              return (
                <div key={uc.id} className="brief-uc">
                  <h3>{uc.title}</h3>
                  <div className="brief-uc-chips">
                    <CategoryBadge category={p.category} compact />
                    <EvidenceBadge status={p.evidence} />
                    <ConfidenceBadge band={p.confidence} />
                  </div>
                  <SpectrumMeter spectrum={p.spectrum} />
                  <p>{p.explanation}</p>
                  {r.localNote && (
                    <p>
                      <b>{countryName} context:</b> {r.localNote}
                    </p>
                  )}
                  {r.globalFallback && (
                    <p className="brief-note">
                      No country-specific analysis available — global assessment shown.
                    </p>
                  )}
                  <p>
                    <b>Classical baseline:</b> {uc.classicalBaseline}
                  </p>
                  <p>
                    <b>Quantum pathway:</b> {uc.quantumPathway}
                  </p>
                  <p>
                    <b>Access and feasibility:</b> {uc.accessNotes.join(". ")}.
                  </p>
                  <ul>
                    {p.drivers.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        )}

        <section>
          <h2>Recommended policy actions</h2>
          <h3>Near term</h3>
          <ul>
            {actionsByHorizon.near.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3>Medium term</h3>
          <ul>
            {actionsByHorizon.medium.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3>Longer term</h3>
          <ul>
            {actionsByHorizon.longer.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Data limitations</h2>
          <ul>
            <li>
              All assessments in this demonstration are illustrative sample data;
              no statement should be read as a factual national evaluation.
            </li>
            <li>
              Where evidence is insufficient, the analysis reports that status
              rather than producing a score.
            </li>
            <li>
              Country data status: {DATA_STATUS_META[country.dataStatus].label} —
              profile updated {country.lastUpdated}.
            </li>
          </ul>
        </section>

        <section>
          <h2>Selected references</h2>
          <p className="brief-note">
            References support the evidence inputs used in this brief.
            Classical–Quantum Pursuit Profiles are analyses produced by Universum
            Labs.
          </p>
          {brief.useCaseIds.map((ucId) => {
            const uc = useCaseById(ucId);
            const refs = sourcesForUseCase(ucId);
            if (!uc || refs.length === 0) return null;
            return (
              <div key={ucId} className="brief-refs-group">
                <h3>{uc.title}</h3>
                <ol className="brief-refs">
                  {refs.map((s) => (
                    <li key={s.id}>
                      {s.title}
                      {citationTail(s)}
                      {" — "}
                      <span className="brief-note">
                        {SOURCE_TYPE_META[s.sourceType]} · {SOURCE_STATUS_META[s.evidenceStatus]}
                        {s.isIllustrative && " · Illustrative record, sample data"}
                        {s.doi && ` · doi:${s.doi}`}
                        {!s.doi && s.officialUrl && ` · ${s.officialUrl}`}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
          {country.sources.length > 0 && (
            <>
              <h3>Country profile sources</h3>
              <ul className="brief-sources">
                {allSources
                  .filter((s) => country.sources.some((cs) => cs.label === s.label))
                  .map((s) => (
                    <li key={s.label}>
                      <ProvenanceBadge p={s.provenance as never} /> {s.label}
                    </li>
                  ))}
              </ul>
            </>
          )}
          <p className="brief-note">
            Powered by Universum Labs. Results are versioned and updated as
            evidence evolves. {DATA_VERSION}.
          </p>
        </section>
      </article>
    </div>
  );
}
