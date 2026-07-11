import { Handle, Position } from "@xyflow/react";
import astronaut from "../../assets/space/astro.png"
import "./MilestoneNode.css";

type MilestoneNodeProps = {
    data: {
        milestoneId: string;
        title: string;
        description?: string;
        estimatedDuration?: string;
        progress?: number;
        status: "complete" | "current" | "future";
        onComplete: (id: string) => void;
    };
};

export default function MilestoneNode({ data }: MilestoneNodeProps) {
    console.log(data.title, data);
    const icon =
        data.status === "complete"
            ? "✅"
            : data.status === "current"
                ? "🚀"
                : "🎯";

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                style={{ opacity: 0, pointerEvents: "none" }}
            />

            <div className={`milestone-node ${data.status}`}>
                <div className="node-header">
                    <span className="node-icon">{icon}</span>

                    <div className="node-title">
                        {data.title}
                    </div>
                </div>

                {data.description && (
                    <div className="node-description">
                        {data.description}
                    </div>
                )}

                {data.estimatedDuration && (
                    <div className="node-duration">
                        ⏱ {data.estimatedDuration}
                    </div>
                )}

                <div className="node-progress">
                    {data.progress ?? 0}% Complete
                </div>

                {data.status === "current" && (
                    <>
                        <img
                            src={astronaut}
                            className="current-astronaut"
                            alt=""
                            aria-hidden="true"
                        />

                        <button
                            className="complete-button"
                            onClick={() => data.onComplete(data.milestoneId)}
                        >
                            Complete Milestone
                        </button>
                    </>
                )}

            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{ opacity: 0, pointerEvents: "none" }}
            />
        </>
    );
}