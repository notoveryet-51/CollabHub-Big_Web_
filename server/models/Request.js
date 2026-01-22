import { mongoose } from "../firebase.js";

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    createdBy: {
      type: String, // Firebase UID
      required: true
    },
    createdByName: {
      type: String,
      default: "Anonymous"
    },
    participants: {
      type: [String], // Array of Firebase UIDs
      default: []
    },
    status: {
      type: String,
      enum: ["open", "closed", "in-progress"],
      default: "open"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
