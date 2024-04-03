import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { createServer } from "http";
import { Server } from "socket.io";
import AllRoute from "./AllRoutes.js";

const corsOptions = {
  origin: "*",
  credentials: true,
};

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const Port = process.env.PORT;

const server = express();
server.use(cookieParser());
server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(fileUpload({ useTempFiles: true }));

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTING_MONGO_DB);
    console.log("MongoDB Connecting :)");
  } catch (error) {
    console.log(error);
  }
};

server.use("/api", AllRoute);

const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (SocketData) => {
  SocketData.on("alinanMesaj", (data) => {
    io.sockets.emit("gonderilenMesaj", data.mesaj);
  });
});
httpServer.listen(Port, async () => {
  try {
    await connectMongoDb();
    console.log(`http://localhost:${Port}`);
  } catch (error) {
    console.log(error);
    console.log("baglantida problem bash verdi");
  }
});
