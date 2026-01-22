import express from "express";
import Event from "../models/Event.mjs"; // Go UP one folder (..) to find models

const router = express.Router();

// GET /api/events/search
router.get("/search", async (req, res) => {
  try {
    const { city, interest, mode } = req.query;
    let query = {};

    // 1. Filter by City
    if (city) {
      query["location.city"] = { $regex: city, $options: "i" };
    }

    // 2. Filter by Interest
    if (interest) {
      query.tags = { $in: [new RegExp(interest, "i")] };
    }

    // 3. Filter by Mode
    if (mode) {
      query["location.mode"] = mode;
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.status(200).json(events);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;