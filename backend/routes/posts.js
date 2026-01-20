import express from "express";
import Post from "../models/Post.js"; 
import User from "../models/User.js";

const router = express.Router();

// POST /api/posts/create
router.post('/create', async (req, res) => {
  const { title, desc, firebaseUid, tags } = req.body; // Added 'tags'

  try {
    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newPost = new Post({
      user: user._id, 
      title,
      description: desc,
      tags: tags || [], // Saves ["React", "DSA"]
      location: user.location // Auto-tag post with user's location
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET /api/posts (Feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) 
      .populate('user', 'displayName email photoURL'); // Fetches user details

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;