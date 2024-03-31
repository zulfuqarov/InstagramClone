import express from "express";
const router = express.Router();

import auth from "./routes/auth.js";
import userProfile from "./routes/userProfile.js";

router.use("/auth", auth);
router.use("/user", userProfile);
export default router;
