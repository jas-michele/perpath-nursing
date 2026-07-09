import { Schema, Document, model } from "mongoose";


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    trainingProvider: string;
    campus: string;
    program: string;
    currentModule: string;
    careerGoal: string;
    weeklyStudyHours: number;
    existingSkills: string[];
    previousProjects: string[];
    profileCompleted: boolean;
    intakeCompleted: boolean;
    role: "learner" | "mentor" | "admin";
}

const userSchema = new Schema<IUser>(
    {
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

        existingSkills: {
            type: [String],
            default: [],
        },

        previousProjects: {
            type: [String],
            default: [],
        },

        intakeCompleted: {
            type: Boolean,
            default: false
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ["learner", "mentor", "admin"],
            default: "learner",
            required: true,
        },


    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;