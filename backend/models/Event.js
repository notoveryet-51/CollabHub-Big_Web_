import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String },
  date: { type: Date },
  location: { type: String }, // For filtering
  description: { type: String },
  
  // For the "Heart" icon in your wireframe (Favorites)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);