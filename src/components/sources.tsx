import { useEffect, useRef, useState } from "react";
import { ulUseCaseUrl, UL_PLATFORM_BASE_URL } from "../config";
import {
  evidenceRecordFor,
  refNumber,
  SOURCE_STATUS_META,
  SOURCE_TYPE_META,
  sourcesForUseCase,
} from "../data/citations";
import type { PublicSourceRecord } from "../data/citations";
import { countryByIso } from "../data/countries";
import { IconAlert, IconExternal } from "./icons";

function citationLine(s: PublicSourceRecord): string {
  const who = s.authors?.join(", ") ?? s.institution ?? "";
  return [who, s.publication, s.year ? String(s.year) : ""].filter(Boolean).join(" · ");
}

function sourceHref(s: PublicSourceRecord): string | undefined {
  if (s.doi) return `https://doi.org/${s.doi}`;
  return s.officialUrl;
}

export function SourceTypeBadge({ s }: { s: PublicSourceRecord }) {
  return <span className={`prov-chip st-${s.sourceType}`}>{SOURCE_TYPE_META[s.sourceType]}</span>;
}

export function SourceStatusBadge({ s }: { s: PublicSourceRecord }) {
  return (
    <span className={`evidence-chip ss-${s.evidenceStatus}`}>
      {SOURCE_STATUS_META[s.evidenceStatus]}
    </span>
  );
}

/** Compact [n] claim-level reference markers. */
export function CitationRefs({
  useCaseId,
  ids,
  onOpen,
}: {
  useCaseId: string;
  ids: string[] | undefined;
  onOpen: (id: string) => void;
}) {
  if (!ids || ids.length === 0) return null;
  const sources = sourcesForUseCase(useCaseId);
  return (
    <span className="cite-refs">
      {ids.map((id) => {
        const n = refNumber(useCaseId, id);
        const src = sources.find((s) => s.id === id);
        if (n < 1 || !src) return null;
        return (
          <button
            key={id}
            className="cite-ref"
            onClick={() => onOpen(id)}
            aria-label={`Reference ${n}: ${src.title}`}
            title={src.title}
          >
            [{n}]
          </button>
        );
      })}
    </span>
  );
}

export function SourceCard({
  s,
  n,
  highlighted,
  onOpen,
}: {
  s: PublicSourceRecord;
  n: number;
  highlighted: boolean;
  onOpen: () => void;
}) {
  const href = sourceHref(s);
  return (
    <div className={`source-card${highlighted ? " highlighted" : ""}`} id={`source-${s.id}`}>
      <div className="source-card-badges">
        <span className="cite-num" aria-hidden="true">[{n}]</span>
        <SourceTypeBadge s={s} />
        <SourceStatusBadge s={s} />
        {s.isIllustrative && <span className="sample-tag">Illustrative — sample data</span>}
      </div>
      <div className="source-title">
        <button className="linklike source-title-btn" onClick={onOpen}>
          {s.title}
        </button>
      </div>
      {citationLine(s) && <div className="source-line">{citationLine(s)}</div>}
      <div className="source-supports">
        <b>Supports:</b> {s.claimsSupported.join(" · ")}
      </div>
      <div className="source-actions">
        {href ? (
          <a
            className="mini-btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source: ${s.title} (opens external site)`}
          >
            View source <IconExternal size={12} />
          </a>
        ) : (
          <span className="rail-note">
            {s.isIllustrative
              ? "No external link — illustrative record"
              : "No public link available"}
          </span>
        )}
        <button className="mini-btn" onClick={onOpen}>
          Details
        </button>
      </div>
    </div>
  );
}

