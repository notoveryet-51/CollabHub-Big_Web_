import { mongoose } from "../firebase.js";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      default: "User"
    },
    photo: {
      type: String,
      default: null
    },
    location: {
      city: String,
      college: String
    },
    interests: {
      type: [String],
      default: []
    },
    badges: {
      type: [String],
      default: []
    },
    streak: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
