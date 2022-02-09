import express from "express";
import config from "./env";
import api from "./apiRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

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

server.use("/api", api);

server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
