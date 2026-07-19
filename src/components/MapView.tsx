import { useMemo, useState } from "react";
import { COUNTRIES, countryByIso } from "../data/countries";
import { DATA_STATUS_META } from "../data/labels";
import { useAppState } from "../state";
import type { DataStatus } from "../types";
import { CountryDrawer } from "./CountryDrawer";
import { IconSearch } from "./icons";
import { WorldMap } from "./WorldMap";

const LEGEND: DataStatus[] = ["comprehensive", "partial", "provisional", "none"];

const LEGEND_SWATCH: Record<DataStatus, string> = {
  comprehensive: "var(--map-full)",
  partial: "var(--map-partial)",
  provisional: "var(--map-provisional)",
  none: "var(--map-none)",
};

export function MapView() {
  const { selectedCountry, setSelectedCountry } = useAppState();
  const [query, setQuery] = useState("");
  const [showRoadTour, setShowRoadTour] = useState(false);

  const country = selectedCountry ? countryByIso(selectedCountry) : undefined;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.iso3.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Global Map</h2>
          <p className="page-sub">
            Country and regional capability profiles with domain-level
            Classical–Quantum outlooks. Coverage is explicit: most countries do
            not yet have an Observatory assessment, and the map says so.
          </p>
        </div>
      </div>

      <div className="map-toolbar">
        <div className="search-box map-search">
          <IconSearch size={15} />
          <input
            type="search"
            placeholder="Search countries"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search countries"
          />
          {results.length > 0 && (
            <ul className="search-results" role="listbox" aria-label="Country results">
              {results.map((c) => (
                <li key={c.iso3}>
                  <button
                    onClick={() => {
                      setSelectedCountry(c.iso3);
                      setQuery("");
                    }}
                  >
                    {c.name}
                    <span className="rail-note"> · {DATA_STATUS_META[c.dataStatus].label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showRoadTour}
            onChange={(e) => setShowRoadTour(e.target.checked)}
          />
          Show Road Tour contributions
        </label>

        <div className="map-legend" aria-label="Map legend">
          {LEGEND.map((s) => (
            <span key={s} className="legend-item">
              <span className="legend-swatch" style={{ background: LEGEND_SWATCH[s] }} />
              {DATA_STATUS_META[s].label}
            </span>
          ))}
          {showRoadTour && (
            <span className="legend-item">
              <span className="legend-diamond" />
              Road Tour contribution
            </span>
          )}
        </div>
      </div>

      <div className={`map-layout${country ? " with-drawer" : ""}`}>
        <div className="panel map-panel">
          <WorldMap
            selected={selectedCountry}
            onSelect={setSelectedCountry}
            showRoadTour={showRoadTour}
          />
          <div className="map-quicklist">
            <span className="mini-title" style={{ margin: 0 }}>Assessed countries:</span>
            {COUNTRIES.filter((c) => c.dataStatus === "comprehensive" || c.dataStatus === "partial").map(
              (c) => (
                <button
                  key={c.iso3}
                  className={`quick-country${selectedCountry === c.iso3 ? " active" : ""}`}
                  onClick={() => setSelectedCountry(c.iso3)}
                >
                  {c.name}
                </button>
              ),
            )}
          </div>
          <p className="rail-note" style={{ marginTop: 8 }}>
            Sample dataset: assessments exist for a small set of demonstration
            countries. Absence of data reflects Observatory coverage, not a
            judgment about any country.
          </p>
        </div>

        {country && (
          <CountryDrawer country={country} onClose={() => setSelectedCountry(null)} />
        )}
      </div>
    </div>
  );
}
