import express from "express";
import config from "./env";
// import api from "./apiRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import mariadb from "mariadb";
import folder from "./models/database/folder";

const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: 'root',
  password: 'root',
  port: 3306,
  connectionLimit: 5
});

pool.getConnection().then((conn) => {
  console.log("Connected");
  conn.query("SELECT * FROM SPACE.USER").then((rows) => {
    console.log(rows[0]);
  }).catch((err) => {
    console.log(err);
  })
}).catch((err) => {
  console.log(err);
  console.log("Not connected");
})

folder.getFolderByUser(1).then((res) => {
  console.log(res);
})

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

server.get("/", (req, res) => {
  res.send(`Connected on server`);
});

// server.use("/api", api);

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
