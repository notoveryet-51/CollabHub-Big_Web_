import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin, { mongoose } from "./firebase.js"; // Firebase & MongoDB

dotenv.config();

const app = express();

/* =============== MIDDLEWARE =============== */
app.use(cors());
app.use(express.json());

/* Error handling middleware */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

/* Health check */
app.get("/", (req, res) => {
  res.send("🚀 CollabHub backend running with Firebase + MongoDB");
});

/* =============== AUTHENTICATION MIDDLEWARE =============== */
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

/* =============== AUTH ROUTES =============== */
app.post("/api/auth/sync", async (req, res) => {
  try {
    const { firebaseUid, email, name } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // TODO: Save user to MongoDB (implement later with schema)
    console.log(`✅ User synced: ${email}`);

    res.json({
      success: true,
      message: "User synced successfully",
      user: { firebaseUid, email, name }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* =============== DASHBOARD ROUTES =============== */
app.get("/api/user/dashboard", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    // TODO: Fetch user data from MongoDB
    const dashboardData = {
      userName: req.user.name || "Student",
      posts: [],
      requests: [],
      joinedGroups: []
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* =============== POSTS ROUTES =============== */
app.get("/api/posts", async (req, res) => {
  try {
    // TODO: Fetch posts from MongoDB
    res.json({ success: true, posts: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/posts", verifyToken, async (req, res) => {
  try {
    const { title, description, subject } = req.body;
    const uid = req.user.uid;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // TODO: Save post to MongoDB
    console.log(`✅ Post created by ${uid}`);

    res.json({ success: true, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* =============== 404 HANDLER =============== */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

/* =============== START SERVER =============== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

