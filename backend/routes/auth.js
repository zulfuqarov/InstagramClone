import user from "../model/user.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const router = express.Router();

dotenv.config();

router.post("/Register", async (req, res) => {
  const { username, email, password, bio, fullName } = req.body;
  const profilePicture =
    req.files && req.files.profilePicture
      ? req.files.profilePicture
      : "default.jpg";

  if (username && email && password) {
    try {
      const CheckEmail = await user.findOne({
        email: email,
      });
      const CheckUserName = await user.findOne({
        username: username,
      });
      if (CheckEmail || CheckUserName) {
        if (CheckEmail) {
          return res.status(400).json({ message: "This email already exists" });
        }
        if (CheckUserName) {
          return res
            .status(400)
            .json({ message: "This username already exists" });
        }
      } else {
        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
          username,
          email,
          password: HashedPassword,
          bio,
          fullName,
          profilePicture,
        });
        await newUser.save();
        return res.status(200).json({ message: "user has been created" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You did not provide any details for authentication" });
  }
});

router.post("/Sign", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const CheckEmail = await user.findOne({
        email: email,
      });
      if (CheckEmail) {
        const IsMatch = await bcrypt.compare(password, CheckEmail.password);
        if (IsMatch) {
          const payload = {
            sub: CheckEmail._id,
            name: CheckEmail.username,
            email: CheckEmail.email,
            fullName: CheckEmail.fullName,
            bio: CheckEmail.bio,
            profilePicture: CheckEmail.profilePicture,
          };

          const token = await jwt.sign(payload, process.env.TOKEN_SECRET_CODE, {
            expiresIn: "3d",
          });

          res.cookie("jwtToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          res
            .status(200)
            .json({ message: "Your login has been successfully completed" });

          // return res.status(200).json(CheckEmail);
        } else {
          return res
            .status(400)
            .json({ message: "Your password is incorrect" });
        }
      } else {
        return res.status(400).json({ message: "Your email is incorrect" });
      }
    } else {
      return res.status(400).json({
        message: "You did not provide any details for authentication",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/Logout", async (req, res) => {
  try {
    res.clearCookie("jwtToken");
    res.status(2000).json({ message: "Profile has been Logout" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/Profile", async (req, res) => {
  const token = req.cookies.jwtToken;
  try {
    if (token) {
      const decodedToke = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      req.user = await user.findById(decodedToke.sub);
      if (req.user) {
        return res.status(200).json("Profile Siged");
      } else {
        return res.status(400).json({ message: "user not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Authentication failed... Try again" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "JWT has expired. Please log in again." });
    }
    console.log(error);
    res.status(400).json({ message: "serverde xeta bash verdi (Admin Get)" });
  }
});

export default router;
