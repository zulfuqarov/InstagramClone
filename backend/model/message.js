import mongoose from "mongoose";

const message = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  currendId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
});

export default mongoose.model("message", message);
