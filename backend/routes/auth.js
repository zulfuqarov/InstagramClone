import user from "../model/user.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
const router = express.Router();

dotenv.config();

router.post("/Register", async (req, res) => {
  const defaultImg =
    "https://assets.bananastreet.ru/unsafe/2498x2498/https://bananastreet.ru/system/user/avatar/38/382/382231/7e7ab91539.png";
  const { username, email, password, bio, fullName } = req.body;
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
          profilePicture:
            profilePicture !== defaultImg ? profilePicture.url : profilePicture,
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
          };

          const token = jwt.sign(payload, process.env.TOKEN_SECRET_CODE, {
            expiresIn: "3d",
          });

          res.cookie("jwtToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          res.status(200).json({
            message: "Your login has been successfully completed",
            token,
          });

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
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: true, // Sadece HTTPS üzerinden gönderim için
      sameSite: "strict",
    });
    res.status(200).json({ message: "Profile has been logged out" });
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
        return res
          .status(200)
          .json({ message: "Profile Siged", user: req.user._id });
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

router.post("/Check", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = req.cookies.jwtToken;
    if (token) {
      const decodedToke = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
      if (email === "" || password === "") {
        return res
          .status(400)
          .json({ message: "Email or password is not entered" });
      }
      const response = await user.findById(decodedToke.sub);
      const IsMatch = await bcrypt.compare(password, response.password);
      if (IsMatch && response.email === email) {
        return res
          .status(200)
          .json({ message: "you can change password and email" });
      } else {
        return res
          .status(400)
          .json({ message: "Enter the correct email and password" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Authentication failed... Try again" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/NewAuth", async (req, res) => {
  const { password, email } = req.body;
  const token = req.cookies.jwtToken;
  try {
    const decodedToke = jwt.verify(token, process.env.TOKEN_SECRET_CODE);
    const HashedPassword = await bcrypt.hash(password, 10);
    const response = await user.findByIdAndUpdate(
      decodedToke.sub,
      {
        $set: {
          email,
          password: HashedPassword,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({
        message: "Your email and password have been successfully changed",
      });
  } catch (error) {
    console.log(error);
  }
});
export default router;
