import { Request, Response } from "express";
import { chatWithCareerCoach } from "../services/aiService";
import {
    getConversation,
    saveConversation 
} from "../services/conversationService";
import { 
    isProfileComplete,
    extractProfileJSON,
    parseProfile,
    updateUserProfile
 } from "../services/profileService";

 
export const chatWithAI = async (
    req: Request,
    res: Response
) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            })
        }

        const userId = (req as any).user.id;

        const conversation = await getConversation(userId);

        conversation.messages.push({
            role: "user",
            content: message,
        })

        const reply = await chatWithCareerCoach(conversation.messages);

        const completed = isProfileComplete(reply);


        conversation.messages.push({
            role: "assistant",
            content: reply,
        })

        await saveConversation(userId, conversation.messages);


        if (completed) {
            const profileJSON = extractProfileJSON(reply);

            const profile = parseProfile(profileJSON);

            await updateUserProfile(userId, profile);
        }

        return res.status(200).json({
            success: true,
            completed,
            message: completed
                ? "Career assessment completed successfully."
                : reply,    
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to communicate with AI."
        })
    }
}