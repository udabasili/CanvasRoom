import { Socket } from "socket.io";
import Logger from "@/loaders/logger";
import { CodeService } from "@/services/code";
import { DesignService } from "@/services/design";

type DesignAlongData = {
  groupId: string;
  channelId: string;
  userId: string;
  value: string;
};

export const designAddedListener = async ({ socket }: { socket: Socket }) => {
  socket.on("object-added", async (data: DesignAlongData) => {
    //emit to room : room id = groupId + channelId
    const room = data.groupId + data.channelId;
    //store code in database
    try {
      const designInstance = new DesignService(data.channelId);
      const design = await designInstance.updateDesign(data.value);
      socket.to(room).emit("object-added", { value: design?.canvasData });
    } catch (error) {
      Logger.error(error);
    }
  });
};

export const designUpdatedListener = async ({ socket }: { socket: Socket }) => {
  socket.on("object-modified", async (data: DesignAlongData) => {
    const room = data.groupId + data.channelId;
    //store code in database
    const designInstance = new DesignService(data.channelId);
    const design = await designInstance.updateDesign(data.value);
    try {
      socket.to(room).emit("object-modified", { value: design?.canvasData });
    } catch (error) {
      Logger.error(error);
    }
  });
};

export default async ({ socket }: { socket: Socket }) => {
  await designAddedListener({ socket });
  await designUpdatedListener({ socket });
};
