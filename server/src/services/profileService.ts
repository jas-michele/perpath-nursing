import User from "../models/User";

export const isProfileComplete = (reply: string): boolean => {
    return reply.includes("PROFILE_COMPLETE");
}

export const extractProfileJSON = (reply: string): string => {
    const start = reply.indexOf("{");

    if (start === -1) {
        throw new Error("Profile JSON not found")
    }

    return reply.substring(start);
}

export const parseProfile = (json: string) => {
    try {
         return JSON.parse(json);
    } catch (error) {
        throw new Error("Invalid profile JSON.")
    }
   
}

export const updateUserProfile = async (
    userId: string,
    profile: any
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    Object.assign(user, profile);

    user.intakeCompleted = true;
    user.profileCompleted = true;

    await user.save();

    return user;
}