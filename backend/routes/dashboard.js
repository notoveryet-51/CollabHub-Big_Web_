import express from "express";
import User from "../models/User.js";
import Hackathon from "../models/Hackathon.js";
import Event from "../models/Event.js";
import Post from "../models/Post.js"; // Assuming you have this from before

const router = express.Router();

// --- 1. RIGHT SIDEBAR DATA (Stats & Trending) ---
// Frontend calls: GET /api/dashboard/stats/:uid
router.get('/stats/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    
    // Logic to calculate counts for the sidebar boxes
    const stats = {
      streak: user.stats?.loginStreak || 0,
      hackathonsParticipated: user.participatingEvents?.length || 0,
      eventsParticipated: 5, // You can make this dynamic later based on DB
    };

    // "Trending Topics" - Fetch top 3 active Hackathons or Posts
    const trending = await Hackathon.find({ isTrending: true }).limit(3).select('title description');

    res.json({ stats, trending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. MIDDLE SECTION (Hackathons List) ---
// Frontend calls: GET /api/dashboard/hackathons
router.get('/hackathons', async (req, res) => {
  try {
    // Sort by newest first
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. MIDDLE SECTION (Events List) ---
// Frontend calls: GET /api/dashboard/events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by upcoming date
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. SEARCH BAR LOGIC ---
// Frontend calls: GET /api/dashboard/search?q=react
router.get('/search', async (req, res) => {
  const { q } = req.query; // The text user typed
  try {
    // Search Regex (Case insensitive)
    const regex = new RegExp(q, 'i');

    // Search in Users, Hackathons, and Posts simultaneously
    const users = await User.find({ displayName: regex }).select('displayName photoURL uid');
    const hackathons = await Hackathon.find({ title: regex }).select('title description');
    const posts = await Post.find({ title: regex }).select('title description');

    res.json({ users, hackathons, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;