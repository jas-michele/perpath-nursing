import "./RoadmapNode.css";
import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

type RoadmapNodeProps = {
  title: string;
  subtitle: string;
  status: "completed" | "current" | "upcoming";
};

function RoadmapNode({
  title,
  subtitle,
  status,
}: RoadmapNodeProps) {
  return (
    <div className={`roadmap-node ${status}`}>

      <div className="node-header">

        <span className="node-number">
          {title}
        </span>

        {status === "completed" ? (
          <CheckCircle2 size={18} />
        ) : (
          <Circle size={18} />
        )}

      </div>

      <h3 className="node-title">
        {subtitle}
      </h3>

      <p className="node-category">
        Frontend Library
      </p>

      <span className={`node-status ${status}`}>
        {status.toUpperCase()}
      </span>

    </div>
  );
}

export default RoadmapNode;