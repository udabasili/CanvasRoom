import { Socket } from "socket.io";
import Logger from "@/loaders/logger";
import { CodeService } from "@/services/code";
import { ChatService } from "@/services/chat";

type GroupChatData = {
  groupId: string;
  message: string;
  channelId: string;
};

type PrivateChatData = {
  recipient: string;
  message: string;
  sender: string;
};

const channelChatListener = async ({ socket }: { socket: Socket }) => {
  socket.on("channelChat", async (data: GroupChatData) => {
    //emit to room : room id = groupId + codingProjectId
    const room = data.groupId + data.channelId;
    try {
      const chatInstance = new ChatService(data.channelId);
      await chatInstance.createChannelChat({
        message: data.message,
      });
      const chat = await chatInstance.getChannelChat();
    } catch (error) {
      Logger.error(error);
    }
  });
};

export default async ({ socket }: { socket: Socket }) => {
  await channelChatListener({ socket });
};
