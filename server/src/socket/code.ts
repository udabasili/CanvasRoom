import { getIO } from "@/loaders/socket";
import { Socket } from "socket.io";
import Logger from "@/loaders/logger";
import { CodeService } from "@/services/code";

type CodeAlongData = {
  groupId: string;
  codingProjectId: string;
  userId: string;
  value: string;
};

//join coding project
const joinCodingProject = async ({ socket }: { socket: Socket }) => {
  socket.on(
    "joinCodingProject",
    (data: { codingProjectId: string; groupId: string }) => {
      //join room : room id = codingProjectId
      const room = data.codingProjectId + data.groupId;
      socket.join(room);
      Logger.info(`Socket ${socket.id} joined  room ${room}`);
    },
  );
};

const codeListener = async ({ socket }: { socket: Socket }) => {
  socket.on("codeAlong", async (data: CodeAlongData) => {
    //emit to room : room id = groupId + codingProjectId
    const room = data.groupId + data.codingProjectId;
    //store code in database
    try {
      const codeInstance = new CodeService(data.codingProjectId);
      const code = await codeInstance.updateCode(data.value);
      socket.to(room).emit("codeAlong", code?.code);
    } catch (error) {
      Logger.error(error);
    }
  });
};

export default async ({ socket }: { socket: Socket }) => {
  await codeListener({ socket });
  await joinCodingProject({ socket });
};
