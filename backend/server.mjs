import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";

// --- Import Routes ---
import eventRoutes from "./routes/events.mjs";
import authRoutes from "./routes/auth.mjs";
import interactionRoutes from "./routes/interactions.js"; 
// ✅ NEW: Import your User and Dashboard routes
import userRoutes from "./routes/user.js";        
import dashboardRoutes from "./routes/dashboard.js"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// --- CONNECTION ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/collabhub"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Server Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// --- ROUTES ---
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interactions", interactionRoutes);

// ✅ NEW: Register the User and Dashboard routes here
app.use("/api/user", userRoutes);           // Enables Profile & Friend Requests
app.use("/api/dashboard", dashboardRoutes); // Enables Suggestions & Stats

// --- CRON JOB ---
cron.schedule('0 0,12 * * *', () => {
  console.log("⏰ Cron Job: Checking for new events...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});