import user from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.put("/EditProfile", async (req, res) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      const EditUser = await user.findByIdAndUpdate(
        decodedToken.sub,
        {
          $set: req.body,
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
        const currentUser = await user.findById(req.decodedToken.sub);
        if (!UserShe.followers.includes(decodedToken.sub)) {
          await UserShe.updateOne({ $push: { followers: decodedToken.sub } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
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
        const currentUser = await user.findById(req.decodedToken.sub);
        if (UserShe.followers.includes(decodedToken.sub)) {
          await UserShe.updateOne({ $pull: { followers: decodedToken.sub } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
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



export default router;
