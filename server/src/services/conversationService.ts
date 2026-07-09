import Conversation from "../models/Conversation";

export const getConversation = async (userId: string) => {
    let conversation = await Conversation.findOne({ user: userId});

    if (!conversation) {
        conversation = await Conversation.create({
            user: userId,
            messages: [],
        })
    }

    return conversation;
}

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
            returnDocument: "after"
        }
     
    );
};
