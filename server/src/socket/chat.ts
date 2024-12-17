import { Socket } from "socket.io";
import Logger from "@/loaders/logger";
import { CodeService } from "@/services/code";
import { ChatService } from "@/services/chat";
import { getIO } from "@/loaders/socket";

type GroupChatData = {
  sender: string;
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
  const io = getIO();
  socket.on("channelChat", async (data: GroupChatData) => {
    //emit to room : room id = groupId + codingProjectId
    const room = data.groupId + data.channelId;
    Logger.info(`User  ${data.sender} joined  room ${room}`);
    try {
      const chatInstance = new ChatService(data.channelId);
      Logger.info(`Creating chat for channel Id: ${data.channelId}`);
      await chatInstance.createChannelChat({
        message: data.message,
        sender: data.sender,
      });
      Logger.info(`Getting chat for channel Id: ${data.channelId}`);
      const chat = await chatInstance.getChannelChat();
      io.to(room).emit("channelChat", chat);
    } catch (error) {
      Logger.error(error);
    }
  });
};

const privateChatListener = async ({ socket }: { socket: Socket }) => {
  const io = getIO();
  io.on("privateChat", async (data: PrivateChatData) => {
    try {
      const chatInstance = new ChatService();
      await chatInstance.createPrivateChat(data.recipient, {
        message: data.message,
        sender: data.sender,
      });
      const chat = await chatInstance.getPrivateChat(data.recipient);
    } catch (error) {
      Logger.error(error);
    }
  });
};

export default async ({ socket }: { socket: Socket }) => {
  await channelChatListener({ socket });
  await privateChatListener({ socket });
};
