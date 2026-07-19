import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import { COUNTRIES, COUNTRY_MARKERS, countryByMapId } from "../data/countries";
import { DATA_STATUS_META } from "../data/labels";
import type { CountryProfile, DataStatus } from "../types";

const WIDTH = 960;
const HEIGHT = 470;

interface WorldTopology {
  type: "Topology";
  objects: { countries: unknown };
}

const world = worldData as unknown as WorldTopology;

const countriesFc = feature(
  world as never,
  world.objects.countries as never,
) as unknown as FeatureCollection<Geometry, { name?: string }>;

const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], {
  type: "Sphere",
} as never);
const path = geoPath(projection);

const STATUS_FILL: Record<DataStatus, string> = {
  comprehensive: "var(--map-full)",
  partial: "var(--map-partial)",
  provisional: "var(--map-provisional)",
  none: "var(--map-none)",
};

export function WorldMap({
  selected,
  onSelect,
  showRoadTour,
}: {
  selected: string | null;
  onSelect: (iso3: string) => void;
  showRoadTour: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const features = useMemo(
    () => countriesFc.features.filter((f) => String(f.id) !== "010"),
    [],
  );

  const markers = useMemo(() => {
    const out: { c: CountryProfile; x: number; y: number }[] = [];
    for (const c of COUNTRIES) {
      const coords = COUNTRY_MARKERS[c.iso3];
      if (!coords) continue;
      const pt = projection(coords);
      if (pt) out.push({ c, x: pt[0], y: pt[1] });
    }
    return out;
  }, []);

  const roadTourMarkers = useMemo(() => {
    if (!showRoadTour) return [];
    const out: { c: CountryProfile; x: number; y: number }[] = [];
    for (const c of COUNTRIES) {
      if (!c.roadTour.available) continue;
      const coords = COUNTRY_MARKERS[c.iso3];
      let pt: [number, number] | null = null;
      if (coords) {
        pt = projection(coords) as [number, number] | null;
      } else {
        const f = features.find((ft) => String(ft.id) === c.mapId);
        if (f) {
          const centroid = path.centroid(f as never);
          if (centroid && Number.isFinite(centroid[0])) pt = [centroid[0], centroid[1]];
        }
      }
      if (pt) out.push({ c, x: pt[0], y: pt[1] });
    }
    return out;
  }, [showRoadTour, features]);

  const hoveredProfile = hovered ? countryByMapId(hovered) : undefined;
  const hoveredName =
    hoveredProfile?.name ??
    (hovered
      ? (features.find((f) => String(f.id) === hovered)?.properties?.name ?? "")
      : "");

  return (
    <div className="map-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="World map showing Observatory data coverage by country. Use the search field or country list for keyboard selection."
        className="world-map"
      >
        {features.map((f) => {
          const id = String(f.id);
          const profile = countryByMapId(id);
          const status: DataStatus = profile?.dataStatus ?? "none";
          const isSelected = profile && profile.iso3 === selected;
          const d = path(f as never) ?? undefined;
          return (
            <path
              key={id}
              d={d}
              className={`country${profile ? " has-data" : ""}${isSelected ? " selected" : ""}`}
              fill={STATUS_FILL[status]}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onClick={profile ? () => onSelect(profile.iso3) : undefined}
              style={{ cursor: profile ? "pointer" : "default" }}
            >
              <title>
                {(f.properties?.name ?? id) +
                  " — " +
                  DATA_STATUS_META[status].label}
              </title>
            </path>
          );
        })}

        {/* markers for states too small to click at this resolution */}
        {markers.map(({ c, x, y }) => (
          <g
            key={c.iso3}
            className={`state-marker${c.iso3 === selected ? " selected" : ""}`}
            onClick={() => onSelect(c.iso3)}
            onMouseEnter={() => setHovered(c.mapId)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={x} cy={y} r={6} className="state-marker-dot" />
            <title>{`${c.name} — ${DATA_STATUS_META[c.dataStatus].label}`}</title>
          </g>
        ))}

        {/* Road Tour contribution markers (shape, not color, carries meaning) */}
        {roadTourMarkers.map(({ c, x, y }) => (
          <g key={`rt-${c.iso3}`} className="roadtour-marker" pointerEvents="none">
            <rect x={x - 3.5} y={y - 3.5} width={7} height={7} transform={`rotate(45 ${x} ${y})`} />
          </g>
        ))}
      </svg>
      <div className="map-hoverbar" aria-live="polite">
        {hoveredName
          ? `${hoveredName} — ${DATA_STATUS_META[hoveredProfile?.dataStatus ?? "none"].label}`
          : "Hover or click a country; small states are shown as circular markers"}
      </div>
    </div>
  );
}
