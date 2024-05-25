import express from "express";
import post from "../model/post.js";
import user from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.cookies.jwtToken;
  const { des, likes } = req.body;
  const defaultImg =
    "https://assets.bananastreet.ru/unsafe/2498x2498/https://bananastreet.ru/system/user/avatar/38/382/382231/7e7ab91539.png";

  let postPicture =
    req.files && req.files.postPicture
      ? req.files.postPicture.tempFilePath
      : defaultImg;

  if (postPicture !== defaultImg) {
    postPicture = await cloudinary.uploader.upload(postPicture, {
      use_filename: true,
      folder: "Home",
    });
  }

  try {
    const decetedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const newPost = new post({
      userId: decetedToken.sub,
      des,
      likes,
      img: postPicture !== defaultImg ? postPicture.url : postPicture,
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
    const GetUserPost = await post.find({
      userId: decotedToken.sub,
    });
    res.status(200).json(GetUserPost);
  } catch (error) {
    console.log(eroor);
    res.status(500).json("Internal server error");
  }
});

router.get("/FollowingPost", async (req, res) => {
  const token = req.cookies.jwtToken;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const userPost = await user.findById(decodedToken.sub);
    const followingPosts = [];
    for (const followingId of userPost.followings) {
      const followingUser = await post.find({
        userId: followingId,
      });
      const followingProfile = await user
        .findById(followingId)
        .select({ fullName: 1, bio: 1, profilePicture: 1, _id: 0 });

      const followingUserMap = followingUser.map((onemap) => {
        const followingUserAddDetails = {
          ...onemap._doc,
          ...followingProfile._doc,
        };
        return followingUserAddDetails;
      });

      followingPosts.push(...followingUserMap);
    }

    res.status(200).json(followingPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.put("/postLike/:id", async (req, res) => {
  const token = req.cookies.jwtToken;
  const { id } = req.params;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const postFind = await post.findById(id);
    if (postFind.likes.includes(decodedToken.sub)) {
      await postFind.updateOne({ $pull: { likes: decodedToken.sub } });
      res.status(200).json("you have unliked this post");
    } else {
      await postFind.updateOne({ $push: { likes: decodedToken.sub } });
      res.status(200).json("you have liked this post");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
