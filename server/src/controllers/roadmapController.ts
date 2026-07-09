import { Request, Response } from "express";
import User from "../models/User";
import Roadmap from "../models/Roadmap";

import { generateRoadmap } from "../services/roadmapService";


export const generateUserRoadmap = async (
    req: Request,
    res: Response,
) => {
    try{
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

    const roadmapJSON = await generateRoadmap(learnerProfile);

    const roadmap = JSON.parse(roadmapJSON);

    const savedRoadmap = await Roadmap.findOneAndUpdate(
        { user: userId},
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