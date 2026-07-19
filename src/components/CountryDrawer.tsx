import { useEffect } from "react";
import { CAPABILITY_BAND_META, DATA_STATUS_META, DOMAINS } from "../data/labels";
import { useCaseById } from "../data/useCases";
import { navigate } from "../router";
import { useAppState } from "../state";
import type { CountryProfile, DomainId } from "../types";
import {
  CategoryBadge,
  ConfidenceBadge,
  DataStatusBadge,
  EvidenceBadge,
  HorizonBadge,
  ProvenanceBadge,
  SampleTag,
} from "./badges";
import { IconCheck, IconClose, IconPlus } from "./icons";
import { SpectrumMeter } from "./SpectrumMeter";

export function CountryDrawer({
  country,
  onClose,
}: {
  country: CountryProfile;
  onClose: () => void;
}) {
  const { brief, toggleBriefUseCase, toggleBriefDomain, setBriefGeo } = useAppState();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const startBrief = () => {
    setBriefGeo(country.iso3);
    navigate("/briefs");
  };

  const relevantUseCaseIds = Array.from(
    new Set(country.outlooks.flatMap((o) => o.relevantUseCases)),
  );

  return (
    <aside
      className="drawer"
      role="dialog"
      aria-label={`Country profile: ${country.name}`}
    >
      <div className="drawer-head">
        <div>
          <div className="drawer-kicker">
            {country.region} · <DataStatusBadge status={country.dataStatus} /> <SampleTag />
          </div>
          <h2>{country.name}</h2>
          <div className="rail-note">Profile updated {country.lastUpdated}</div>
        </div>
        <button className="mini-btn" onClick={onClose} aria-label="Close country panel">
          <IconClose size={14} />
        </button>
      </div>

      <div className="drawer-actions">
        <button className="mini-btn" onClick={() => navigate(`/use-cases`)}>
          View use cases
        </button>
        <button className="mini-btn" onClick={() => navigate(`/compare/${country.iso3}`)}>
          Compare with another country
        </button>
        <button className="mini-btn primary" onClick={startBrief}>
          Start a policy brief
        </button>
      </div>

      <div className="drawer-body">
        {/* A — Summary */}
        <section>
          <h3 className="section-title">National quantum ecosystem</h3>
          <p>{country.summary}</p>
          {country.strategies.length > 0 && (
            <>
              <div className="mini-title">Strategies and priorities</div>
              <ul className="bullets">
                {country.strategies.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* B — Capabilities */}
        <section>
          <h3 className="section-title">Local capabilities</h3>
          {country.capabilities.length === 0 ? (
            <p className="muted">
              Capability assessment not yet available —{" "}
              {DATA_STATUS_META[country.dataStatus].blurb.toLowerCase()}.
            </p>
          ) : (
            <table className="cap-table">
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
          )}
          {country.constraints.length > 0 && (
            <>
              <div className="mini-title">Access constraints</div>
              <ul className="bullets">
                {country.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
          {country.sovereigntyNotes && (
            <p className="local-note">{country.sovereigntyNotes}</p>
          )}
          {country.programs.length > 0 && (
            <>
              <div className="mini-title">Programs</div>
              <ul className="bullets">
                {country.programs.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
          {country.deployments.length > 0 && (
            <>
              <div className="mini-title">Known deployments and testbeds</div>
              <ul className="bullets">
                {country.deployments.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* C — Domain outlooks */}
        <section>
          <h3 className="section-title">Classical–Quantum domain outlooks</h3>
          {country.outlooks.length === 0 && (
            <p className="muted">
              Domain outlooks not yet available for this profile.
            </p>
          )}
          {(Object.keys(DOMAINS) as DomainId[]).map((d) => {
            const outlook = country.outlooks.find((o) => o.domain === d);
            if (!outlook) {
              return country.outlooks.length > 0 ? (
                <div key={d} className="outlook">
                  <div className="outlook-head">
                    <b>{DOMAINS[d].label}</b>
                  </div>
                  <p className="muted">Not yet assessed for this country.</p>
                </div>
              ) : null;
            }
            const p = outlook.profile;
            const inBrief = brief.domains.includes(d);
            return (
              <div key={d} className="outlook">
                <div className="outlook-head">
                  <b>{DOMAINS[d].label}</b>
                  <button
                    className={`mini-btn${inBrief ? " active" : ""}`}
                    onClick={() => {
                      toggleBriefDomain(d);
                      setBriefGeo(country.iso3);
                    }}
                    aria-pressed={inBrief}
                  >
                    {inBrief ? <IconCheck size={12} /> : <IconPlus size={12} />}
                    {inBrief ? "In brief" : "Add to brief"}
                  </button>
                </div>
                <SpectrumMeter spectrum={p.spectrum} compact />
                <div className="outlook-chips">
                  <CategoryBadge category={p.category} compact />
                  <EvidenceBadge status={p.evidence} />
                  <HorizonBadge horizon={p.horizon} />
                  <ConfidenceBadge band={p.confidence} />
                </div>
                <p className="outlook-text">{p.explanation}</p>
                <ul className="bullets">
                  {p.drivers.map((dr) => (
                    <li key={dr}>{dr}</li>
                  ))}
                </ul>
                <div className="outlook-links">
                  {outlook.relevantUseCases.map((id) => {
                    const uc = useCaseById(id);
                    return uc ? (
                      <button
                        key={id}
                        className="linklike"
                        onClick={() => navigate(`/use-cases/${id}`)}
                      >
                        {uc.title}
                      </button>
                    ) : null;
                  })}
                </div>
                {p.provisional && (
                  <p className="rail-note">Provisional assessment — pending validation.</p>
                )}
              </div>
            );
          })}
        </section>

        {/* D — Relevant use cases */}
        <section>
          <h3 className="section-title">Relevant use cases</h3>
          {relevantUseCaseIds.length === 0 ? (
            <p className="muted">No linked use cases for this profile yet.</p>
          ) : (
            <ul className="related-list">
              {relevantUseCaseIds.map((id) => {
                const uc = useCaseById(id);
                if (!uc) return null;
                const note = country.countryUseCaseNotes.find((n) => n.useCaseId === id);
                const inBrief = brief.useCaseIds.includes(id);
                return (
                  <li key={id}>
                    <div className="related-row">
                      <button className="linklike" onClick={() => navigate(`/use-cases/${id}`)}>
                        {uc.title}
                      </button>
                      <button
                        className={`mini-btn${inBrief ? " active" : ""}`}
                        onClick={() => toggleBriefUseCase(id)}
                        aria-pressed={inBrief}
                        title={inBrief ? "Remove from policy brief" : "Add to policy brief"}
                      >
                        {inBrief ? <IconCheck size={12} /> : <IconPlus size={12} />}
                      </button>
                    </div>
                    {note && <div className="rail-note">{note.note}</div>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* E — Road Tour */}
        <section>
          <h3 className="section-title">ITU Quantum Road Tour</h3>
          {country.roadTour.available ? (
            <div className="roadtour-box">
              <p>
                Road Tour contribution on record — latest {country.roadTour.latest},
                from a {country.roadTour.institutionType?.toLowerCase()}.
              </p>
              {country.roadTour.updatedCategories && (
                <p className="rail-note">
                  Updated categories: {country.roadTour.updatedCategories.join(", ")}.
                </p>
              )}
              <p className="rail-note">
                Verification status:{" "}
                {country.roadTour.verification === "verified"
                  ? "verified by the Observatory team"
                  : country.roadTour.verification === "self-reported"
                    ? "self-reported, not yet independently verified"
                    : "pending validation"}
                .
              </p>
            </div>
          ) : (
            <p className="muted">No Road Tour contribution for this country yet.</p>
          )}
          <button className="linklike" onClick={() => navigate("/contribute")}>
            Add or update country data (contributor access)
          </button>
        </section>

        {/* Sources */}
        <section>
          <h3 className="section-title">Sources and provenance</h3>
          <ul className="source-list">
            {country.sources.map((s) => (
              <li key={s.label}>
                <ProvenanceBadge p={s.provenance} />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
