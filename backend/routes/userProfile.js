import user from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
dotenv.config();

const router = express.Router();

router.put("/EditProfile", async (req, res) => {
  const defaultImg =
    "https://assets.bananastreet.ru/unsafe/2498x2498/https://bananastreet.ru/system/user/avatar/38/382/382231/7e7ab91539.png";
  let profilePicture =
    req.files && req.files.profilePicture
      ? req.files.profilePicture.tempFilePath
      : defaultImg;

  if (profilePicture !== defaultImg) {
    profilePicture = await cloudinary.uploader.upload(profilePicture, {
      use_filename: true,
      folder: "Home",
    });
  }

  const { username, bio, fullName } = req.body;

  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      const EditUser = await user.findByIdAndUpdate(
        decodedToken.sub,
        {
          $set: {
            username,
            bio,
            fullName,
            profilePicture:
              profilePicture !== defaultImg
                ? profilePicture.url
                : profilePicture,
          },
        },
        { new: true }
      );
      res.status(200).json({ message: "Account has been updated!", EditUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(500).json({ message: "Token is not defined" });
  }
});

router.delete("/DeleteProfile", async (req, res) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      const DeleteUser = await user.findByIdAndDelete(decodedToken.sub);
      res.status(200).json({ message: "Account has been deleted!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(500).json({ message: "Token is not defined" });
  }
});

router.put("/Follow/:id", async (req, res) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      if (decodedToken.sub !== req.params.id) {
        const UserShe = await user.findById(req.params.id);
        const currentUser = await user.findById(decodedToken.sub);
        if (!UserShe.followers.includes(decodedToken.sub)) {
          await UserShe.updateOne({ $push: { followers: decodedToken.sub } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          return res.status(200).json("you have been succesful follow");
        } else {
          return res.status(400).send("You are already following this user!");
        }
      } else {
        return res.status(400).send("You can't follow yourself!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(500).json({ message: "Token is not defined" });
  }
});

router.put("/unFollow/:id", async (req, res) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      if (decodedToken.sub !== req.params.id) {
        const UserShe = await user.findById(req.params.id);
        const currentUser = await user.findById(decodedToken.sub);
        if (UserShe.followers.includes(decodedToken.sub)) {
          await UserShe.updateOne({ $pull: { followers: decodedToken.sub } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          return res.status(200).json("you have been succesful unFollow");
        } else {
          res.status(403).send("You are not unfollowing this user");
        }
      } else {
        return res.status(400).send("You can't follow yourself!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(200).json({ message: "token is not defined" });
  }
});

router.get("/ProfileUser", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    let ProfileUser;
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      ProfileUser = await user.findById(userId).select("-email -password");
    } else if (username) {
      ProfileUser = await user
        .findOne({ fullName: username })
        .select("-email -password");
    } else {
      return res
        .status(400)
        .json({ message: "No user ID or username provided" });
    }

    return res.status(200).json(ProfileUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/FollowingUser", async (req, res) => {
  const token = req.cookies.jwtToken;
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const userProfile = await user
      .findById(decodedToken.sub)
      .select("-email -password");
    const followingProfile = [];
    for (const followingUser of userProfile.followings) {
      const FollowUser = await user
        .findById(followingUser)
        .select("-email -password");
      if (FollowUser) {
        followingProfile.push(FollowUser);
      }
    }
    res.status(200).json(followingProfile);
  } catch (error) {
    console.log(error);
  }
});

router.get("/AllProfile", async (req, res) => {
  try {
    const allUSerProfile = await user.find().select("-email -password");
    res.status(200).json(allUSerProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/ProfileSearch", async (req, res) => {
  const { Search } = req.body;

  try {
    const ProfileSearch = await user.find({
      fullName: { $regex: new RegExp("\\b" + Search, "i") },
    });
    if (ProfileSearch.length > 0) {
      return res.status(200).json(ProfileSearch);
    } else {
      return res.status(404).json({ message: "This User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
