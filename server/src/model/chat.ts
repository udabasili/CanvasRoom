import { model, Model, Schema } from "mongoose";
import { IChat } from "@/interface";

export type ChatModel = Model<IChat, {}, {}>;

const chatSchema = new Schema<IChat, ChatModel, {}>(
  {
    channel: { type: Schema.Types.ObjectId, ref: "Channel" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    message: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Chat = model<IChat, ChatModel>("Chat", chatSchema);
