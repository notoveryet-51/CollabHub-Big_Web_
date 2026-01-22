import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/Event.mjs"; 

dotenv.config(); 

// Use env var or fallback to local Compass URL
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/collabhub"; 

const seedEvents = async () => {
  try {
    console.log("🔌 Connecting to:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to DB");

    // Clear old data to prevent conflicts
    await Event.deleteMany({});
    console.log("🧹 Cleared old events");

    const mockEvents = [
      {
        name: "Global AI Hackathon 2026",
        organizer: "Tech Giants",
        date: new Date("2026-04-10"),
        description: "A global hackathon for AI enthusiasts.",
        registrationLink: "https://mlh.io/example",
        tags: ["AI", "Machine Learning"],
        location: { 
          address: "Online", 
          city: "Remote", 
          country: "India",
          mode: "online",
          // FIX: Added dummy coordinates [Longitude, Latitude] for online events
          coordinates: {
            type: "Point",
            coordinates: [0, 0] 
          }
        }
      },
      {
        name: "Delhi Web Dev Summit",
        organizer: "Dev Community",
        date: new Date("2026-05-20"),
        description: "Meet the best React developers in Delhi.",
        registrationLink: "https://eventbrite.com/example",
        tags: ["Web", "React"], 
        location: { 
          address: "Pragati Maidan", 
          city: "New Delhi", 
          state: "Delhi",
          country: "India",
          mode: "offline",
          // FIX: Added real Delhi coordinates [Longitude, Latitude]
          coordinates: {
            type: "Point",
            coordinates: [77.2090, 28.6139] 
          }
        }
      }
    ];

    await Event.insertMany(mockEvents);
    console.log("✅ Database populated with test events!");
    process.exit();
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedEvents();