import postMessage from "../model/postMessage.js";
import post from "../model/post.js"
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.cookies.jwtToken;
  const { messageContent } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);

    const ComentPost = await post.findById(req.query.receiverId);
    await ComentPost.updateOne({ $push: { comments: decodedToken.sub } });

    const newMessage = new postMessage({
      senderId: decodedToken.sub,
      receiverId: req.query.receiverId,
      content: messageContent,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  
  } catch (error) {
    console.log(error);
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
