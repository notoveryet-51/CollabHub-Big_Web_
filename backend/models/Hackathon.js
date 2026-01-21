import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // "Brief detail" from wireframe
  startDate: { type: Date },
  endDate: { type: Date },
  
  // "Short detail" from wireframe (e.g., "Online", "Team Size: 4")
  mode: { type: String, default: "Online" }, 
  teamSize: { type: Number, default: 4 },
  
  tags: [{ type: String }], // For search
  
  // To track "Participated" count in Right Sidebar
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
  isTrending: { type: Boolean, default: false } // For "Trending Topics" box
}, { timestamps: true });

export default mongoose.model("Hackathon", HackathonSchema);