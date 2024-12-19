import { Socket } from "socket.io";
import Logger from "@/loaders/logger";
import { LiveDrawingService } from "@/services/live-drawing";

type LiveDrawingData = {
  groupId: string;
  channelId: string;
  userId: string;
  stroke: {
    color: string;
    width: number;
    points: [{ x: number; y: number }];
  };
};
const liveDrawingListener = ({ socket }: { socket: Socket }) => {
  socket.on("live-drawing", async (data: LiveDrawingData) => {
    try {
      const room = data.groupId + data.channelId;
      const liveDrawingInstance = new LiveDrawingService(data.channelId);
      await liveDrawingInstance.draw(data.stroke);
      socket.to(room).emit("live-drawing", "Drawing received");
    } catch (e) {
      const error = e as Error;
      Logger.error(error.message);
    }
  });
};
export default async ({ socket }: { socket: Socket }) => {
  await liveDrawingListener({ socket });
};
