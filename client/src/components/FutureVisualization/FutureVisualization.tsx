import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { mapRoadmapToFlow } from "./roadMapper";


import "@xyflow/react/dist/style.css"

import MilestoneNode from "./MilestoneNode";

const nodeTypes = {
  milestone: MilestoneNode,
};

type FutureVisualizationProps = {
  roadmap: any;
}


export default function FutureVisualization({
  roadmap,
}: FutureVisualizationProps) {
 

  if (!roadmap) {
    return (
      <div style={{ color: "white", padding: "2rem" }}>
        Initializing Future Visualization...
      </div>
    );
  }

  const { nodes, edges } = mapRoadmapToFlow(roadmap);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        {/* <MiniMap /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
}

