import { useMemo, useState } from "react";
import { DetailView } from "./components/DetailView";
import { MethodologyView } from "./components/MethodologyView";
import { PortfolioView } from "./components/PortfolioView";
import { WhatIfPanel } from "./components/WhatIfPanel";
import type { EvaluateOptions } from "./framework/engine";
import { SCENARIOS } from "./framework/spec";
import { JURISDICTIONS, USE_CASES } from "./data";
import type { CriterionId, ScenarioId } from "./types";

type View =
  | { name: "portfolio" }
  | { name: "detail"; id: string }
  | { name: "methodology" };

export default function App() {
  const [view, setView] = useState<View>({ name: "portfolio" });
  const [jurisdictionId, setJurisdictionId] = useState<string | null>("are");
  const [scenario, setScenario] = useState<ScenarioId>("current");
  const [overrides, setOverrides] = useState<Partial<Record<CriterionId, number>>>({});

  const jurisdiction = useMemo(
    () => JURISDICTIONS.find((j) => j.id === jurisdictionId) ?? null,
    [jurisdictionId],
  );

  const evalOptions: EvaluateOptions = useMemo(
    () => ({ scenario, jurisdiction, priorityOverrides: overrides }),
    [scenario, jurisdiction, overrides],
  );

  const selectJurisdiction = (id: string | null) => {
    setJurisdictionId(id);
    setOverrides({});
  };

  const whatIf = (
    <WhatIfPanel
      jurisdiction={jurisdiction}
      overrides={overrides}
      onChange={(id, value) => setOverrides((o) => ({ ...o, [id]: value }))}
      onReset={() => setOverrides({})}
    />
  );

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-top">
            <div>
              <h1>Global Quantum Use Case &amp; Readiness Observatory</h1>
              <div className="org">
                International Telecommunication Union · Powered by Universum Labs
                Classical–Quantum Pursuit Framework v1.0
              </div>
            </div>
            <span className="demo-chip">FUNCTIONAL DEMO · SAMPLE DATA</span>
          </div>
          <nav>
            <button
              className={view.name !== "methodology" ? "active" : ""}
              onClick={() => setView({ name: "portfolio" })}
            >
              Portfolio
            </button>
            <button
              className={view.name === "methodology" ? "active" : ""}
              onClick={() => setView({ name: "methodology" })}
            >
              Methodology
            </button>
          </nav>
        </div>
      </header>

      {view.name !== "methodology" && (
        <div className="controlbar">
          <div className="controlbar-inner">
            <div className="control">
              <label>Jurisdiction</label>
              <div className="seg">
                <button
                  className={jurisdictionId === null ? "active" : ""}
                  onClick={() => selectJurisdiction(null)}
                >
                  🌐 Global
                </button>
                {JURISDICTIONS.map((j) => (
                  <button
                    key={j.id}
                    className={jurisdictionId === j.id ? "active" : ""}
                    onClick={() => selectJurisdiction(j.id)}
                    title={j.blurb}
                  >
                    {j.flag} {j.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="control">
              <label>Scenario</label>
              <div className="seg">
                {SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    className={scenario === s.id ? "active" : ""}
                    onClick={() => setScenario(s.id)}
                    title={s.blurb}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="control-note">
              {jurisdiction
                ? `Local view · profile ${jurisdiction.profileVersion}`
                : "Fixed global reference methodology"}
            </span>
          </div>
        </div>
      )}

      <main className="page">
        {view.name === "portfolio" && (
          <div className="detail-layout">
            <div style={{ minWidth: 0 }}>
              <PortfolioView
                useCases={USE_CASES}
                evalOptions={evalOptions}
                onOpen={(id) => {
                  setView({ name: "detail", id });
                  window.scrollTo({ top: 0 });
                }}
              />
            </div>
            <div className="detail-rail">
              {whatIf}
              {jurisdiction && (
                <div className="panel">
                  <h3>
                    {jurisdiction.flag} {jurisdiction.name}
                  </h3>
                  <p className="sub">Jurisdiction profile {jurisdiction.profileVersion}</p>
                  <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 10px" }}>
                    {jurisdiction.blurb}
                  </p>
                  <div className="section-title">Documented priorities</div>
                  <ul className="bullets">
                    {jurisdiction.priorityNotes.map((n) => (
                      <li key={n.label}>
                        <b>{n.label}</b> (Level {n.level}) — {n.basis}
                      </li>
                    ))}
                  </ul>
                  <div className="section-title" style={{ marginTop: 10 }}>Profile basis</div>
                  <ul className="bullets">
                    {jurisdiction.sources.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {view.name === "detail" && (
          <DetailView
            uc={USE_CASES.find((u) => u.id === view.id)!}
            evalOptions={evalOptions}
            jurisdictions={JURISDICTIONS}
            onBack={() => setView({ name: "portfolio" })}
            rail={whatIf}
          />
        )}
        {view.name === "methodology" && <MethodologyView />}
      </main>

      <footer className="footer">
        Demonstration build with illustrative sample data — no real assessments, benchmarks or
        national profiles. Methodology: Universum Labs Classical–Quantum Pursuit Framework v1.0
        (provisional weights pending calibration). © Universum Labs.
      </footer>
    </>
  );
}
