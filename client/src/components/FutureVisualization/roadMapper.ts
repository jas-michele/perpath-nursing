import type { Node, Edge } from "@xyflow/react";

export function mapRoadmapToFlow(roadmap: any) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
        id: "start",
        type: "milestone",
        position: { x: 250, y: 0 },
        data: {
            title: "Today",
            progress: 100,
            status: "complete",
        },
    });

    roadmap.milestones.forEach((milestone: any, index: number) => {

        const id = `m-${index}`;

        nodes.push({
            id,
            type: "milestone",
            position: {
                x: 250,
                y: (index + 1) * 180,
            },

            data: {
                title: milestone.title,
                progress: milestone.completed ? 100 : 35,
                status: milestone.completed ? "complete" : "active",
            },
        });

        edges.push({
            id: `e-${index}`,
            source: index === 0 ? "start" : `m-${index - 1}`,
            target: id,
            animated: true,
        });
    });

    return { nodes, edges };
}