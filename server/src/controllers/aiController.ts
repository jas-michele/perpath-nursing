import { Request, Response } from "express";
import { chatWithCareerCoach } from "../services/aiService";
import { success } from "zod";

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

        const reply = await chatWithCareerCoach([
            {
                role: "user",
                content: message,
            }
        ]);

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