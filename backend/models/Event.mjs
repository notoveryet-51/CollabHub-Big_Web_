import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  // --- ORIGINAL FIELDS (Kept) ---
  name: { type: String, required: true }, // Matches "title" in logic
  organizer: { type: String },
  date: { type: Date }, // Matches "eventDate" logic
  description: { type: String },

  // --- NEW FIELDS (Added for Filtering & Web Linking) ---
  
  // 1. Web Linking: Where the user goes to register (e.g., Unstop, Devfolio)
  registrationLink: { type: String }, 

  // 2. Interest Filtering: Array of interests (e.g., ["AI", "Cybersecurity"])
  tags: [{ type: String }], 

  // 3. Source: To know if this came from "Unstop", "Manual", or "MLH"
  source: { type: String, default: "Manual" },

  // 4. Advanced Location: Replaces simple String with detailed Object
  // This supports both your original "display string" needs and the new "Country/State" filters
  location: {
    address: { type: String }, // Your original simple location string goes here
    city: { type: String },    // For City filtering
    state: { type: String },   // For State filtering
    country: { type: String }, // For Country filtering
    mode: { type: String, enum: ['online', 'offline', 'hybrid'], default: 'offline' },
    
    // For "Events Near Me" (Google Maps logic)
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },

  // --- SOCIAL FIELDS (Kept) ---
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, { timestamps: true });

// Create an index for fast Geo-location searching
EventSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Event", EventSchema);