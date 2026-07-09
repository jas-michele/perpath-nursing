import openai from "../config/openai";
import { roadmapPrompt } from "../prompts/roadmapPrompt";

export const generateRoadmap = async (profile: any) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: roadmapPrompt(profile)
            },
        ],
    });

    const roadmap = completion.choices[0].message.content;

    if (!roadmap) {
        throw new Error("Failed to generate roadmap.");
    }

    return roadmap;
}