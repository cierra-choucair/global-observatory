# Global Quantum Use Case & Readiness Observatory — Functional Demo

Interactive demonstration of the **ITU Global Quantum Use Case & Readiness
Observatory**, powered by the **Universum Labs Classical–Quantum Pursuit
Framework v1.0**. Built for the UAE funding pitch.

> **All data is sample data.** The nine use-case evaluations, jurisdiction
> profiles, evidence claims and sources are illustrative, authored to
> demonstrate functionality. They are not real assessments. The scoring
> *methodology* is the real v1.0 specification.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build` then `npm run preview`.
No backend, no external services — everything runs in the browser.

## What the demo shows

**Three launch domains, nine use cases** — chosen so every decision lane in
the framework appears at least once:

| Domain | Use case | Global lane (current) |
|---|---|---|
| Security & Comms | QRNG for national root-of-trust | Production deployment |
| Security & Comms | Metropolitan QKD backbone vs. PQC | Prepare / partner |
| Security & Comms | Quantum network testbed | Priority research |
| Molecules & Materials | Green ammonia catalyst discovery | Priority research → *validation under FTQC* |
| Molecules & Materials | Battery electrolyte (hybrid pipeline) | Operational pilot |
| Molecules & Materials | CO₂ capture sorbent screening | Monitor |
| Energy | National grid unit commitment | Classical default |
| Energy | District cooling optimization | Targeted validation |
| Energy | Energy portfolio risk (QAE) | **Insufficient evidence** |

**Live functionality**

- **G-QPS / L-QPS** with conservative interval propagation (Part 4.4) —
  intervals are always shown; a verdict is robust only when the whole interval
  sits on one side of a materiality boundary.
- **Jurisdiction switcher** (UAE featured, plus Switzerland, Singapore, Kenya,
  Brazil): local weight derivation with bounded condition/priority multipliers
  (Part 6), local Access Readiness, and ROV strategic-alignment adjustments.
  The same use case lands in different lanes in different jurisdictions.
- **Scenario keyframes** (Current / Near-term / Application-relevant FTQC,
  Part 10): watch the ammonia case cross from research into targeted
  validation only under the FTQC keyframe.
- **What-if panel**: drag priority multipliers (0.75–1.50) and watch weights
  renormalize, scores move and lanes flip across the whole portfolio.
- **Gate layer** (Part 3), **evidence tags** (demonstrated / modeled /
  community / vendor / unknown, Part 9), **coverage floor** — the QAE case
  demonstrates the framework refusing to issue a recommendation below 70%
  weighted evidence coverage.

## Code map

```
src/
  framework/spec.ts     v1.0 constants: weights, bands, lanes, gates, tags
  framework/engine.ts   scoring engine: utilities, QPS, ARS, ROV, ECI,
                        local weight derivation, decision-lane rules
  data/                 sample use cases (per domain) + jurisdiction profiles
  components/           portfolio, detail (Pursuit Profile), what-if, methodology
```

To swap in real data, replace the files in `src/data/` — the engine and UI are
data-driven and need no changes.
