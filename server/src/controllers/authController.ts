import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import signToken from "../utils/signToken";
import { success } from "zod";

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        const token = signToken(user);

        res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error,
        })
    }
};

export const loginUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
            return
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            res.status(401).json({
                success: false,
                 message: "Invalid email or password.",
            })
            return;
        }

        const token = signToken(user);

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login Failed.",
            error,
        });
    }
};

export const getCurrentUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await User.findById((req as any).user.id).select("-password");

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found."
            });
            return;
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            success: false,
            message: "Unable to retrieve user",
            error,
        })
    }
}