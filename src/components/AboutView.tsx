import { useState } from "react";
import { DATA_VERSION, EVIDENCE_META, PROVENANCE_META, SAMPLE_DISCLOSURE } from "../data/labels";
import { navigate } from "../router";
import type { EvidenceStatus, Provenance } from "../types";
import { EvidenceBadge, ProvenanceBadge } from "./badges";
import { ExplainerModal } from "./ExplainerModal";

export function AboutView() {
  const [explainer, setExplainer] = useState(false);

  return (
    <div className="about">
      <div className="page-head">
        <div>
          <h2>About / Data Notes</h2>
          <p className="page-sub">
            What the Observatory is, where its data comes from, and how to read
            what it publishes.
          </p>
        </div>
      </div>

      <div className="method-grid">
        <div className="panel">
          <h3>The Observatory</h3>
          <p>
            The Global Quantum Use Case &amp; Readiness Observatory is an ITU
            platform for exploring quantum use cases, understanding national and
            regional capabilities, comparing classical and quantum pathways, and
            generating policy briefs for decision-makers.
          </p>
          <p>
            Classical–Quantum analysis is provided by Universum Labs as a managed
            service. The Observatory publishes the analysis results — pursuit
            categories, spectrum positions with uncertainty, confidence and
            evidence labels, and plain-language drivers — while the underlying
            methodology remains proprietary to Universum Labs.
          </p>
          <button className="linklike" onClick={() => setExplainer(true)}>
            How to read the analysis
          </button>
        </div>

        <div className="panel">
          <h3>Demonstration dataset</h3>
          <p>{SAMPLE_DISCLOSURE}</p>
          <p>
            The current build ships {DATA_VERSION}: nine use cases across three
            demonstration domains, five assessed country profiles, and four
            provisional profiles. Absence of data for a country reflects
            Observatory coverage, not a judgment about that country.
          </p>
          <p className="rail-note">
            Every record carries a version, a last-updated date and a provenance
            label. Missing evidence is displayed as missing — it is never
            silently converted into a low assessment.
          </p>
        </div>

        <div className="panel">
          <h3>Evidence status labels</h3>
          <div className="stack">
            {(Object.keys(EVIDENCE_META) as EvidenceStatus[]).map((s) => (
              <div key={s} className="legend-row">
                <EvidenceBadge status={s} />
                <span>{EVIDENCE_META[s].blurb}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Source provenance labels</h3>
          <div className="stack">
            {(Object.keys(PROVENANCE_META) as Provenance[]).map((p) => (
              <div key={p} className="legend-row">
                <ProvenanceBadge p={p} />
              </div>
            ))}
          </div>
          <p className="rail-note">
            A statement is labeled peer-reviewed only when the underlying record
            establishes that. Vendor-reported and unverified material is always
            identified as such.
          </p>
        </div>

        <div className="panel">
          <h3>ITU Quantum Road Tour</h3>
          <p>
            The Observatory's country data model accepts observations collected
            through the ITU Quantum Road Tour: capability updates contributed by
            national institutions, each labeled with its contributor type, date
            and verification status (verified, self-reported, or pending
            validation).
          </p>
          <button className="linklike" onClick={() => navigate("/contribute")}>
            Contributor and administrator access
          </button>
        </div>

        <div className="panel">
          <h3>Data ingestion roadmap</h3>
          <p>
            The schema behind this demonstration is designed for manual curation
            first, with automated ingestion — source monitoring, contribution
            workflows and scheduled re-assessment — planned without interface
            redesign. Assessments are versioned; superseded results remain
            traceable.
          </p>
        </div>
      </div>

      {explainer && <ExplainerModal onClose={() => setExplainer(false)} />}
    </div>
  );
}
