import user from "../model/user.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const { profilePicture } = req.files;

//   auth hisseinde qalmisdiq
});

export default router;
