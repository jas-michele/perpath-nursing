import mongoose from "mongoose";
import { title } from "node:process";
import { required } from "zod/v4/core/util.cjs";

const roadmapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        careerGoal: {
            type: String,
            required: true
        },

        estimatedDuration: String,

        milestones: [
            {
                title: String,
                description: String,
                completed: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        weeklyGoals: [String],

        resources: [
            {
                title: String,
                url: String,
            }
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Roadmap", roadmapSchema);