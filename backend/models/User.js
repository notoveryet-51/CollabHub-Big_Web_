import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // --- 1. CORE IDENTITY (Linked to Firebase) ---
    uid: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true // Faster lookup for login
    },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, default: "Collab Student" },
    photoURL: { type: String },

    // --- 2. LOCATION & INTERESTS (For Recommendations) ---
    // This supports your "Society -> City -> State" filter logic
    location: {
      country: { type: String, default: "India" },
      state: { type: String },
      city: { type: String },
      college: { type: String }, 
      society: { type: String }, // "Local area within society"
    },
    
    // Used to filter "Common Interest Candidates"
    interests: [{ type: String }], 

    // --- 3. SOCIAL SYSTEM ("Ask Mate" & Friends) ---
    friends: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" // Links to other users permanently
      }
    ],
    
    // Stores the "Short Note" sent before becoming friends
    friendRequests: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderName: String,
        note: { type: String }, // The "Ask Mate" message
        status: { 
          type: String, 
          enum: ["pending", "accepted", "rejected"], 
          default: "pending" 
        },
        createdAt: { type: Date, default: Date.now }
      }
    ],

    // --- 4. WORKFLOW & ACHIEVEMENTS ---
    // Stores "Daily Achievements" like hackathon participation
    achievements: [
      {
        title: { type: String }, // e.g., "Hackathon Winner", "OS Helper"
        description: { type: String },
        dateEarned: { type: Date, default: Date.now },
        badgeIcon: { type: String } // URL or emoji icon
      }
    ],
    
    // Tracks Hackathons/Events they are participating in
    participatingEvents: [
      {
        eventId: { type: String }, // ID of the Hackathon
        eventName: { type: String },
        role: { type: String } // e.g., "Team Leader", "Developer"
      }
    ],

    // --- 5. ACTIVITY DATA (For Analytics) ---
    stats: {
      loginStreak: { type: Number, default: 0 },
      lastLogin: { type: Date },
      totalCollaborations: { type: Number, default: 0 }
    },

    // --- 6. FAVORITES ---
    // Stores IDs of favorited events or posts
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
    ]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", UserSchema);
export default User;