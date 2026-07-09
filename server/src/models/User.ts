import { Schema, Document, model } from "mongoose";


export interface IUser extends Document {
    // Authenticatio
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "learner" | "alumni" | "mentor" | "admin";

    // Status
    profileCompleted: boolean;
    intakeCompleted: boolean;

    // Learning Profile
    trainingProvider: string;
    campus: string;
    program: string;
    currentModule: string;
    careerGoal: string;
    weeklyStudyHours: number;

    // Starting Point
    experienceLevel: string;
    currentOccupation: string;
    educationLevel: string;
    currentLearningStage: string;
    biggestLearningObstacle: string;

    // Technical Confidence
    technicalConfidence: [
        {
            skill: string;
            confidence: number;
        }
    ]

    // Experience
    technicalSkills: string[];
    previousProjects: string[];

}

const userSchema = new Schema<IUser>(
    {
        // Authentication
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["learner", "alumni", "mentor", "admin"],
            default: "learner",
            required: true,
        },

        // Status
        intakeCompleted: {
            type: Boolean,
            default: false
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        trainingProvider: {
            type: String,
            default: "",
        },

        campus: {
            type: String,
            default: "",
        },

        program: {
            type: String,
            default: "",
        },

        currentModule: {
            type: String,
            default: "",
        },

        careerGoal: {
            type: String,
            default: "",
        },

        weeklyStudyHours: {
            type: Number,
            default: 0,
        },

        // Starting Point
        experienceLevel: {
            type: String,
            default: "",
        },

        currentOccupation: {
            type: String,
            default: "",
        },

        educationLevel: {
            type: String,
            default: "",
        },

        currentLearningStage: {
            type: String,
            default: "",
        },

        biggestLearningObstacle: {
            type: String,
            default: "",
        },

        // Technical Confidence
        technicalConfidence: {
            type: [
                {
                    skill: {
                        type: String,
                        required: true
                    },
                    confidence: {
                        type: Number,
                        min: 0,
                        max: 5,
                        required: true,
                    },
                },
            ],

            default: [],
        },

        technicalSkills: {
            type: [String],
            default: [],
        },

        previousProjects: {
            type: [String],
            default: [],
        },




    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", userSchema);

export default User;