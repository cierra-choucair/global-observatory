import {
  ARS_WEIGHTS,
  ARS_COMPONENTS,
  CRITERIA,
  ECI_COMPONENTS,
  ECI_WEIGHTS,
  EVIDENCE_TAGS,
  GATES,
  GLOBAL_WEIGHTS,
  LANES,
  ROV_COMPONENTS,
  ROV_WEIGHTS,
} from "../framework/spec";
import type { EvidenceTag, LaneId } from "../types";
import { EvidenceChip, LaneBadge } from "./badges";
import { BarRow } from "./meters";

const OUTPUTS = [
  { name: "Global Quantum Pursuit Score (G-QPS)", scale: "0–100, parity at 50", q: "Under the fixed reference methodology, does quantum deliver greater operational utility than the classical baseline?" },
  { name: "Local Quantum Pursuit Score (L-QPS)", scale: "0–100, parity at 50", q: "How does the comparison change under a jurisdiction's conditions and priorities?" },
  { name: "Access Readiness Score (ARS)", scale: "0–100", q: "Can the relevant user in this jurisdiction actually access, integrate and operate the solution?" },
  { name: "Research Option Value (ROV)", scale: "0–100", q: "Is research or capability-building rational even without operational advantage?" },
  { name: "Evidence Confidence Index (ECI)", scale: "0–100 + coverage", q: "How strongly are the claims and scores supported?" },
  { name: "Crossover Horizon", scale: "Scenario & triggers", q: "What would need to change for the operational verdict to flip?" },
  { name: "Decision Lane", scale: "Categorical", q: "Deploy, pilot, validate, prepare, research, monitor, classical default — or insufficient evidence?" },
];

const PRINCIPLES = [
  "Alternative-neutral: the methodology does not presume quantum should win.",
  "Best credible baseline: quantum is compared with the current best classical method, never a convenient one.",
  "End-to-end measurement: compilation, queuing, repetitions, error handling and verification are all in the denominator.",
  "Non-compensatory gates: no strategic score can buy back a failed safety, accuracy, legal or access requirement.",
  "Operational and research decisions are separate: losing today does not mean not worth pursuing.",
  "Evidence is confidence, not desirability: strong negative evidence raises confidence, not the quantum score.",
  "Missing data stays visible: unknowns become intervals and coverage, never silent imputations.",
  "Global comparability, local relevance: one fixed method, versioned jurisdictional views.",
  "Versioned and reversible: every result records assumptions, weights, sources and triggers.",
];

export function MethodologyView() {
  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 19 }}>Methodology</h2>
      <p style={{ color: "var(--ink-2)", margin: "0 0 4px", fontSize: 13.5, maxWidth: 860 }}>
        The Observatory's comparison panels implement the <b>Universum Labs Classical–Quantum
        Pursuit Framework v1.0</b> — a versioned, evidence-grounded multi-criteria decision
        methodology. It compares the best credible classical, quantum, hybrid and
        quantum-inspired approaches to a precisely defined problem, and answers whether the
        incremental value of a quantum approach justifies its additional cost, time and risk in a
        specified geography and time horizon.
      </p>
      <p style={{ color: "var(--ink-3)", fontSize: 12.5, margin: "0 0 8px" }}>
        Weights and thresholds shown are v1.0 provisional defaults, pending empirical calibration
        through the pilot program.
      </p>

      <div className="method-grid">
        <div className="panel" style={{ gridColumn: "1 / -1" }}>
          <h3>The Pursuit Profile</h3>
          <p className="sub">Every evaluation returns seven outputs — never a single unsupported verdict.</p>
          <div style={{ overflowX: "auto" }}>
            <table className="method-table" style={{ minWidth: 560 }}>
              <thead>
                <tr><th>Output</th><th>Scale</th><th>Decision question</th></tr>
              </thead>
              <tbody>
                {OUTPUTS.map((o) => (
                  <tr key={o.name}>
                    <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{o.name}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{o.scale}</td>
                    <td>{o.q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Global domain weights (v1.0)</h3>
          <p className="sub">Sᵃ = 100 × Σ wᵢ · vᵢ(xᵢ) — value functions map raw metrics to 0–1 utility before weighting.</p>
          {CRITERIA.map((c) => (
            <BarRow
              key={c.id}
              label={c.label}
              value={GLOBAL_WEIGHTS[c.id] * 100}
              max={30}
              valueText={`${(GLOBAL_WEIGHTS[c.id] * 100).toFixed(0)}%`}
              color="#86b6ef"
            />
          ))}
          <p className="rail-note" style={{ marginTop: 8 }}>
            QPS = clip[50 + (S_Q − S_C) ⁄ 2]. Local views multiply weights by bounded
            condition and priority multipliers (0.75–1.50), then renormalize.
          </p>
        </div>

        <div className="panel">
          <h3>Decision lanes & default rules</h3>
          <p className="sub">The score recommends a lane; named reviewers stay accountable for the decision.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(Object.keys(LANES) as LaneId[]).map((l) => (
              <div key={l} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <LaneBadge lane={l} />
                <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{LANES[l].rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Evidence tags</h3>
          <p className="sub">Demonstrated results and modeled projections are never visually conflated.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(Object.keys(EVIDENCE_TAGS) as EvidenceTag[]).map((t) => (
              <div key={t} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <EvidenceChip tag={t} />
                <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{EVIDENCE_TAGS[t].blurb}</span>
              </div>
            ))}
          </div>
          <p className="rail-note" style={{ marginTop: 10 }}>
            Weighted evidence coverage must reach 70% before any operational recommendation is
            issued; a critical claim with ECI &lt; 40 blocks deployment.
          </p>
        </div>

        <div className="panel">
          <h3>Gate layer</h3>
          <p className="sub">Evaluated before weighted scoring; failure limits available lanes.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {GATES.map((g) => (
              <div key={g.id} style={{ fontSize: 12.5 }}>
                <b>{g.id} — {g.label}.</b>{" "}
                <span style={{ color: "var(--ink-2)" }}>{g.pass}.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Companion indices</h3>
          <p className="sub">Fixed component weights, exposed for diagnosis — composites stay decomposable.</p>
          <div className="section-title">Access Readiness</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 8px" }}>
            {ARS_COMPONENTS.map((c) => `${(ARS_WEIGHTS[c.id] * 100).toFixed(0)}% ${c.label}`).join(" · ")}
          </p>
          <div className="section-title">Research Option Value</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 8px" }}>
            {ROV_COMPONENTS.map((c) => `${(ROV_WEIGHTS[c.id] * 100).toFixed(0)}% ${c.label}`).join(" · ")}
          </p>
          <div className="section-title">Evidence Confidence</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0 }}>
            {ECI_COMPONENTS.map((c) => `${(ECI_WEIGHTS[c.id] * 100).toFixed(0)}% ${c.label}`).join(" · ")}
          </p>
        </div>

        <div className="panel">
          <h3>Core principles</h3>
          <ul className="bullets">
            {PRINCIPLES.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
