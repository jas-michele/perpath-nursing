import { Request, Response } from "express";
import { chatWithCareerCoach } from "../services/aiService";
import {
    getConversation,
    saveConversation 
} from "../services/conversationService"

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

        conversation.messages.push({
            role: "assistant",
            content: reply,
        })

        await saveConversation(userId, conversation.messages);

        return res.status(200).json({
            success: true,
            reply
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to communicate with AI."
        })
    }
}