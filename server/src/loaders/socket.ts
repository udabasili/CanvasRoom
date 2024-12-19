import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import groupListener from "@/socket/group";
import codeListener from "@/socket/code";
import channelListener from "@/socket/channel";
import chatListener from "@/socket/chat";
import liveDrawing from "@/socket/live-drawing";

// Define a type for the socket instance to use elsewhere
export type IOServer = SocketIOServer;

// Socket.IO instance
let io: IOServer;

/**
 * Initialize Socket.IO server
 * @param server - The HTTP server instance
 */

type ConnectionAttempts = {
  [key: string]: number; // Tracks attempts per client (by socket ID or IP)
};

const reconnectionAttempts: ConnectionAttempts = {};

export function initializeIO(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log("Socket.IO initialized");

  io.on("connection", async (socket: Socket) => {
    const clientIP = socket.handshake.address; // Use IP or other unique identifier

    if (!reconnectionAttempts[clientIP]) {
      reconnectionAttempts[clientIP] = 1;
    } else {
      reconnectionAttempts[clientIP]++;
    }

    if (reconnectionAttempts[clientIP] > 5) {
      console.log(`Excessive reconnections from ${clientIP}`);
      socket.disconnect(true); // Forcefully disconnect the client
      return;
    }

    console.log(`Socket connected: ${socket.id}`);
    console.log(
      `Reconnection attempts for ${clientIP}: ${reconnectionAttempts[clientIP]}`,
    );

    // Handle events here
    console.log(`Socket connected: ${socket.id}`);
    await channelListener({ socket });
    await groupListener({ socket });
    await codeListener({ socket });
    await chatListener({ socket });
    await liveDrawing({ socket });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      delete reconnectionAttempts[clientIP]; // Clean up when the socket disconnects
    });
  });

  return io;
}

/**
 * Get the existing Socket.IO server instance
 * @returns The Socket.IO instance
 */
export function getIO(): IOServer {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized. Call initializeIO first.",
    );
  }
  return io;
}
