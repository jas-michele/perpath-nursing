import openai from "../config/openai";
import { careerCoachPrompt } from "../prompts/careerCoachPrompt";

export const chatWithCareerCoach = async (
    messages: { role: "user" | "assistant"; content: string}[]
) => {

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
            {
                role: "system",
                content: careerCoachPrompt,
            },
            ...messages,
        ]
    })

    return response.choices[0].message.content ?? ""
}