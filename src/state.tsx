import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { BriefAudience, BriefDraft, DomainId } from "./types";

const DRAFT_KEY = "observatory-brief-draft";

const EMPTY_DRAFT: BriefDraft = {
  geoId: null,
  audience: null,
  useCaseIds: [],
  domains: [],
  title: "",
  executiveSummary: "",
};

interface AppState {
  /** Country selected on the map / carried across views (ISO3). */
  selectedCountry: string | null;
  setSelectedCountry: (iso3: string | null) => void;
  brief: BriefDraft;
  setBriefGeo: (iso3: string | null) => void;
  setBriefAudience: (a: BriefAudience | null) => void;
  toggleBriefUseCase: (id: string) => void;
  toggleBriefDomain: (d: DomainId) => void;
  updateBrief: (patch: Partial<BriefDraft>) => void;
  clearBrief: () => void;
  saveDraft: () => void;
  hasSavedDraft: boolean;
  loadDraft: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [brief, setBrief] = useState<BriefDraft>(EMPTY_DRAFT);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  useEffect(() => {
    try {
      setHasSavedDraft(!!localStorage.getItem(DRAFT_KEY));
    } catch {
      setHasSavedDraft(false);
    }
  }, []);

  const setBriefGeo = useCallback(
    (iso3: string | null) => setBrief((b) => ({ ...b, geoId: iso3 })),
    [],
  );
  const setBriefAudience = useCallback(
    (a: BriefAudience | null) => setBrief((b) => ({ ...b, audience: a })),
    [],
  );
  const toggleBriefUseCase = useCallback(
    (id: string) =>
      setBrief((b) => ({
        ...b,
        useCaseIds: b.useCaseIds.includes(id)
          ? b.useCaseIds.filter((x) => x !== id)
          : [...b.useCaseIds, id],
      })),
    [],
  );
  const toggleBriefDomain = useCallback(
    (d: DomainId) =>
      setBrief((b) => ({
        ...b,
        domains: b.domains.includes(d)
          ? b.domains.filter((x) => x !== d)
          : [...b.domains, d],
      })),
    [],
  );
  const updateBrief = useCallback(
    (patch: Partial<BriefDraft>) => setBrief((b) => ({ ...b, ...patch })),
    [],
  );
  const clearBrief = useCallback(() => setBrief(EMPTY_DRAFT), []);

  const saveDraft = useCallback(() => {
    setBrief((b) => {
      const stamped = { ...b, savedAt: new Date().toISOString() };
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(stamped));
        setHasSavedDraft(true);
      } catch {
        /* storage unavailable — draft stays in memory */
      }
      return stamped;
    });
  }, []);

  const loadDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setBrief({ ...EMPTY_DRAFT, ...(JSON.parse(raw) as BriefDraft) });
    } catch {
      /* ignore corrupt drafts */
    }
  }, []);

  const value = useMemo(
    () => ({
      selectedCountry,
      setSelectedCountry,
      brief,
      setBriefGeo,
      setBriefAudience,
      toggleBriefUseCase,
      toggleBriefDomain,
      updateBrief,
      clearBrief,
      saveDraft,
      hasSavedDraft,
      loadDraft,
    }),
    [
      selectedCountry,
      brief,
      setBriefGeo,
      setBriefAudience,
      toggleBriefUseCase,
      toggleBriefDomain,
      updateBrief,
      clearBrief,
      saveDraft,
      hasSavedDraft,
      loadDraft,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState outside provider");
  return v;
}
