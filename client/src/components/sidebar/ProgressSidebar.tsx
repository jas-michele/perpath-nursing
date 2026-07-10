import "./ProgressSidebar.css";
import { User, Target, Clock } from "lucide-react";

type ProgressSidebarProps = {
  user: {
    name: string;
    careerGoal: string;
  };
  roadmap: {
    estimatedDuration: string;
    milestones: {
      completed: boolean;
    }[];
  };
};

function ProgressSidebar({
  user,
  roadmap,
}: ProgressSidebarProps) {
  const completed = roadmap.milestones.filter(
    (m) => m.completed
  ).length;

  const total = roadmap.milestones.length;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="progress-sidebar">

      <div className="profile-card">

        <div className="avatar">
          <User size={60} />
        </div>

        <h2>{user.name}</h2>

        <p className="career-goal">
          {user.careerGoal}
        </p>

      </div>

      <div className="progress-section">

        <h3>Progress</h3>

        <div className="progress-ring">
          <span>{progress}%</span>
        </div>

        <p>
          {completed} / {total} Milestones
        </p>

      </div>

      <div className="stats">

        <div className="stat">
          <Target size={18} />
          <span>Goal: {user.careerGoal}</span>
        </div>

        <div className="stat">
          <Clock size={18} />
          <span>{roadmap.estimatedDuration}</span>
        </div>

      </div>

      <div className="quote">
        "Every line of code you write builds your future."
      </div>

    </div>
  );
}

export default ProgressSidebar;