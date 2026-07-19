import { useMemo, useState } from "react";
import { evaluate } from "../framework/engine";
import type { EvaluateOptions } from "../framework/engine";
import { DOMAINS, LANES } from "../framework/spec";
import type { DomainId, LaneId, UseCase } from "../types";
import { LaneBadge } from "./badges";
import { QpsMeter } from "./meters";

const DOMAIN_IDS: DomainId[] = ["qssc", "materials", "energy"];

export function PortfolioView({
  useCases,
  evalOptions,
  onOpen,
}: {
  useCases: UseCase[];
  evalOptions: EvaluateOptions;
  onOpen: (id: string) => void;
}) {
  const [domainFilter, setDomainFilter] = useState<DomainId | "all">("all");

  const rows = useMemo(
    () =>
      useCases.map((uc) => ({ uc, profile: evaluate(uc, evalOptions) })),
    [useCases, evalOptions],
  );

  const filtered =
    domainFilter === "all" ? rows : rows.filter((r) => r.uc.domain === domainFilter);

  const laneCounts = new Map<LaneId, number>();
  for (const r of rows) {
    laneCounts.set(r.profile.lane, (laneCounts.get(r.profile.lane) ?? 0) + 1);
  }

  const scopeLabel = evalOptions.jurisdiction
    ? `${evalOptions.jurisdiction.name} · local view`
    : "Global reference view";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 19 }}>Use-case portfolio</h2>
        <span style={{ color: "var(--ink-3)", fontSize: 13 }}>{scopeLabel}</span>
      </div>
      <p style={{ color: "var(--ink-2)", margin: "0 0 16px", fontSize: 13.5 }}>
        Nine sample evaluations across three launch domains. Every score is a
        Pursuit Profile under the Classical–Quantum Pursuit Framework v1.0 —
        select a card for the full evaluation.
      </p>

      <div className="domain-filter">
        <button
          className={domainFilter === "all" ? "active" : ""}
          onClick={() => setDomainFilter("all")}
        >
          All domains
        </button>
        {DOMAIN_IDS.map((d) => (
          <button
            key={d}
            className={domainFilter === d ? "active" : ""}
            onClick={() => setDomainFilter(d)}
          >
            {DOMAINS[d].label}
          </button>
        ))}
      </div>

      <div className="lane-summary">
        {(Object.keys(LANES) as LaneId[])
          .filter((l) => laneCounts.has(l))
          .map((l) => (
            <span key={l} className={`chip lane-${LANES[l].tone}`}>
              {laneCounts.get(l)} × {LANES[l].label}
            </span>
          ))}
      </div>

      <div className="grid-cards">
        {filtered.map(({ uc, profile }) => (
          <button key={uc.id} className="uc-card" onClick={() => onOpen(uc.id)}>
            <div className="domain-tag">{DOMAINS[uc.domain].label}</div>
            <h3>{uc.title}</h3>
            <p className="short">{uc.short}</p>
            <QpsMeter qps={profile.qps} compact />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <LaneBadge lane={profile.lane} />
              <span style={{ fontSize: 12.5, color: "var(--ink-2)", fontVariantNumeric: "tabular-nums" }}>
                QPS <b style={{ color: "var(--ink)" }}>{profile.qps.central.toFixed(1)}</b>{" "}
                [{profile.qps.low.toFixed(0)}–{profile.qps.high.toFixed(0)}]
              </span>
            </div>
            <div className="indicators">
              <span>ARS <b>{profile.ars.toFixed(0)}</b></span>
              <span>ROV <b>{profile.rov.toFixed(0)}</b></span>
              <span>ECI <b>{profile.eci.toFixed(0)}</b></span>
              <span>Coverage <b>{profile.coverage}%</b></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
