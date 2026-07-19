import type { PursuitCategory } from "../types";

export interface ActionSet {
  near: string[];
  medium: string[];
  longer: string[];
}

/** Public-facing recommended-action templates by pursuit category.
 *  Policy language only — no thresholds or scoring internals. */
export const ACTION_LIBRARY: Record<PursuitCategory, ActionSet> = {
  quantum: {
    near: [
      "Initiate procurement through standard channels, aligned with applicable certification schemes",
      "Define acceptance testing and operational monitoring requirements before deployment",
    ],
    medium: [
      "Integrate the capability into national assurance and audit frameworks",
      "Review vendor diversity and continuity-of-supply arrangements",
    ],
    longer: ["Track certification-scheme evolution and refresh procurement standards accordingly"],
  },
  hybrid: {
    near: [
      "Commission a bounded pilot with explicit success criteria and a defined decision point",
      "Secure cloud access and workforce arrangements needed to run the pilot credibly",
    ],
    medium: [
      "Scale successful pilots through industrial or research partnerships",
      "Feed pilot results back into the national evidence base",
    ],
    longer: ["Reassess the pathway as hardware generations and workflow economics evolve"],
  },
  validation: {
    near: [
      "Commission one independent, decisive benchmark against the strongest credible classical baseline",
      "Require disclosure of benchmark conditions and baseline tuning in any procurement discussion",
    ],
    medium: [
      "Act on the benchmark outcome: proceed to a bounded pilot, or adopt the classical alternative",
    ],
    longer: ["Re-run the validation when a defined technology or evidence trigger is met"],
  },
  research: {
    near: [
      "Establish a staged research program with explicit milestones and termination criteria",
      "Prioritize workforce development and international research partnerships",
    ],
    medium: [
      "Participate in standards development and shared research infrastructure",
      "Review program milestones against the published re-assessment triggers",
    ],
    longer: ["Position for translation to validation or pilots if milestone evidence accumulates"],
  },
  prepare: {
    near: [
      "Inventory relevant national assets (fiber, facilities, skills) that lower future entry costs",
      "Establish partnerships that provide access without near-term capital commitment",
    ],
    medium: [
      "Develop certification, procurement and regulatory groundwork ahead of need",
      "Maintain a monitored watchlist of the technology triggers that would change the assessment",
    ],
    longer: ["Revisit the investment case when named crossover conditions are observed"],
  },
  monitor: {
    near: [
      "Assign ownership for tracking the published re-assessment triggers",
      "Keep procurement decisions on the classical pathway with confidence",
    ],
    medium: ["Review the assessment at the published cadence or upon a trigger event"],
    longer: ["No dedicated investment indicated unless triggers are met"],
  },
  classical: {
    near: [
      "Continue investment in the classical pathway, which meets the requirement",
      "Document the specific triggers that would warrant re-assessment",
    ],
    medium: ["Maintain periodic review against the published triggers"],
    longer: ["No quantum-specific investment indicated for this application"],
  },
  insufficient: {
    near: [
      "Defer assessment-based decisions; the evidence base does not yet support them",
      "Identify and, where appropriate, commission the specific studies that would close the evidence gap",
    ],
    medium: ["Re-assess when the named evidence gaps are addressed"],
    longer: ["Treat vendor projections with caution until independently validated"],
  },
};
