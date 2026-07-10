import "./CurrentMilestone.css";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

function CurrentMilestone() {
  return (
    <div className="current-panel">

      <div className="panel-title">
        CURRENT MILESTONE
      </div>

      <div className="milestone-card">

        <h2>React</h2>

        <p className="subtitle">
          Frontend Library
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