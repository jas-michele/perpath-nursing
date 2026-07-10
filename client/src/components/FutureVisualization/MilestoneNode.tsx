import { Handle, Position } from "@xyflow/react";
import "./MilestoneNode.css"

type MilestoneNodeProps = {
    data: {
        title: string;
        progress?: number;
    };
};

export default function MilestoneNode({ data }: MilestoneNodeProps) {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                style={{ opacity: 0, pointerEvents: "none" }}
            />

            <div className="milestone-node">
                <div className="node-title">{data.title}</div>

                <div className="node-progress">
                    {data.progress ?? 0}% Complete
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{ opacity: 0, pointerEvents: "none" }}
            />
        </>
    );
}