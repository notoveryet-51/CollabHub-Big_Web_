import express from "express";
import User from "../models/User.js";
import Message from "../models/Message.js";
import CollabRequest from "../models/CollabRequest.js";
import { logActivity } from "./activity.js"; 

const router = express.Router();

// --- CHAT ROUTES ---
router.post('/message', async (req, res) => {
  const { firebaseUid, content, projectId } = req.body;

  try {
    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const msg = new Message({
      sender: user._id,
      projectId,
      content
    });
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// --- COLLAB REQUEST ROUTES ---
router.post('/join-request', async (req, res) => {
  const { firebaseUid, postId, message } = req.body;

  try {
    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newRequest = new CollabRequest({
      sender: user._id,
      postId,
      message
    });
    await newRequest.save();

    // 🔥 LOGGING ADDED HERE
    await logActivity(user._id, "JOIN_REQUEST", `Requested to join project ${postId}`);

    res.json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;