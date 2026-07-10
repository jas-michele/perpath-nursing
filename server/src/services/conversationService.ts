import Conversation from "../models/Conversation";

export const getConversation = async (userId: string) => {
    return Conversation.findOneAndUpdate(
        { user: userId },
        {
            $setOnInsert: {
                user: userId,
                messages: [],
            },
        },
        {
            upsert: true,
            returnDocument: "after",
        }
    );
};

export const saveConversation = async (
    userId: string,
    messages: {
        role: "user" | "assistant";
        content: string;
    }[]
) => {
    return Conversation.findOneAndUpdate(
        { user: userId },
        { messages },
        {
            returnDocument: "after",
        }
    );
};