export function SourceModal({
  s,
  useCaseId,
  onClose,
}: {
  s: PublicSourceRecord;
  useCaseId: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const href = sourceHref(s);
  const n = refNumber(useCaseId, s.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Source record: ${s.title}`}
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <div className="modal-head">
          <span className="cite-num">[{n}]</span>
          <button className="mini-btn" onClick={onClose} aria-label="Close source record">
            Close
          </button>
        </div>
        <div className="modal-body">
          <h3 style={{ margin: "0 0 6px", fontSize: 15.5 }}>{s.title}</h3>
          {citationLine(s) && <p className="source-line">{citationLine(s)}</p>}
          <div className="source-card-badges" style={{ margin: "8px 0" }}>
            <SourceTypeBadge s={s} />
            <SourceStatusBadge s={s} />
            {s.isIllustrative && <span className="sample-tag">Illustrative — sample data</span>}
          </div>
          <div className="fact-grid" style={{ margin: "12px 0" }}>
            {s.publicationDate && (
              <div className="fact"><div className="k">Publication date</div><div className="v">{s.publicationDate}</div></div>
            )}
            {s.lastReviewed && (
              <div className="fact"><div className="k">Last reviewed</div><div className="v">{s.lastReviewed}</div></div>
            )}
            {s.jurisdictionIds && s.jurisdictionIds.length > 0 && (
              <div className="fact">
                <div className="k">Applicable geography</div>
                <div className="v">
                  {s.jurisdictionIds.map((j) => countryByIso(j)?.name ?? j).join(", ")}
                </div>
              </div>
            )}
            {s.accessStatus && (
              <div className="fact"><div className="k">Access</div><div className="v">{s.accessStatus}</div></div>
            )}
          </div>
          <div className="mini-title">Claims supported</div>
          <ul className="bullets">
            {s.claimsSupported.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {s.publicSummary && (
            <>
              <div className="mini-title">Note</div>
              <p style={{ fontSize: 13, margin: "4px 0" }}>{s.publicSummary}</p>
            </>
          )}
          {s.sourceType === "vendor" && (
            <p className="local-note">
              Vendor-reported material is treated as a claim, not as independently
              demonstrated evidence, unless an independent source establishes it.
            </p>
          )}
          {href && (
            <a
              className="mini-btn primary"
              style={{ marginTop: 12 }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source: ${s.title} (opens external site)`}
            >
              View source <IconExternal size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** "Evidence & Selected Sources" — the public selective-transparency layer. */
export function SourcesSection({
  useCaseId,
  domain,
  horizon,
  jurisdiction,
  highlightedId,
  onOpenSource,
}: {
  useCaseId: string;
  domain: string;
  horizon: string;
  jurisdiction: string | null;
  highlightedId: string | null;
  onOpenSource: (id: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches,
  );
  const sources = sourcesForUseCase(useCaseId);
  const meta = evidenceRecordFor(useCaseId);
  const ulUrl = ulUseCaseUrl({ useCaseId, jurisdiction, domain, horizon });

  if (sources.length === 0) {
    return (
      <details className="disclosure" open>
        <summary>Evidence &amp; Selected Sources</summary>
        <div className="disclosure-body">
          <p className="muted">No sources have been approved for public display yet.</p>
        </div>
      </details>
    );
  }

  return (
    <details
      className="disclosure sources-section"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary>
        Evidence &amp; Selected Sources
        <span className="summary-count">{sources.length} selected sources</span>
      </summary>
      <div className="disclosure-body">
        <p className="sources-intro">
          Representative references supporting the public analysis are provided
          below. These sources support specific evidence inputs; the resulting
          Classical–Quantum Pursuit Profile is an analysis produced by Universum
          Labs.
        </p>
        {meta && (
          <div className="evidence-meta" role="note">
            <span>Evidence last reviewed {meta.lastReviewed}</span>
            <span>{meta.publicVersion}</span>
            <span>{sources.length} selected sources</span>
            <span>Representative, not exhaustive</span>
          </div>
        )}
        {meta?.mixedEvidenceNote && (
          <div className="mixed-evidence">
            <IconAlert size={14} />
            <div>
              <b>Evidence is mixed.</b> {meta.mixedEvidenceNote}
            </div>
          </div>
        )}
        {meta && meta.limitations.length > 0 && (
          <>
            <div className="mini-title">Known evidence limitations</div>
            <ul className="bullets" style={{ marginBottom: 12 }}>
              {meta.limitations.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </>
        )}

        <div className="source-list-grid">
          {sources.map((s, i) => (
            <SourceCard
              key={s.id}
              s={s}
              n={i + 1}
              highlighted={highlightedId === s.id}
              onOpen={() => onOpenSource(s.id)}
            />
          ))}
        </div>

        <div className="ul-cta">
          <div>
            <b>Explore the expanded evidence record on Universum Labs</b>
            <p className="rail-note" style={{ margin: "4px 0 0" }}>
              Universum Labs maintains a broader, versioned evidence record,
              including additional references, evidence comparisons and updated
              analysis.
            </p>
          </div>
          {ulUrl ? (
            <a
              className="mini-btn primary"
              href={ulUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the expanded evidence record on the Universum Labs platform (opens external site)"
            >
              Open on Universum Labs <IconExternal size={12} />
            </a>
          ) : (
            <span
              className="mini-btn cta-placeholder"
              role="note"
              aria-label="Demo placeholder: the Universum Labs platform link is not configured in this build"
            >
              Demo placeholder — platform link not configured
            </span>
          )}
        </div>
        {!UL_PLATFORM_BASE_URL && (
          <p className="rail-note" style={{ marginTop: 6 }}>
            In production this links to the corresponding Universum Labs use-case
            record, preserving use case, jurisdiction, domain and time horizon.
          </p>
        )}
      </div>
    </details>
  );
}
