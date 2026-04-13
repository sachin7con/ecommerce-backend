import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js'; 


dotenv.config();
connectDB();

const App = express();

App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
App.use(express.json());

App.use("/api/auth", authRoutes);




App.listen(5000, ()=>{
    console.log("Server running on Port 5000")
});