import RoadmapNode from "./RoadmapNode";
import "./RoadmapMap.css";

function RoadmapMap() {
  const milestones = [
    { id: 1, title: "HTML & CSS", status: "completed", side: "left" },
    { id: 2, title: "JavaScript", status: "completed", side: "right" },
    { id: 3, title: "React", status: "current", side: "left" },
    { id: 4, title: "Node.js", status: "upcoming", side: "right" },
    { id: 5, title: "MongoDB", status: "upcoming", side: "left" },
    { id: 6, title: "AI Projects", status: "upcoming", side: "right" },
    { id: 7, title: "Deploy", status: "upcoming", side: "left" },
  ] as const;

  return (
    <div className="roadmap-journey">

      <div className="goal-node">
        <div className="goal-icon">🏆</div>
        <h2>AI Software Engineer</h2>
      </div>

      <div className="journey-path">

        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`journey-step ${milestone.side}`}
          >
            <RoadmapNode
              title={milestone.id.toString()}
              subtitle={milestone.title}
              status={milestone.status}
            />
          </div>
        ))}

      </div>

      <div className="journey-start">
        START
      </div>

    </div>
  );
}

export default RoadmapMap;