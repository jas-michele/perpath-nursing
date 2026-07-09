import { Router } from "express";
import { generateUserRoadmap } from "../controllers/roadmapController";
import  authMiddleware  from "../middleware/auth";

const router = Router();

router.post("/generate", authMiddleware, generateUserRoadmap);

export default router;