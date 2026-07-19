import { CRITERIA, MULTIPLIER_MAX, MULTIPLIER_MIN } from "../framework/spec";
import type { CriterionId, Jurisdiction } from "../types";

/** Live priority-multiplier controls (Part 6.3): each criterion's decision
 *  weight can be adjusted within the v1.0 bounds; weights renormalize. */
export function WhatIfPanel({
  jurisdiction,
  overrides,
  onChange,
  onReset,
}: {
  jurisdiction: Jurisdiction | null;
  overrides: Partial<Record<CriterionId, number>>;
  onChange: (id: CriterionId, value: number) => void;
  onReset: () => void;
}) {
  const baseFor = (id: CriterionId) =>
    jurisdiction?.priorityMultipliers[id] ?? 1;
  const anyChanged = Object.keys(overrides).length > 0;

  return (
    <div className="panel whatif">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3>What-if: priority weighting</h3>
        {anyChanged && (
          <button className="reset-btn" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
      <p className="sub">
        Priority multipliers (0.75–1.50) reweight the {jurisdiction ? "local" : "global"} scoring
        vector; weights renormalize per Part 6.3. Scores and lanes update live.
      </p>
      {CRITERIA.map((c) => {
        const base = baseFor(c.id);
        const value = overrides[c.id] ?? base;
        const changed = overrides[c.id] !== undefined && overrides[c.id] !== base;
        return (
          <div key={c.id}>
            <div className="slider-label">
              <span>{c.label}</span>
            </div>
            <div className="slider-row">
              <input
                type="range"
                min={MULTIPLIER_MIN}
                max={MULTIPLIER_MAX}
                step={0.05}
                value={value}
                aria-label={`${c.label} priority multiplier`}
                onChange={(e) => onChange(c.id, Number(e.target.value))}
              />
              <div className={`mult${changed ? " changed" : ""}`}>×{value.toFixed(2)}</div>
            </div>
          </div>
        );
      })}
      <p className="rail-note" style={{ marginTop: 12 }}>
        In production, multiplier changes require documented policy evidence
        (Level 0–4) and are versioned with an effective date. This panel is a
        sandbox for exploring sensitivity.
      </p>
    </div>
  );
}
