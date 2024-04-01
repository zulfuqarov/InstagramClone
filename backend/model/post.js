import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
  des: {
    type: String,
    default: "",
  },
  likes: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("PostSchema", PostSchema);
