import { useMemo } from "react";
import type { ReactNode } from "react";
import { computeUtility, evaluate } from "../framework/engine";
import type { EvaluateOptions, PursuitProfile } from "../framework/engine";
import {
  ARS_BANDS,
  ARS_COMPONENTS,
  ECI_BANDS,
  ECI_COMPONENTS,
  CRITERIA,
  DOMAINS,
  GATES,
  GLOBAL_WEIGHTS,
  LANES,
  MIN_COVERAGE,
  ROV_BANDS,
  ROV_COMPONENTS,
  SCENARIOS,
  bandFor,
  qpsBandFor,
} from "../framework/spec";
import type { Jurisdiction, ScenarioId, UseCase } from "../types";
import { EvidenceChip, GateStateDot, LaneBadge, TYPE_COLOR, TYPE_LABEL } from "./badges";
import { BarRow, MiniValueBar, QpsMeter, UtilityBar } from "./meters";

export function DetailView({
  uc,
  evalOptions,
  jurisdictions,
  onBack,
  rail,
}: {
  uc: UseCase;
  evalOptions: EvaluateOptions;
  jurisdictions: Jurisdiction[];
  onBack: () => void;
  rail?: ReactNode;
}) {
  const profile: PursuitProfile = useMemo(
    () => evaluate(uc, evalOptions),
    [uc, evalOptions],
  );

  const altUtilities = useMemo(
    () =>
      uc.alternatives.map((alt) => ({
        alt,
        utility: computeUtility(alt, {
          scenario: profile.scenario,
          weights: profile.weights,
          localAccess:
            profile.jurisdiction && (alt.type === "quantum" || alt.type === "hybrid")
              ? profile.ars / 100
              : undefined,
        }),
      })),
    [uc, profile],
  );

  const scenarioProfiles = useMemo(
    () =>
      SCENARIOS.map((s) => ({
        spec: s,
        profile: evaluate(uc, { ...evalOptions, scenario: s.id }),
        keyframe: uc.keyframes.find((k) => k.scenario === s.id),
      })),
    [uc, evalOptions],
  );

  const jurisRows = useMemo(
    () =>
      [null, ...jurisdictions].map((j) => ({
        j,
        profile: evaluate(uc, { scenario: evalOptions.scenario, jurisdiction: j }),
      })),
    [uc, jurisdictions, evalOptions.scenario],
  );

  const classical = uc.alternatives.find((a) => a.id === uc.comparison.classical)!;
  const quantum = uc.alternatives.find((a) => a.id === uc.comparison.quantum)!;
  const qpsLabel = profile.jurisdiction ? "L-QPS" : "G-QPS";
  const scopeName = profile.jurisdiction
    ? `${profile.jurisdiction.name} (${profile.jurisdiction.profileVersion})`
    : "Global reference scenario";

  return (
    <div>
      <button className="back-link" onClick={onBack}>
        ← Back to portfolio
      </button>

      <div className="detail-header">
        <div className="domain-tag" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          {DOMAINS[uc.domain].label}
        </div>
        <h2>{uc.title}</h2>
        <p className="short">{uc.short}</p>
        <div className="header-chips">
          <LaneBadge lane={profile.lane} />
          <span className="chip">
            {qpsLabel} {profile.qps.central.toFixed(1)} [{profile.qps.low.toFixed(1)}–{profile.qps.high.toFixed(1)}]
          </span>
          <span className="chip">{qpsBandFor(profile.qps.central).label}</span>
          <span className="chip" title="Scoring scope">{scopeName}</span>
        </div>
      </div>

      <div className="detail-layout" style={{ marginTop: 18 }}>
        <div className="detail-main">
          {/* Decision summary */}
          <div className="summary-box">
            <div className="k">Plain-language decision summary (Part 11.3)</div>
            {uc.summary}
            <ul className="lane-reasons">
              {profile.laneReasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Pursuit profile */}
          <div className="panel">
            <h3>Pursuit Profile</h3>
            <p className="sub">
              {qpsLabel} with conservative interval propagation; companion indicators are never
              collapsed into one number.
            </p>
            <QpsMeter qps={profile.qps} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-3)", marginBottom: 14 }}>
              <span>← classical preference</span>
              <span>quantum preference →</span>
            </div>
            <div className="stat-row">
              <div className="stat-tile">
                <div className="label">{qpsLabel}</div>
                <div className="value">{profile.qps.central.toFixed(1)}</div>
                <div className="band">[{profile.qps.low.toFixed(1)}–{profile.qps.high.toFixed(1)}]</div>
              </div>
              <div className="stat-tile">
                <div className="label">Access Readiness</div>
                <div className="value">{profile.ars.toFixed(0)}</div>
                <div className="band">{bandFor(ARS_BANDS, profile.ars).label}</div>
              </div>
              <div className="stat-tile">
                <div className="label">Research Option Value</div>
                <div className="value">{profile.rov.toFixed(0)}</div>
                <div className="band">{bandFor(ROV_BANDS, profile.rov).label}</div>
              </div>
              <div className="stat-tile">
                <div className="label">Evidence Confidence</div>
                <div className="value">{profile.eci.toFixed(0)}</div>
                <div className="band">{bandFor(ECI_BANDS, profile.eci).label}</div>
              </div>
              <div className="stat-tile">
                <div className="label">Evidence coverage</div>
                <div className="value" style={profile.coverage < MIN_COVERAGE ? { color: "var(--critical)" } : undefined}>
                  {profile.coverage}%
                </div>
                <div className="band">{profile.coverage < MIN_COVERAGE ? `below ${MIN_COVERAGE}% floor` : `≥ ${MIN_COVERAGE}% floor met`}</div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="section-title">Alternative operational utility (0–100)</div>
              {altUtilities.map(({ alt, utility }) => (
                <UtilityBar
                  key={alt.id}
                  label={`${TYPE_LABEL[alt.type]} · TRL ${alt.trl}`}
                  triple={utility}
                  color={TYPE_COLOR[alt.type]}
                />
              ))}
              <p className="rail-note" style={{ marginTop: 6 }}>
                Whiskers show the low–high plausible range from claim-level uncertainty
                (Part 4.4). {uc.alternatives.length > 2 ? "All credible alternatives are scored — not only the headline pair." : ""}
              </p>
            </div>
          </div>

          {/* Decision unit */}
          <div className="panel">
            <h3>Decision unit</h3>
            <p className="sub">A score is valid only for this framing (Part 2.1).</p>
            <div className="fact-grid">
              <div className="fact"><div className="k">Problem</div><div className="v">{uc.problem}</div></div>
              <div className="fact"><div className="k">Decision owner</div><div className="v">{uc.owner}</div></div>
              <div className="fact"><div className="k">Scale</div><div className="v">{uc.scale}</div></div>
              <div className="fact"><div className="k">Outcome threshold</div><div className="v">{uc.outcomeThreshold}</div></div>
              <div className="fact"><div className="k">Frequency</div><div className="v">{uc.frequency}</div></div>
              <div className="fact"><div className="k">Quantum mechanism (G3)</div><div className="v">{uc.mechanism.primitive} — <i>{uc.mechanism.source}</i></div></div>
            </div>
          </div>

          {/* Criteria comparison */}
          <div className="panel">
            <h3>Operational scoring domains</h3>
            <p className="sub">
              Transformed criterion values (0–1) under declared value functions; weights shown
              are the active {profile.jurisdiction ? "local" : "global"} vector.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table className="crit-table" style={{ minWidth: 640 }}>
                <thead>
                  <tr>
                    <th style={{ width: "24%" }}>Criterion</th>
                    <th style={{ width: 70 }}>Weight</th>
                    <th>Classical — {classical.name}</th>
                    <th>Quantum — {quantum.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((c) => {
                    const w = profile.weights[c.id];
                    const gw = GLOBAL_WEIGHTS[c.id];
                    const delta = w - gw;
                    const cs = classical.scores[c.id];
                    const qs = quantum.scores[c.id];
                    return (
                      <tr key={c.id}>
                        <td>
                          <div className="crit-name">{c.label}</div>
                          <div className="crit-note">{c.blurb}</div>
                        </td>
                        <td className="w">
                          {(w * 100).toFixed(1)}%
                          {Math.abs(delta) > 0.002 && (
                            <div className={`w-delta ${delta > 0 ? "up" : "down"}`}>
                              {delta > 0 ? "▲" : "▼"} vs {Math.round(gw * 100)}% global
                            </div>
                          )}
                        </td>
                        <td>
                          <EvidenceChip tag={cs.evidence} />
                          <MiniValueBar value={cs.value.central} low={cs.value.low} high={cs.value.high} color={TYPE_COLOR.classical} />
                          <div className="crit-note">{cs.note}</div>
                        </td>
                        <td>
                          <EvidenceChip tag={qs.evidence} />
                          <MiniValueBar value={qs.value.central} low={qs.value.low} high={qs.value.high} color={TYPE_COLOR[quantum.type]} />
                          <div className="crit-note">{qs.note}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gates */}
          <div className="panel">
            <h3>Gate layer</h3>
            <p className="sub">
              Non-compensatory gates limit available decision lanes — a failed gate cannot be
              bought back by a high score (Part 3).
            </p>
            <div className="gate-grid">
              {GATES.map((g) => {
                const rec = profile.gates[g.id];
                return (
                  <div className="gate" key={g.id}>
                    <div className="g-head">
                      <GateStateDot state={rec.state} />
                      {g.id} · {g.label}
                    </div>
                    <div className="g-note">{rec.note}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Companion indicators */}
          <div className="method-grid">
            <div className="panel">
              <h3>Access Readiness — {profile.ars.toFixed(0)}</h3>
              <p className="sub">{bandFor(ARS_BANDS, profile.ars).label} · {scopeName}</p>
              {ARS_COMPONENTS.map((c) => (
                <BarRow
                  key={c.id}
                  label={c.label}
                  value={profile.arsComponents[c.id]}
                  color="#86b6ef"
                />
              ))}
              {(uc.arsCaps || uc.arsFloors) && (
                <p className="rail-note" style={{ marginTop: 8 }}>
                  {uc.arsCaps ? "Component ceilings applied for this modality (e.g. no cloud substitute for physical infrastructure). " : ""}
                  {uc.arsFloors ? "Component floors applied: this modality ships as standard equipment, unconstrained by QPU access." : ""}
                </p>
              )}
            </div>
            <div className="panel">
              <h3>Research Option Value — {profile.rov.toFixed(0)}</h3>
              <p className="sub">{bandFor(ROV_BANDS, profile.rov).label}</p>
              {ROV_COMPONENTS.map((c) => {
                const boost = c.id === "J" ? (profile.jurisdiction?.rovAlignmentBoost ?? 0) : 0;
                const val = Math.min(100, uc.rov[c.id] + boost);
                return (
                  <BarRow
                    key={c.id}
                    label={c.label}
                    value={val}
                    color="#86b6ef"
                    title={boost ? `Includes +${boost} documented strategic-alignment adjustment` : undefined}
                  />
                );
              })}
              {profile.jurisdiction && profile.jurisdiction.rovAlignmentBoost > 0 && (
                <p className="rail-note" style={{ marginTop: 8 }}>
                  Strategic alignment includes +{profile.jurisdiction.rovAlignmentBoost} from{" "}
                  {profile.jurisdiction.name}'s documented quantum strategy (Part 8.4: strategies
                  may raise alignment — never technical performance).
                </p>
              )}
            </div>
            <div className="panel">
              <h3>Evidence Confidence — {profile.eci.toFixed(0)}</h3>
              <p className="sub">{bandFor(ECI_BANDS, profile.eci).label} · weighted coverage {profile.coverage}%</p>
              {ECI_COMPONENTS.map((c) => (
                <BarRow key={c.id} label={c.label} value={uc.eci[c.id]} color="#86b6ef" />
              ))}
              <p className="rail-note" style={{ marginTop: 8 }}>
                Operational recommendations require ≥ {MIN_COVERAGE}% weighted coverage; a critical
                claim with ECI &lt; 40 blocks deployment regardless of the aggregate.
              </p>
            </div>
          </div>

          {/* Evidence claims */}
          <div className="panel">
            <h3>Key evidence claims</h3>
            <p className="sub">
              Every claim carries its evidence tag — assertive wording is never treated as
              predictive accuracy (Part 9).
            </p>
            <div className="claims">
              {uc.evidenceClaims.map((cl) => (
                <div className="claim" key={cl.text}>
                  <EvidenceChip tag={cl.tag} />
                  <div>
                    <div className="txt">{cl.text}</div>
                    <div className="src">{cl.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trajectory */}
          <div className="panel">
            <h3>Temporal trajectory & crossover</h3>
            <p className="sub">
              The comparison is a trajectory, not a snapshot — keyframes are hardware- and
              algorithm-triggered, not calendar guesses (Part 10).
            </p>
            <div className="timeline">
              {scenarioProfiles.map(({ spec, profile: sp, keyframe }, i) => (
                <div className="tl-item" key={spec.id}>
                  <div className="tl-rail">
                    <div className={`tl-dot${spec.id === profile.scenario ? " active" : ""}`} />
                    {i < scenarioProfiles.length - 1 && <div className="tl-line" />}
                  </div>
                  <div className="tl-body">
                    <div className="tl-title">
                      {spec.label}
                      <span className="tl-qps">
                        {qpsLabel} {sp.qps.central.toFixed(1)} [{sp.qps.low.toFixed(1)}–{sp.qps.high.toFixed(1)}]
                      </span>
                      <LaneBadge lane={sp.lane} />
                    </div>
                    {keyframe ? (
                      <>
                        <div className="tl-text"><b>Trigger:</b> {keyframe.trigger}</div>
                        <div className="tl-text">{keyframe.predictedState}</div>
                        <div className="tl-dep">{keyframe.dependency}</div>
                      </>
                    ) : (
                      <div className="tl-text">{spec.blurb}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="section-title" style={{ marginTop: 8 }}>Crossover triggers — what would flip this verdict</div>
            <ul className="bullets">
              {uc.crossoverTriggers.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Drivers & sensitivity */}
          <div className="method-grid">
            <div className="panel">
              <h3>Top score drivers</h3>
              <ul className="bullets">
                {uc.drivers.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3>Sensitivity</h3>
              <ul className="bullets">
                {uc.sensitivity.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="detail-rail">
          {rail}
          <div className="panel">
            <h3>Across jurisdictions</h3>
            <p className="sub">
              Same use case, same methodology — different readiness realities
              ({SCENARIOS.find((s) => s.id === (evalOptions.scenario as ScenarioId))?.label} scenario, profile defaults).
            </p>
            <table className="juris-table">
              <tbody>
                {jurisRows.map(({ j, profile: jp }) => (
                  <tr key={j?.id ?? "global"} className={(j?.id ?? null) === (profile.jurisdiction?.id ?? null) ? "selected" : ""}>
                    <td>{j ? `${j.flag} ${j.name}` : "🌐 Global reference"}</td>
                    <td className="qps-cell">{jp.qps.central.toFixed(0)}</td>
                    <td><LaneBadge lane={jp.lane} title={LANES[jp.lane].rule} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
