import Logger from "@/loaders/logger";
import { Types } from "mongoose";
import { Chat, ChatModel } from "@/model";
import { IChatInputDTO, IUser } from "@/interface";

export class ChatService {
  private logger: typeof Logger;
  private chatModel: ChatModel;
  private readonly channelId: string;

  constructor(channelId: string = "") {
    this.logger = Logger;
    this.chatModel = Chat;
    this.channelId = channelId;
  }

  public async createChannelChat(chatInputDTO?: IChatInputDTO) {
    if (this.channelId === "") {
      throw new Error("Channel Id is required to create chat");
    }
    if (!chatInputDTO) {
      chatInputDTO = {
        channel: this.channelId,
      };
    } else {
      chatInputDTO.channel = this.channelId;
    }

    return await this.chatModel.create(chatInputDTO);
  }

  public async createPrivateChat(userId: string, chatInputDTO?: IChatInputDTO) {
    if (!chatInputDTO) {
      chatInputDTO = {
        recipient: userId,
      };
    } else {
      chatInputDTO.recipient = userId;
    }
    return await this.chatModel.create(chatInputDTO);
  }

  public async getChannelChat() {
    this.logger.silly("Getting chat for channel Id: " + this.channelId);
    let chatRecord = await this.chatModel.find({
      channel: new Types.ObjectId(this.channelId),
    });
    if (!chatRecord.length) {
      await this.createChannelChat();
    }
    return chatRecord;
  }

  public async getPrivateChat(userId: string) {
    this.logger.silly("Getting chat for user: " + userId);
    const chatRecord = await this.chatModel.find({
      recipient: userId,
    });
    if (!chatRecord.length) {
      await this.createPrivateChat(userId);
    }
    return chatRecord;
  }

  public async addPrivateChat(chatInputDTO: IChatInputDTO): Promise<void> {
    this.logger.silly(
      "Add chat for user: " +
        chatInputDTO.recipient +
        " from user: " +
        chatInputDTO.sender,
    );
    await this.createPrivateChat(
      chatInputDTO.recipient as string,
      chatInputDTO,
    );
  }
}
