import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import message from "../model/message.js";

dotenv.config();
const router = express.Router();

export default router;
