import openai from "../config/openai";
import { roadmapPrompt } from "../prompts/roadmapPrompt";
import Roadmap from "../models/Roadmap";
import { chunkDocument } from "./chunkService";
import { retrieveRelevantChunks } from "./ragService";

export const generateRoadmap = async (
    profile: any,
    rubricText?: string

) => {
    let relevantRubricContent = "";

    if (rubricText) {
        const chunks = chunkDocument(rubricText);

        const relevantChunks = retrieveRelevantChunks(profile, chunks);
        
        relevantRubricContent = relevantChunks.join("\n\n");

    }

    const prompt = roadmapPrompt(profile, relevantRubricContent);

   
    

 
   

    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: roadmapPrompt(profile, relevantRubricContent),
            },
        ],
    });

    const roadmap = completion.choices[0].message.content;

    if (!roadmap) {
        throw new Error("Failed to generate roadmap.");
    }

    return roadmap;
}

export const getRoadmapByUserId = async (userId: string) => {
    return await Roadmap.findOne({
        user: userId
    });
}