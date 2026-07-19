import type { Triple } from "../types";

/** QPS band meter: 0–100 scale with the five v1.0 interpretation bands,
 *  the propagated interval, and a central marker. */
export function QpsMeter({
  qps,
  compact = false,
}: {
  qps: Triple;
  compact?: boolean;
}) {
  const H = compact ? 18 : 26;
  const bandY = compact ? 3 : 5;
  const bandH = H - bandY * 2;
  const bounds = [0, 35, 45, 56, 66, 100];
  const x = (v: number) => `${v}%`;
  const w = (a: number, b: number) => `${b - a}%`;

  return (
    <div className="qps-meter">
      <svg
        width="100%"
        height={H}
        role="img"
        aria-label={`QPS ${qps.central.toFixed(1)}, interval ${qps.low.toFixed(1)} to ${qps.high.toFixed(1)}`}
      >
        {bounds.slice(0, -1).map((b, i) => (
          <rect
            key={b}
            x={x(b)}
            y={bandY}
            width={w(b, bounds[i + 1])}
            height={bandH}
            fill={i === 2 ? "var(--grid)" : "var(--surface-2)"}
          />
        ))}
        {bounds.slice(1, -1).map((b) => (
          <rect key={b} x={x(b)} y={bandY} width={1} height={bandH} fill="var(--baseline)" />
        ))}
        {/* parity tick */}
        <rect x="50%" y={0} width={1.5} height={H} fill="var(--ink-3)" />
        {/* interval */}
        <rect
          x={x(qps.low)}
          y={H / 2 - 2}
          width={w(qps.low, qps.high)}
          height={4}
          rx={2}
          fill="var(--accent)"
        />
        {/* central marker */}
        <rect
          x={`${qps.central}%`}
          transform="translate(-2 0)"
          y={bandY - 2}
          width={4}
          height={bandH + 4}
          rx={1.5}
          fill="var(--ink)"
        />
      </svg>
      {!compact && (
        <div className="scale-labels">
          <span>0</span>
          <span style={{ position: "relative", left: "-8%" }}>35</span>
          <span style={{ position: "relative", left: "-3%" }}>45 · parity · 56</span>
          <span style={{ position: "relative", right: "-6%" }}>66</span>
          <span>100</span>
        </div>
      )}
    </div>
  );
}

/** Simple 0–100 horizontal indicator bar with label and value. */
export function BarRow({
  label,
  value,
  color = "var(--accent)",
  max = 100,
  valueText,
  title,
}: {
  label: string;
  value: number;
  color?: string;
  max?: number;
  valueText?: string;
  title?: string;
}) {
  return (
    <div className="bar-row" title={title}>
      <div className="bar-label">{label}</div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <div className="bar-val">{valueText ?? value.toFixed(0)}</div>
    </div>
  );
}

/** Utility bar with uncertainty interval overlay (low–high whisker). */
export function UtilityBar({
  label,
  triple,
  color,
}: {
  label: string;
  triple: Triple;
  color: string;
}) {
  return (
    <div className="bar-row" title={`${label}: ${triple.central.toFixed(1)} [${triple.low.toFixed(1)}–${triple.high.toFixed(1)}]`}>
      <div className="bar-label">{label}</div>
      <div className="bar-track" style={{ height: 16 }}>
        <div
          className="bar-fill"
          style={{ width: `${triple.central}%`, background: color }}
        />
        <div
          style={{
            position: "absolute",
            left: `${triple.low}%`,
            width: `${triple.high - triple.low}%`,
            top: "50%",
            height: 2,
            marginTop: -1,
            background: "var(--ink)",
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${triple.high}%`,
            top: 3,
            bottom: 3,
            width: 2,
            marginLeft: -1,
            background: "var(--ink)",
            opacity: 0.65,
          }}
        />
      </div>
      <div className="bar-val">{triple.central.toFixed(1)}</div>
    </div>
  );
}

/** Tiny 0–1 value bar used inside the criteria table. */
export function MiniValueBar({
  value,
  low,
  high,
  color,
}: {
  value: number;
  low: number;
  high: number;
  color: string;
}) {
  return (
    <div
      className="bar-track"
      style={{ height: 10, marginTop: 4 }}
      title={`${value.toFixed(2)} [${low.toFixed(2)}–${high.toFixed(2)}]`}
    >
      <div className="bar-fill" style={{ width: `${value * 100}%`, background: color }} />
      <div
        style={{
          position: "absolute",
          left: `${low * 100}%`,
          width: `${(high - low) * 100}%`,
          top: "50%",
          height: 2,
          marginTop: -1,
          background: "var(--ink)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
