import { Request, Response } from "express";
import FlashcardSet from "../models/FlashcardSet";
import { generateFlashcards } from "../services/flashcardService";



export const createFlashcards = async (
    req: Request,
    res: Response
) => {

    try {

        const { lessonText } = req.body;

        if (!lessonText) {
            return res.status(400).json({
                success: false,
                message: "Lesson text is required."
            });
        }

        const generatedFlashcards = await generateFlashcards(
            lessonText
        );

        if (
            !generatedFlashcards.cards  ||
            generatedFlashcards.cards.length === 0
        ) {
            throw new Error("No flashcards were generated.")
        }

        const flashcardSet = await FlashcardSet.create({

            user: ( req as any).user.id,

            lessonTitle:
                generatedFlashcards.lessonTitle,

                lessonSource: "Markdown",

                cards: 
                    generatedFlashcards.cards,

                 totalQuestions: 
                    generatedFlashcards.cards.length,   
        });


        return res.status(201).json({
            success: true,

            flashcards: flashcardSet,
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to generate flashcards."
            
        });

    }

};

export const getFlashcards = async (
    req: Request,
    res: Response
) => {

    try {

        const flashcards = await FlashcardSet.findOne({

            user: (req as any).user.id

        }).sort({
            createdAt: -1
        });

        if (!flashcards) {
            return res.status(404).json({
                success: false,
                message: "No flashcards found."
            })
        }

        return res.status(200).json({
            success: true,

            flashcards,
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to retrive flashcards."

        });
    }
};