# Global Quantum Use Case & Readiness Observatory — Functional Demo

Interactive demonstration of the **ITU Global Quantum Use Case & Readiness
Observatory** — a policy-oriented repository for exploring quantum use cases,
understanding national and regional capabilities, comparing classical and
quantum pathways, and generating policy briefs.

Classical–Quantum analysis provided by **Universum Labs**.

> **All data is sample data.** Use-case assessments, country profiles,
> sources and Road Tour records in this build are illustrative content
> authored for demonstration. Nothing here is a real evaluation of any
> technology or country.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build`, then `npm run preview`.
Fully static — no backend, no external requests (the world map ships with the
bundle). Deploys directly to any static host, including Vercel.

## The three pillars

1. **Use Case Repository** (default landing) — searchable, filterable catalog
   of nine use cases across three demonstration domains (Quantum-Safe
   Communications & Security; Molecular & Materials Simulation; Energy), each
   with a public Classical–Quantum Pursuit Profile, evidence status,
   confidence band, maturity, time horizon and geographic coverage.
2. **Global Map** — interactive world map with an explicit data-coverage
   overlay, country search, and a side drawer showing national capabilities
   (as descriptive bands), three domain-level Classical–Quantum outlooks,
   relevant use cases, ITU Quantum Road Tour status, and sources.
3. **Policy Brief Generator** — six-step workflow (geography, audience,
   domains/use cases, local context, analysis, preview) producing an
   evidence-labeled, editable brief with PDF export (print dialog), draft
   saving, and actions organized by time horizon.

Plus: **Compare** (country-vs-country and use-case comparison) and
**About / Data Notes** (provenance labels, dataset versioning, Road Tour).

## IP boundary

The Universum Labs Classical–Quantum Pursuit Framework is treated as a
protected analytical service:

- The client ships **only final public outputs**: pursuit categories, rounded
  spectrum positions with uncertainty ranges, confidence bands, evidence
  labels, up to three plain-language drivers, dates and versions.
- No weights, formulas, thresholds, multipliers, gate logic, intermediate
  values or scoring code exist anywhere in the frontend source or bundle.
- `src/services/observatory.ts` is the seam where the real managed analysis
  service plugs in; its interface returns the same minimal result objects the
  demo resolves from sample data.
- A "How to read the analysis" explainer describes what the outputs mean —
  never how they are computed.

## Code map

```
src/
  types.ts               public data schema (final outputs only)
  data/                  sample dataset: use cases, countries, labels, actions
  services/observatory.ts  analysis-service facade (backend seam)
  components/            repository, detail, map, drawer, compare, briefs, about
  router.ts / state.tsx  hash routing + cross-page selection state
```

The schema supports manual curation now and automated ingestion later
(versioning, provenance, Road Tour contribution status per record) without
interface redesign. To extend the dataset, edit the files in `src/data/`.
