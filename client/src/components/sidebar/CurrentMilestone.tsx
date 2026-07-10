import "./CurrentMilestone.css";
import {  Clock, ArrowRight } from "lucide-react";

type CurrentMilestoneProps = {
  roadmap: any;
};


function CurrentMilestone({
  roadmap,
}: CurrentMilestoneProps){

    const currentMilestone =
    roadmap.milestones.find((m: any) => !m.completed) ??
    roadmap.milestones[0];

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

        <ul>
          <li>Components</li>
          <li>Props</li>
          <li>State</li>
          <li>Hooks</li>
          <li>Context API</li>
        </ul>

        <div className="info-row">
          <Clock size={18}/>
          <span>Estimated: 1 Week</span>
        </div>

        <div className="divider"></div>

        <div className="next-up">
          <ArrowRight size={18}/>
          <span>Next: Node.js</span>
        </div>

      </div>

    </div>
  );
}

export default CurrentMilestone;