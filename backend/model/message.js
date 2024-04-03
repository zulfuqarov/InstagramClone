import mongoose from "mongoose";

const message = new mongoose.Schema({
  sender: {
    type: String,
    ref: "User",
    required: true,
  },
  receiver: {
    type: String,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("message", message);
