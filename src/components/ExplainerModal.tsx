import { useEffect, useRef } from "react";

/** Public "How to read the analysis" explainer.
 *  Scope is deliberately limited: what question is asked, what outputs mean,
 *  and how to interpret them. The underlying methodology is not described. */
export function ExplainerModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="explainer-title"
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <div className="modal-head">
          <h3 id="explainer-title">How to read the analysis</h3>
          <button className="mini-btn" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
        <div className="modal-body">
          <p>
            <b>The question.</b> For a precisely defined problem, in a specific
            place and time horizon: does a quantum approach justify its additional
            cost, time and risk against the best credible classical alternative —
            and if not, is research or preparation still warranted?
          </p>
          <p>
            <b>The outputs.</b> Each analysis returns a position on the
            classical–quantum spectrum with an uncertainty range, a public pursuit
            category (for example, "Targeted validation recommended"), an evidence
            status, a confidence band, and up to three plain-language drivers.
          </p>
          <p>
            <b>The baseline principle.</b> Quantum approaches are always compared
            with the current best credible classical method — never a convenient or
            outdated baseline.
          </p>
          <p>
            <b>Context matters.</b> Geography, access to hardware and skills,
            evidence quality, uncertainty and time horizon all shape the result.
            The same use case can carry different recommendations in different
            countries.
          </p>
          <p>
            <b>Evidence discipline.</b> Demonstrated results, modeled projections
            and vendor claims are always labeled and never conflated. Where
            evidence is insufficient, no assessment is issued — gaps are reported
            as gaps.
          </p>
          <p>
            <b>Versioned and updated.</b> Every result carries its dataset version
            and last-updated date, and is revised as evidence and technology
            evolve.
          </p>
          <p className="rail-note">
            The analysis is provided by Universum Labs as a managed service; its
            detailed methodology is proprietary and is not part of this
            application.
          </p>
        </div>
      </div>
    </div>
  );
}
