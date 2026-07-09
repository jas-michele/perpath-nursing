import { Router } from "express";
import { chatWithAI } from "../controllers/aiController";
import  authMiddleware  from "../middleware/auth";

const router = Router();

router.post("/chat", authMiddleware, chatWithAI);

export default router;