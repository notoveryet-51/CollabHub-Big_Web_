import { mongoose } from "../firebase.js";

const postSchema = new mongoose.Schema(
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
    likes: {
      type: Number,
      default: 0
    },
    comments: [
      {
        userId: String,
        userName: String,
        text: String,
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
