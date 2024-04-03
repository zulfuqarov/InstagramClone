import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import message from "../model/message.js";

dotenv.config();
const router = express.Router();

router.post("/messages/:receiverId", async (req, res) => {
  const { receiverId } = req.params;
  const token = req.cookies.jwtToken;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);

    const { messageContent } = req.body;
    const Message = new message({
      sender: decodedToken.sub,
      receiver: receiverId,
      message: messageContent,
    });
    await Message.save();
    res.status(201).send(Message);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/messages/:receiverId", async (req, res) => {
  const { receiverId } = req.params;
  const token = req.cookies.jwtToken;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const Message = await message
      .find({
        $or: [
          { sender: decodedToken.sub, receiver: receiverId },
          { sender: receiverId, receiver: decodedToken.sub },
        ],
      })
      .sort({ timestamp: 1 });
    res.status(200).json(Message);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
