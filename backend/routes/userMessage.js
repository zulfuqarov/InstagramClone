import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import message from "../model/message.js";
import { Server } from "socket.io";
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

router.delete("/messages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await message.findByIdAndDelete(id);
    res.status(200).send("Mesaj silindi");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/messagesUpdate/:id", async (req, res) => {
  const { id } = req.params;
  const { newMessage } = req.body;
  try {
    const UpdateMessage = await message.findByIdAndUpdate(
      id,
      { $set: { message: newMessage } },
      { new: true }
    );
    res.status(200).json(UpdateMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const users = {};

  io.on("connection", (SocketData) => {
    SocketData.on("login", (userId) => {
      users[userId] = SocketData.id;
      io.emit("online", Object.keys(users));
      console.log(`${userId} kullanıcı giriş yaptı`);
    });

    SocketData.on("privateMessage", (senderId, receiverId, message) => {
      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("privateMessage", senderId, message);
        console.log(`${senderId} -> ${receiverId}: ${message}`);
      } else {
        console.log("kulanici aktiv diyilir");
      }
    });

    SocketData.on("disconnect", () => {
      const userId = Object.keys(users).find(
        (key) => users[key] === SocketData.id
      );

      if (userId) {
        console.log(`${userId} kullanıcı bağlantısı kesildi`);
        delete users[userId];
        io.emit("online", Object.keys(users));
      }
    });

    console.log("Connecting Socket Io");
  });

  return io;
};

export default router;
