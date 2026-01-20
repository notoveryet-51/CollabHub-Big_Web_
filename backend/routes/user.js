import express from "express";
import User from "../models/User.js";

const router = express.Router();

// --- 1. GET USER PROFILE ---
// Frontend calls: GET /api/user/:uid
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate("friends", "displayName photoURL email");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. UPDATE PROFILE (Location, Interests, etc.) ---
// Frontend calls: PUT /api/user/update
// Body: { uid, location: { city: "Prayagraj", ... }, interests: ["React", "Music"] }
router.put("/update", async (req, res) => {
  try {
    const { uid, location, interests, displayName, photoURL } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { 
        $set: { 
          location, 
          interests, 
          displayName,
          photoURL 
        } 
      },
      { new: true } // Return the updated document
    );
    
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. "ASK MATE" (Send Friend Request) ---
// Frontend calls: POST /api/user/friend-request
// Body: { senderUid, receiverUid, note }
router.post("/friend-request", async (req, res) => {
  try {
    const { senderUid, receiverUid, note } = req.body;

    // Find both users
    const sender = await User.findOne({ uid: senderUid });
    const receiver = await User.findOne({ uid: receiverUid });

    if (!sender || !receiver) return res.status(404).json({ message: "User not found" });

    // Check if already friends or requested
    const existingRequest = receiver.friendRequests.find(req => req.senderId.equals(sender._id));
    if (existingRequest) return res.status(400).json({ message: "Request already sent" });

    // Add request to receiver's list
    receiver.friendRequests.push({
      senderId: sender._id,
      senderName: sender.displayName,
      note: note, // The "Short Note" you wanted
      status: "pending"
    });

    await receiver.save();
    res.json({ message: "Ask Mate request sent successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. RESPOND TO REQUEST (Accept/Reject) ---
// Frontend calls: PUT /api/user/friend-request/respond
// Body: { userUid, senderId, action: "accept" or "reject" }
router.put("/friend-request/respond", async (req, res) => {
  try {
    const { userUid, senderId, action } = req.body;
    
    const user = await User.findOne({ uid: userUid });
    const sender = await User.findById(senderId); // MongoDB _id here

    if (action === "accept") {
      // Add to friends list for BOTH users
      user.friends.push(sender._id);
      sender.friends.push(user._id);

      // Add "Achievement" for making a new connection
      user.achievements.push({
        title: "New Connection",
        description: `Connected with ${sender.displayName}`,
        badgeIcon: "🤝"
      });

      await sender.save();
    }

    // Remove the request from the array (handled for both accept/reject)
    user.friendRequests = user.friendRequests.filter(req => !req.senderId.equals(sender._id));
    
    await user.save();
    res.json({ message: `Request ${action}ed`, friends: user.friends });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;