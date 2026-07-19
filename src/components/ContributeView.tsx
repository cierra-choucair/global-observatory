import { navigate } from "../router";
import { IconAlert } from "./icons";

/** Non-functional placeholder for the authenticated contributor workflow.
 *  Kept on a separate route so editing controls never mix into the public UI. */
export function ContributeView() {
  return (
    <div className="contribute">
      <div className="page-head">
        <div>
          <h2>Contributor access</h2>
          <p className="page-sub">
            Add or update country data collected through the ITU Quantum Road
            Tour.
          </p>
        </div>
      </div>

      <div className="panel placeholder-panel">
        <div className="placeholder-flag">
          <IconAlert size={16} />
          Placeholder — not functional in this demonstration
        </div>
        <p>
          In the full Observatory, accredited contributors sign in here to submit
          capability updates: hardware availability, workforce and research
          ecosystem, infrastructure, institutional capacity, standards activity,
          programs and deployments. Submissions carry the contributing
          institution's type, are timestamped, and enter a validation queue
          before publication (verified / self-reported / pending validation).
        </p>
        <p>
          Authentication, submission forms and the validation workflow are out of
          scope for this demo build. The public data model already records Road
          Tour contribution status per country, so contributed data will surface
          without interface changes.
        </p>
        <button className="mini-btn" onClick={() => navigate("/map")}>
          Back to the Global Map
        </button>
      </div>
    </div>
  );
}
