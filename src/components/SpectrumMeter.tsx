import type { Spectrum } from "../types";

/** Public classical–quantum spectrum.
 *
 *  Deliberately unscaled: no numeric axis, no band boundaries — only the
 *  three labeled zones and the analysis result with its uncertainty range.
 *  When spectrum is null (insufficient evidence) the meter shows an explicit
 *  not-assessed state rather than a low position. */
export function SpectrumMeter({
  spectrum,
  compact = false,
}: {
  spectrum: Spectrum | null;
  compact?: boolean;
}) {
  const H = compact ? 16 : 22;
  const y0 = compact ? 3 : 4;
  const bandH = H - y0 * 2;

  if (!spectrum) {
    return (
      <div className="spectrum">
        <div
          className="spectrum-empty"
          style={{ height: H }}
          role="img"
          aria-label="Not assessed: insufficient evidence"
        >
          Not assessed — insufficient evidence
        </div>
        {!compact && <SpectrumLabels />}
      </div>
    );
  }

  const { position, low, high } = spectrum;
  return (
    <div className="spectrum">
      <svg
        width="100%"
        height={H}
        role="img"
        aria-label={`Analysis position on the classical to quantum spectrum: ${
          position < 42 ? "leans classical" : position > 58 ? "leans quantum" : "balanced or conditional"
        }, with uncertainty from ${low < 42 ? "classical" : low > 58 ? "quantum" : "balanced"} to ${
          high > 58 ? "quantum" : high < 42 ? "classical" : "balanced"
        }`}
      >
        {/* three unnumbered zones */}
        <rect x="0%" y={y0} width="42%" height={bandH} fill="var(--surface-2)" />
        <rect x="42%" y={y0} width="16%" height={bandH} fill="var(--grid)" />
        <rect x="58%" y={y0} width="42%" height={bandH} fill="var(--surface-2)" />
        <rect x="42%" y={y0} width="1" height={bandH} fill="var(--baseline)" />
        <rect x="58%" y={y0} width="1" height={bandH} fill="var(--baseline)" />
        {/* uncertainty range */}
        <rect
          x={`${low}%`}
          y={H / 2 - 2}
          width={`${high - low}%`}
          height={4}
          rx={2}
          fill="var(--accent)"
        />
        {/* central marker */}
        <rect
          x={`${position}%`}
          transform="translate(-2 0)"
          y={y0 - 2}
          width={4}
          height={bandH + 4}
          rx={1.5}
          fill="var(--ink)"
        />
      </svg>
      {!compact && <SpectrumLabels />}
    </div>
  );
}

function SpectrumLabels() {
  return (
    <div className="spectrum-labels">
      <span>Classical pathway</span>
      <span>Balanced / conditional</span>
      <span>Quantum pathway</span>
    </div>
  );
}
