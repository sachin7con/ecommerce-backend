import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js'; 


dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://myekart.netlify.app",
  "https://69e1278316a3b1089386cb5c--myekart.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);




app.listen(5000, ()=>{
    console.log("Server running on Port 5000")
});