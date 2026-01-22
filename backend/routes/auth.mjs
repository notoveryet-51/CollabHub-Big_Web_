import express from "express";
import User from "../models/User.js";
import { logActivity } from "./activity.js"; 

const router = express.Router();

router.post("/sync", async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { uid: uid },
      {
        $set: {
          email: email,
          displayName: displayName || "Collab Student",
          photoURL: photoURL,
          "stats.lastLogin": new Date()
        },
        $setOnInsert: {
          "location.country": "India",
          interests: [],
          friends: [],
          friendRequests: [],
          stats: { loginStreak: 1, totalCollaborations: 0 }
        }
      },
      { new: true, upsert: true }
    );

    // 🔥 LOGGING ADDED HERE
    await logActivity(user._id, "LOGIN", `User ${user.displayName} logged in.`);

    res.status(200).json(user);

  } catch (err) {
    console.error("❌ Sync Error:", err.message);
    res.status(500).json({ error: "Server Error during sync" });
  }
});

export default router;