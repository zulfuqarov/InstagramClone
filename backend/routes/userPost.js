import express from "express";
import post from "../model/post.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.cookies.jwtToken;
  const { des, likes } = req.body;
  const img = req.files && req.files.img ? req.files.img : "postimg.jpg";
  try {
    const decetedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const newPost = new post({
      userId: decetedToken.sub,
      des,
      likes,
      img,
    });
    await newPost.save();
    res.status(200).json("Post has been addend");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.put("/EditPost/:id", async (req, res) => {
  const { id } = req.params;
  const img = req.files && req.files.img ? req.files.img : "post.png";
  try {
    const token = req.cookies.jwtToken;
    const decodedToke = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const GetPost = await post.findById(id);

    if (GetPost.userId === decodedToke.sub) {
      try {
        await GetPost.updateOne({ $set: req.body });
        await GetPost.updateOne({ $set: img });
        res.status(200).json("The post has been updated!");
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
      }
    } else {
      res.status(400).json("this post dont you");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.get("/GetPost/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const GetPost = await post.findById(id);
    res.status(200).json(GetPost);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.get("/GetUserPost", async (req, res) => {
  const token = req.cookies.jwtToken;
  try {
    const decotedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const GetUserPost = await post.findById(decotedToken.sub);
    res.status(200).json(GetUserPost);
  } catch (error) {
    console.log(eroor);
    res.status(500).json("Internal server error");
  }
});

export default router;
