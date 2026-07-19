/** Observatory analysis facade.
 *
 *  In production this module fronts the Universum Labs analysis service:
 *  requests carry (geography, scope, horizon) and responses carry ONLY the
 *  minimal public result object (category, display band, confidence,
 *  evidence status, up to three drivers, explanation, dates, version).
 *  Weights, formulas, thresholds, gate results and calculation traces never
 *  leave the service.
 *
 *  In this demo the facade resolves the same minimal objects from the
 *  synthetic sample dataset; the interface is what a backend would honor. */

import { COUNTRIES, countryByIso } from "../data/countries";
import { USE_CASES, useCaseById } from "../data/useCases";
import type {
  CountryProfile,
  DomainId,
  DomainOutlook,
  HorizonId,
  PursuitProfilePublic,
  UseCasePublic,
} from "../types";

export interface AnalysisResult {
  geographyId: string | null;
  scope: { type: "use-case" | "domain"; id: string };
  horizon: HorizonId;
  profile: PursuitProfilePublic;
  /** Country-specific note where a local analysis exists. */
  localNote?: string;
  /** True when no country-specific analysis exists and the global result is shown. */
  globalFallback: boolean;
}

export function getUseCases(): UseCasePublic[] {
  return USE_CASES;
}

export function getCountries(): CountryProfile[] {
  return COUNTRIES;
}

/** Resolve the public analysis for a use case, optionally under a country. */
export function getUseCaseAnalysis(
  useCaseId: string,
  geographyId: string | null,
  horizon?: HorizonId,
): AnalysisResult | null {
  const uc = useCaseById(useCaseId);
  if (!uc) return null;
  const profile =
    (horizon && uc.profiles.find((p) => p.horizon === horizon)) || uc.profiles[0];

  const country = geographyId ? countryByIso(geographyId) : undefined;
  const note = country?.countryUseCaseNotes.find((n) => n.useCaseId === useCaseId);

  return {
    geographyId,
    scope: { type: "use-case", id: useCaseId },
    horizon: profile.horizon,
    profile: note?.category ? { ...profile, category: note.category } : profile,
    localNote: note?.note,
    globalFallback: !!geographyId && !note,
  };
}

/** Resolve the public domain-level outlook for a country. */
export function getDomainOutlook(
  geographyId: string,
  domain: DomainId,
): DomainOutlook | null {
  const country = countryByIso(geographyId);
  return country?.outlooks.find((o) => o.domain === domain) ?? null;
}
