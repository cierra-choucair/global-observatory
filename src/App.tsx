import { CompareView } from "./components/CompareView";
import { AboutView } from "./components/AboutView";
import { BriefsView } from "./components/BriefsView";
import { ContributeView } from "./components/ContributeView";
import { MapView } from "./components/MapView";
import { RepositoryView } from "./components/RepositoryView";
import { UseCaseDetail } from "./components/UseCaseDetail";
import { SAMPLE_DISCLOSURE } from "./data/labels";
import { USE_CASES, useCaseById } from "./data/useCases";
import { navigate, useRoute } from "./router";
import { AppStateProvider, useAppState } from "./state";

const NAV = [
  { path: "use-cases", label: "Use Cases" },
  { path: "map", label: "Global Map" },
  { path: "compare", label: "Compare" },
  { path: "briefs", label: "Policy Briefs" },
  { path: "about", label: "About / Data Notes" },
];

function Shell() {
  const route = useRoute();
  const { brief } = useAppState();
  const section = route[0] || "use-cases";
  const briefCount = brief.useCaseIds.length + brief.domains.length;

  let content: React.ReactNode;
  if (section === "use-cases" && route[1]) {
    const uc = useCaseById(route[1]);
    content = uc ? (
      <UseCaseDetail
        uc={uc}
        related={uc.related
          .map((id) => USE_CASES.find((u) => u.id === id))
          .filter((u): u is (typeof USE_CASES)[number] => !!u)}
      />
    ) : (
      <div className="empty-state">Use case not found.</div>
    );
  } else if (section === "map") {
    content = <MapView />;
  } else if (section === "compare") {
    content = <CompareView preselect={route[1]} />;
  } else if (section === "briefs") {
    content = <BriefsView />;
  } else if (section === "about") {
    content = <AboutView />;
  } else if (section === "contribute") {
    content = <ContributeView />;
  } else {
    content = <RepositoryView />;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead no-print">
        <div className="masthead-inner">
          <div className="masthead-top">
            <div>
              <h1>Global Quantum Use Case &amp; Readiness Observatory</h1>
              <div className="org">
                International Telecommunication Union · Classical–Quantum
                analysis provided by Universum Labs
              </div>
            </div>
            <span className="demo-chip">FUNCTIONAL DEMO · SAMPLE DATA</span>
          </div>
          <nav aria-label="Primary">
            {NAV.map((n) => (
              <button
                key={n.path}
                className={section === n.path ? "active" : ""}
                aria-current={section === n.path ? "page" : undefined}
                onClick={() => navigate(`/${n.path}`)}
              >
                {n.label}
                {n.path === "briefs" && briefCount > 0 && (
                  <span className="nav-count" aria-label={`${briefCount} items selected`}>
                    {briefCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="page" id="main">
        {content}
      </main>

      <footer className="footer no-print">
        {SAMPLE_DISCLOSURE} Classical–Quantum analysis provided by Universum
        Labs; the analysis methodology is proprietary and not distributed with
        this application.
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  );
}
