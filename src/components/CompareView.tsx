import { useMemo, useState } from "react";
import { COUNTRIES, countryByIso } from "../data/countries";
import { CAPABILITY_BAND_META, DOMAINS, DOMAIN_IDS } from "../data/labels";
import { USE_CASES } from "../data/useCases";
import { navigate } from "../router";
import { useAppState } from "../state";
import type { CountryProfile } from "../types";
import {
  CategoryBadge,
  ConfidenceBadge,
  DataStatusBadge,
  EvidenceBadge,
  HorizonBadge,
} from "./badges";
import { SpectrumMeter } from "./SpectrumMeter";

const ASSESSED = COUNTRIES.filter(
  (c) => c.dataStatus === "comprehensive" || c.dataStatus === "partial",
);

function CountryPicker({
  value,
  onChange,
  exclude,
  label,
}: {
  value: string | null;
  onChange: (iso3: string | null) => void;
  exclude?: string | null;
  label: string;
}) {
  return (
    <label className="picker">
      <span>{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">Select a country</option>
        {ASSESSED.filter((c) => c.iso3 !== exclude).map((c) => (
          <option key={c.iso3} value={c.iso3}>{c.name}</option>
        ))}
      </select>
    </label>
  );
}

function CountryColumn({ c }: { c: CountryProfile }) {
  return (
    <div className="cmp-col">
      <div className="cmp-col-head">
        <h3>{c.name}</h3>
        <DataStatusBadge status={c.dataStatus} />
        <span className="rail-note">Updated {c.lastUpdated}</span>
      </div>
      <p className="cmp-summary">{c.summary}</p>
      <div className="mini-title">Capabilities</div>
      <table className="cap-table compact">
        <tbody>
          {c.capabilities.map((cap) => (
            <tr key={cap.area}>
              <td className="cap-area">{cap.area}</td>
              <td>
                <span className={`band-chip band-${cap.band}`}>
                  {CAPABILITY_BAND_META[cap.band].label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mini-title">Domain outlooks</div>
      {DOMAIN_IDS.map((d) => {
        const o = c.outlooks.find((x) => x.domain === d);
        return (
          <div key={d} className="cmp-outlook">
            <div className="cmp-outlook-name">{DOMAINS[d].short}</div>
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
  );
}

export function CompareView({ preselect }: { preselect?: string }) {
  const { setBriefGeo } = useAppState();
  const [tab, setTab] = useState<"countries" | "usecases">("countries");
  const [a, setA] = useState<string | null>(preselect ?? "ARE");
  const [b, setB] = useState<string | null>(null);
  const [ucIds, setUcIds] = useState<string[]>([]);

  const ca = a ? countryByIso(a) : undefined;
  const cb = b ? countryByIso(b) : undefined;

  const toggleUc = (id: string) =>
    setUcIds((xs) =>
      xs.includes(id) ? xs.filter((x) => x !== id) : xs.length < 3 ? [...xs, id] : xs,
    );

  const chosen = useMemo(
    () => ucIds.map((id) => USE_CASES.find((u) => u.id === id)!).filter(Boolean),
    [ucIds],
  );

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Compare</h2>
          <p className="page-sub">
            Side-by-side views of country capability profiles or use-case
            assessments. All content is illustrative sample data.
          </p>
        </div>
      </div>

      <div className="seg seg-inline" role="group" aria-label="Comparison mode">
        <button className={tab === "countries" ? "active" : ""} onClick={() => setTab("countries")}>
          Countries
        </button>
        <button className={tab === "usecases" ? "active" : ""} onClick={() => setTab("usecases")}>
          Use cases
        </button>
      </div>

      {tab === "countries" && (
        <>
          <div className="picker-row">
            <CountryPicker label="Country A" value={a} onChange={setA} exclude={b} />
            <CountryPicker label="Country B" value={b} onChange={setB} exclude={a} />
            {ca && cb && (
              <button
                className="mini-btn primary"
                onClick={() => {
                  setBriefGeo(ca.iso3);
                  navigate("/briefs");
                }}
              >
                Start a brief for {ca.name}
              </button>
            )}
          </div>
          {ca || cb ? (
            <div className="panel">
              <div className="cmp-grid">
                {ca ? <CountryColumn c={ca} /> : <div className="cmp-col empty-state">Select a country</div>}
                {cb ? <CountryColumn c={cb} /> : <div className="cmp-col empty-state">Select a second country</div>}
              </div>
            </div>
          ) : (
            <div className="empty-state">Select countries to compare.</div>
          )}
        </>
      )}

      {tab === "usecases" && (
        <>
          <div className="uc-pick-row" role="group" aria-label="Select up to three use cases">
            {USE_CASES.map((u) => (
              <button
                key={u.id}
                className={`quick-country${ucIds.includes(u.id) ? " active" : ""}`}
                onClick={() => toggleUc(u.id)}
                aria-pressed={ucIds.includes(u.id)}
              >
                {u.title}
              </button>
            ))}
          </div>
          {chosen.length === 0 ? (
            <div className="empty-state">Select up to three use cases to compare.</div>
          ) : (
            <div className="panel" style={{ overflowX: "auto" }}>
              <table className="cmp-uc-table">
                <thead>
                  <tr>
                    <th>Attribute</th>
                    {chosen.map((u) => (
                      <th key={u.id}>
                        <button className="linklike" onClick={() => navigate(`/use-cases/${u.id}`)}>
                          {u.title}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Domain</td>
                    {chosen.map((u) => (
                      <td key={u.id}>{DOMAINS[u.domain].label}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Modality</td>
                    {chosen.map((u) => (
                      <td key={u.id}>{u.modality}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Maturity</td>
                    {chosen.map((u) => (
                      <td key={u.id}>TRL {u.trl} — {u.maturityLabel}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Pursuit profile</td>
                    {chosen.map((u) => (
                      <td key={u.id}>
                        <SpectrumMeter spectrum={u.profiles[0].spectrum} compact />
                        <CategoryBadge category={u.profiles[0].category} compact />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Evidence</td>
                    {chosen.map((u) => (
                      <td key={u.id}><EvidenceBadge status={u.profiles[0].evidence} /></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Confidence</td>
                    {chosen.map((u) => (
                      <td key={u.id}><ConfidenceBadge band={u.profiles[0].confidence} /></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Horizon</td>
                    {chosen.map((u) => (
                      <td key={u.id}><HorizonBadge horizon={u.profiles[0].horizon} /></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Key drivers</td>
                    {chosen.map((u) => (
                      <td key={u.id}>
                        <ul className="bullets">
                          {u.profiles[0].drivers.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
