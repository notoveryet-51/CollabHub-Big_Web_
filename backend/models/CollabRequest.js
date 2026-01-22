import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  sender: { // The person asking to join
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: { // The specific study group/post they want to join
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: { // Optional: "Hey, I'm good at React, let me in!"
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CollabRequest = mongoose.model('CollabRequest', RequestSchema);
export default CollabRequest;