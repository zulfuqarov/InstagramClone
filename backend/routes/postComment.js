import postMessage from "../model/postMessage.js";
import post from "../model/post.js";
import express from "express";
import user from "../model/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.cookies.jwtToken;
  const { receiverId, content } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);

    const ComentPost = await post.findById(receiverId);

    const userProfile = await user
      .findById(decodedToken.sub)
      .select({ fullName: 1, profilePicture: 1, _id: 0 });

    const newMessage = new postMessage({
      senderId: decodedToken.sub,
      receiverId,
      content,
      fullName: userProfile.fullName,
      profilePicture: userProfile.profilePicture,
    });

    await newMessage.save();
    await ComentPost.updateOne({ $push: { comments: newMessage._id } });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  const { id, postId } = req.query;

  try {
    const commentId = new mongoose.Types.ObjectId(id);

    const deleteComment = await postMessage.findByIdAndDelete(commentId);

    const ComentPost = await post.findById(postId);
    await ComentPost.updateOne({
      $pull: { comments: commentId },
    });

    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const getComment = await postMessage.find({
      receiverId: req.query.receiverId,
    });
    res.status(201).json(getComment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
