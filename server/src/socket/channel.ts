import { Socket } from "socket.io";
import Logger from "@/loaders/logger";

//join coding project
const joinChannel = async ({ socket }: { socket: Socket }) => {
  socket.on(
    "joinChannel",
    (data: { codingProjectId: string; groupId: string; userId: string }) => {
      //join room : room id = codingProjectId
      const room = data.codingProjectId + data.groupId;
      const userId = data.userId;
      socket.join(room);
      Logger.info(`User  ${userId} joined  room ${room}`);
      //emit to room : room id = groupId + codingProjectId
      socket.to(room).emit("joinChannel", userId);
    },
  );

  //leave channel
  socket.on(
    "leaveChannel",
    (data: { codingProjectId: string; groupId: string; userId: string }) => {
      const room = data.codingProjectId + data.groupId;
      const userId = data.userId;
      socket.leave(room);
      Logger.info(`User  ${userId} left  room ${room}`);
      socket.to(room).emit("leaveChannel", userId);
    },
  );
};

export default async ({ socket }: { socket: Socket }) => {
  await joinChannel({ socket });
};
