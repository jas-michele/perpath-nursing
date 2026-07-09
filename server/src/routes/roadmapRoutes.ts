import { Router } from "express";
import { generateUserRoadmap, getRoadmap } from "../controllers/roadmapController";
import  authMiddleware  from "../middleware/auth";

const router = Router();

router.post("/generate", authMiddleware, generateUserRoadmap);

router.get("/", authMiddleware, getRoadmap);

export default router;