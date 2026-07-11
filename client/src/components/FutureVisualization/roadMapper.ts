import type { Node, Edge } from "@xyflow/react";

export function mapRoadmapToFlow(
    roadmap: any,
    onCompleteMilestone: (id: string) => void

) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const milestones = roadmap?.milestones ?? [];

    const currentIndex = milestones.findIndex(
        (milestone: any) => !milestone.completed
    );

    nodes.push({
        id: "start",
        type: "milestone",
        position: { x: 250, y: 0 },
        data: {
            title: "Today",
            description: "Your career journey starts here.",
            progress: 100,
            status: "complete",
        },
    });

    milestones.forEach((milestone: any, index: number) => {
        const id = `m-${index}`;

        let status = "future";

        if (milestone.completed) {
            status = "complete";
        } else if (index === currentIndex) {
            status = "current";
        }

        const x = index % 2 === 0 ? 150 : 500;

        nodes.push({
            id,
            type: "milestone",
            position: {
                x,
                y: (index + 1) * 220,
            },
            data: {
                milestoneId: milestone._id.toString(),
                title: milestone.title,
                description: milestone.description,
                estimatedDuration: milestone.estimatedDuration,
                progress: milestone.completed ? 100 : 0,
                status,
                onComplete: onCompleteMilestone,
            },
        });

        edges.push({
            id: `e-${index}`,
            source: index === 0 ? "start" : `m-${index - 1}`,
            target: id,
            animated: index === currentIndex,
            type: "smoothstep",
            style: {
                stroke: "#59d7ff",
                strokeWidth: 3,
                strokeLinecap: "round",
            },
        });
    });

    const activeIndex = currentIndex === -1
        ? Math.max(milestones.length - 1, 0)
        : currentIndex;

    const activeX = activeIndex % 2 === 0 ? 150 : 500;
    const activeY = (activeIndex + 1) * 220;

    nodes.push({
        id: "astronaut",
        type: "astronaut",
        position: {
            x: activeX - 130,
            y: activeY + 20,
        },
        data: {},
        draggable: false,
        selectable: false,
        connectable: false,
        zIndex: 20,
    });

    return { nodes, edges, };
}