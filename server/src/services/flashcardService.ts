import openai from "../config/openai";
import { flashcardPrompt } from "../prompts/flashcardPrompt";

export const generateFlashcards = async (
    lessonText: string
) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: flashcardPrompt(lessonText),
            },
        ], 
        
    });

    const flashcards = completion.choices[0].message.content;

    if (!flashcards) {
        throw new Error("Failed to generate flashcards.");
    }

    return JSON.parse(flashcards);
}