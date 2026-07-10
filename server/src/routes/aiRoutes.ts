import { Router } from "express";
import { chatWithAI, startConversation } from "../controllers/aiController";
import  authMiddleware  from "../middleware/auth";

const router = Router();

router.post("/chat", authMiddleware, chatWithAI);
router.post("/start", authMiddleware, startConversation);

export default router;