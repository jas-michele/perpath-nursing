import "./CurrentMilestone.css";
import { useNavigate } from "react-router-dom"
import { Clock, ArrowRight } from "lucide-react";

type CurrentMilestoneProps = {
  roadmap: any;
};


function CurrentMilestone({
  roadmap,
}: CurrentMilestoneProps) {

  if (!roadmap?.milestones?.length) {
    return null;
  }

  const currentMilestone =
    roadmap.milestones.find((m: any) => !m.completed) ??
    roadmap.milestones[0];

  const currentIndex = roadmap.milestones.indexOf(currentMilestone);

  const nextMilestone =
    roadmap.milestones[currentIndex + 1];

    const navigate = useNavigate();

  return (
    <div className="current-panel">

      <div className="panel-title">
        CURRENT MILESTONE
      </div>

      <div className="milestone-card">

        <h2>{currentMilestone.title}</h2>

        <p className="subtitle">
          {currentMilestone.description}
        </p>

        <div className="divider"></div>

        <h4>Key Topics</h4>



        <div className="info-row">
          <Clock size={18} />
          <span>Estimated: {roadmap.estimatedDuration}
          </span>
        </div>

        <div className="divider"></div>

        <div className="next-up">
          <ArrowRight size={18} />
          <span>
            <div className="next-up">
              <ArrowRight size={18} />
              <span>
                Next: {nextMilestone?.title ?? "Complete roadmap"}
              </span>
            </div>
          </span>
        </div>

        <div className="coach-card">
          <span className="coach-label">Need guidance?</span>
          <p>Ask PerPath AI about your current roadmap or next milestone.</p>

          <button className="chat-nav-btn" onClick={() => navigate("/ai-coach")}>
            Return to Command Center →
          </button>
        </div>

      </div>

    </div>
  );
}

export default CurrentMilestone;