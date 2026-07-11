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
            firstName: user.firstName,
            
            careerGoal: user.careerGoal,
            experienceLevel: user.experienceLevel,
            weeklyStudyHours: user.weeklyStudyHours,
            technicalSkills: user.technicalSkills,
            technicalConfidence: user.technicalConfidence,
            currentModule: user.currentModule,
            biggestLearningObstacle: user.biggestLearningObstacle,
        }

        let rubricText = "";

        if (req.file) {
            rubricText = await extractPDFText(req.file.path);
        }

        const roadmapJSON = await generateRoadmap(
            learnerProfile,
            rubricText
        );

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

export const completeMilestone = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = (req as any).user.id;
        const { milestoneId } = req.params;

        const roadmap = await Roadmap.findOne({ user: userId });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found."
            });
        }

        const milestone = roadmap.milestones.id(milestoneId as string);

        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: "Milestone not found."
            });
        }

        milestone.completed = true;

        await roadmap.save();

        return res.json({
            success: true,
            roadmap
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to complete milestone."
        });
    }
};