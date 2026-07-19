import { useEffect, useState } from "react";

/** Minimal hash router: "#/use-cases/sec-qrng" → ["use-cases", "sec-qrng"]. */
export function parseHash(): string[] {
  const h = window.location.hash.replace(/^#\/?/, "");
  return h ? h.split("/").map(decodeURIComponent) : ["use-cases"];
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith("/") ? `#${path}` : `#/${path}`;
}

export function useRoute(): string[] {
  const [route, setRoute] = useState<string[]>(parseHash);
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
