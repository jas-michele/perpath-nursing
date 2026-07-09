import { Router } from "express";
import { generateUserRoadmap, getRoadmap } from "../controllers/roadmapController";
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

router.get("/", authMiddleware, getRoadmap);

export default router;