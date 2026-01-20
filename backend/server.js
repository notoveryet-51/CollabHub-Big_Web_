import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postsRoutes from "./routes/posts.js";           // Make sure this file exists
import interactionsRoutes from "./routes/interactions.js"; // Make sure this file exists
import dashboardRoutes from "./routes/dashboard.js"; // <--- Import the new file

dotenv.config();

// Initialize App
const app = express();

// --- 1. DATABASE CONNECTION ---
// We connect directly here to keep it simple and effective for ES Modules
const connectDB = async () => {
  try {
    // Uses MONGO_URI from .env if available, otherwise defaults to local Compass string
    const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/collabhub";
    
    await mongoose.connect(dbURI);
    
    console.log("✅ MongoDB Local Connected Successfully");
    console.log(`   Target: ${dbURI.includes("127.0.0.1") ? "Local Compass" : "Cloud Atlas"}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Connect to Database
connectDB();

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// --- 3. ROUTES ---
// Auth & User Management
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Core Features (Posts & Interactions)
app.use("/api/posts", postsRoutes);
app.use("/api/interactions", interactionsRoutes);

// Health Check (To test if server is alive)
app.get("/", (req, res) => {
  res.send("🚀 Collab-Hub Backend is Running...");
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📡 Ready to receive data from Frontend`);
});

app.use("/api/posts", postsRoutes);
app.use("/api/interactions", interactionsRoutes);

// ADD THIS LINE:
app.use("/api/dashboard", dashboardRoutes); 

// ... existing listen code ...