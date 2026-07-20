/** Application configuration.
 *
 *  UL_PLATFORM_BASE_URL configures the deep link to the Universum Labs
 *  evidence platform. Set VITE_UL_PLATFORM_BASE_URL at build time; when
 *  unset (as in this demo), the UI shows a clearly labeled placeholder
 *  instead of a broken link. */

export const UL_PLATFORM_BASE_URL: string | undefined =
  import.meta.env.VITE_UL_PLATFORM_BASE_URL || undefined;

export function ulUseCaseUrl(params: {
  useCaseId: string;
  jurisdiction?: string | null;
  domain: string;
  horizon: string;
}): string | undefined {
  if (!UL_PLATFORM_BASE_URL) return undefined;
  const q = new URLSearchParams({ domain: params.domain, horizon: params.horizon });
  if (params.jurisdiction) q.set("jurisdiction", params.jurisdiction);
  return `${UL_PLATFORM_BASE_URL.replace(/\/$/, "")}/observatory/use-cases/${encodeURIComponent(
    params.useCaseId,
  )}?${q.toString()}`;
}
