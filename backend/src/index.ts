import express from "express";
import config from "./env";
import api from "./apiRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbRepository from "./database/controllers/db";
import fileUpload from "express-fileupload";
import { FileRepository } from "./database/controllers/file";

new dbRepository().testConnection();

new FileRepository().addFile("CG6.pdf", "public/static/upload");

const server = express();

server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
server.use((req, res, next) => {
  if (config.LOGGING) {
    console.log(`${req.method} : ${req.url.toString()}`);
  }
  next();
});
server.use(express.json());

server.use(fileUpload());

server.get("/", (req, res) => {
  res.send(`Connected on server`);
});

server.use("/api", api);

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
