import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { createFlashcards, getFlashcards } from "../controllers/flashcardController";

const router = Router();

router.post("/generate", authMiddleware, createFlashcards);

router.get("/", authMiddleware, getFlashcards);

export default router;