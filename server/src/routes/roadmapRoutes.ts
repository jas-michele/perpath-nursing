import { Router } from "express";
import { generateUserRoadmap, getRoadmap, completeMilestone } from "../controllers/roadmapController";
import  authMiddleware  from "../middleware/auth";
import multer from "multer";

const upload = multer({
    dest: "uploads/",
});

const router = Router();

router.post(
    "/generate",
    authMiddleware,
    upload.single("rubric"),
    generateUserRoadmap
)

router.patch(
    "/milestones/:milestoneId/complete",
    authMiddleware,
    completeMilestone
);

router.get("/", authMiddleware, getRoadmap);

export default router;