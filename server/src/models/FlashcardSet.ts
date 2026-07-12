import mongoose from "mongoose";


const flashcardSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },

        choices: {
            type: [String],
            required: true,
            validate: {
                validator: ( choices: string[]) => choices.length === 4,
                message: "Each flashcard must contain exactly four answer choices.",
            },
        },

        correctAnswer: {
            type: String,
            required: true,
            trim: true,
        },

        explanation: {
            type: String, 
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const flashcardSetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        lessonTitle: {
            type: String,
            default: "Untitled Lesson",
            trim: true,
        },

        lessonSource: {
            type: String,
            default: "LLM Markdown",
            trim: true,
        },

        cards: {
            type: [flashcardSchema],
            required: true,
        },

        currentCard: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalQuestions: {
            type: Number,
            default: 0,
            min: 0,
            
        },

        score: {
            type: Number,
            default: 0,
            min: 0,
        },

        xpEarned: {
            type: Number,
            default: 0,
            min: 0,
        },

        studyTime: {
            type: Number,
            default: 0,
            min: 0
        },

        completed: {
            type: Boolean,
            default: false
        },
        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("FlashcardSet", flashcardSetSchema)