import express from "express";
import cors from  "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo";


import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";
import roadmapRoutes from "./routes/roadmapRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
});


