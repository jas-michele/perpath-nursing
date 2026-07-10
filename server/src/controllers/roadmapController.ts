import { Request, Response } from "express";
import User from "../models/User";
import Roadmap from "../models/Roadmap";

import { generateRoadmap, getRoadmapByUserId } from "../services/roadmapService";

import { extractPDFText } from "../services/pdfService";
import { success } from "zod";

export const generateUserRoadmap = async (
    req: Request,
    res: Response,
) => {
    try {
        const userId = (req as any).user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        const learnerProfile = {
            careerGoal: user.careerGoal,
            experienceLevel: user.experienceLevel,
            weeklyStudyHours: user.weeklyStudyHours,
            technicalSkills: user.technicalSkills,
            technicalConfidence: user.technicalConfidence,
            currentModule: user.currentModule,
            biggestLearningObstacle: user.biggestLearningObstacle,
        }

        console.log("Content-Type:", req.headers["content-type"]);
console.log("FILE:", req.file);
console.log("BODY:", req.body);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Rubric PDF is required"
            })
        }

        const rubricText = await extractPDFText(req.file.path)

        const roadmapJSON = await generateRoadmap(learnerProfile, rubricText);

        const cleanedRoadmap = roadmapJSON
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const roadmap = JSON.parse(cleanedRoadmap);

        const savedRoadmap = await Roadmap.findOneAndUpdate(
            { user: userId },
            {
                user: userId,
                ...roadmap,
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        return res.status(201).json({
            success: true,
            roadmap: savedRoadmap,
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate roadmap."
        })
    }
}

export const getRoadmap = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        console.log("Authenticated user", userId);

        const roadmap = await getRoadmapByUserId(userId);

        console.log("Roadmap found:", roadmap)

        

        if (!roadmap) {
            res.status(404).json({
                success: false,
                message: "Roadmap not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            roadmap,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve roadmap."
        })
    }
}