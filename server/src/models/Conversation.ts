import { Schema, model, Types, Document } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

export interface IMessage {
    role: "user" | "assistant";
    content: string;
}

export interface IConversation extends Document {
    user: Types.ObjectId;
    messages: IMessage[];
}

const conversationSchema = new Schema<IConversation>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        messages: [
            {
                role: {
                    type: String,
                    enum: ["user", "assistant"],
                    required: true,
                },

                content: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)

export default model<IConversation>("Conversation", conversationSchema);