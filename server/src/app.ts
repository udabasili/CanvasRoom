import express from "express";
import { createServer } from "http";
import config from "@/config";
import { initializeIO } from "@/loaders/socket";

async function startServer() {
  const app = express();
  const server = createServer(app);
  //add socket.io

  // Initialize Socket.IO
  initializeIO(server);
  await require("./loaders").default({ expressApp: app });

  server
    .listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
