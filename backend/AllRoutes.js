import express from "express";
const router = express.Router();

import auth from "./routes/auth.js";
import userProfile from "./routes/userProfile.js";
import userPost from "./routes/userPost.js";
import userMessage from "./routes/userMessage.js";
import postComment from "./routes/postComment.js";

router.use("/auth", auth);
router.use("/user", userProfile);
router.use("/post", userPost);
router.use("/message", userMessage);
router.use("/postComment", postComment);

export default router;
