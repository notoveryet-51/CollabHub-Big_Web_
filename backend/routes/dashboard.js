import express from "express";
import User from "../models/User.js";
import Event from "../models/Event.mjs"; // Assuming you have this, or use generic logic

const router = express.Router();

// --- 1. GET SUGGESTIONS (Users to Connect With) ---
router.get("/suggestions/:uid", async (req, res) => {
  try {
    const currentUid = req.params.uid;

    // Fetch up to 5 users who are NOT the current user
    // { uid: { $ne: currentUid } } means "Not Equal" to current ID
    const suggestions = await User.find({ uid: { $ne: currentUid } })
      .select("uid displayName location photoURL") // Only get necessary fields
      .limit(5);

    res.json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// --- 2. GET DASHBOARD STATS ---
router.get("/stats/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    
    // Return real data from DB, or defaults if missing
    res.json({
      stats: {
        streak: user?.stats?.loginStreak || 1,
        hackathonsParticipated: user?.achievements?.length || 0,
        eventsParticipated: user?.participatingEvents?.length || 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// --- 3. GET HACKATHONS (Mock Data or DB) ---
router.get("/hackathons", async (req, res) => {
  // You can replace this with a real Hackathon.find() query later
  const mockHackathons = [
    { _id: "h1", title: "MNNIT CodeWar", description: "Annual coding battle.", mode: "Offline", createdAt: new Date() },
    { _id: "h2", title: "React Global Summit", description: "Online hackathon for React devs.", mode: "Online", createdAt: new Date() }
  ];
  res.json(mockHackathons);
});

// --- 4. GET EVENTS ---
router.get("/events", async (req, res) => {
  try {
    // If you have an Event model, use: const events = await Event.find().limit(5);
    // For now, returning an empty array or mock data works to prevent errors
    res.json([]); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;