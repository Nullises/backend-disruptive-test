import app from "./src/app";
import dotenv from "dotenv";
import WebSocket, { Server } from "ws";
import http from "http";
const url = require("url");
import { redisClientSubscriber } from "./src/config/redis";

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const WEB_SOCKET_PORT = 8080;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`);
});

// WebSocker + Redis
// New Content Modified
redisClientSubscriber.subscribe("content-created");
redisClientSubscriber.subscribe("content-updated");
redisClientSubscriber.subscribe("content-deleted");

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });

// Register event for client connection
server.on("connection", function connection(ws) {
  // broadcast on web socket when receving a Redis PUB/SUB Event
  redisClientSubscriber.on("message", function (channel, message) {
    console.log(message);
    ws.send(message);
  });
});
