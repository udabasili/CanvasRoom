import { Socket } from "socket.io";
import { Group } from "@/model/group";
import { getIO } from "@/loaders/socket";
import Logger from "@/loaders/logger";

/**
 *
 * @param socket
 */
async function generalGroupListener(socket: Socket) {
  const groups = await Group.find({});
  groups.forEach((group) => {
    const io = getIO();
    io.to(group.id).emit("hello", "world");
  });
}

async function joinGroupListener(socket: Socket) {
  // Event: User joins a group (room)
  socket.on(
    "joinGroup",
    ({ userId, groupId }: { userId: string; groupId: string }) => {
      console.log(`User ${userId} joined group ${groupId}`);

      // Join the Socket.IO room based on the groupId
      socket.join(groupId);

      // Emit to others in the group that a user joined
      socket.to(groupId).emit("userJoined", { userId });
    },
  );
}

async function leaveGroupListener(socket: Socket) {
  // Event: User leaves a group (room)
  socket.on(
    "leaveGroup",
    ({ userId, groupId }: { userId: string; groupId: string }) => {
      console.log(`User ${userId} left group ${groupId}`);

      // Leave the Socket.IO room based on the groupId
      socket.leave(groupId);

      // Emit to others in the group that a user left
      socket.to(groupId).emit("userLeft", { userId });
    },
  );
}

export default async ({ socket }: { socket: Socket }) => {
  await generalGroupListener(socket);
  await joinGroupListener(socket);
};
