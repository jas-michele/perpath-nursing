import express from "express";
import cors from  "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo";


import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`Running on localhost: ${PORT}`)
});


