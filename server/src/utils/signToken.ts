import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

const signToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    );
};

export default signToken;