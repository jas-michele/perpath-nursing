import "./ProgressSidebar.css";
import { User, Target, Clock } from "lucide-react";

function ProgressSidebar() {
  return (
    <div className="progress-sidebar">

      <div className="profile-card">

        <div className="avatar">
          <User size={60} />
        </div>

        <h2>Jasmine</h2>

        <p className="career-goal">
          AI Software Engineer
        </p>

      </div>

      <div className="progress-section">

        <h3>Progress</h3>

        <div className="progress-ring">
          <span>35%</span>
        </div>

        <p>3 / 9 Milestones</p>

      </div>

      <div className="stats">

        <div className="stat">
          <Target size={18} />
          <span>Goal: SWE</span>
        </div>

        <div className="stat">
          <Clock size={18} />
          <span>8 Months</span>
        </div>

      </div>

      <div className="quote">
        "Every line of code you write builds your future."
      </div>

    </div>
  );
}

export default ProgressSidebar;