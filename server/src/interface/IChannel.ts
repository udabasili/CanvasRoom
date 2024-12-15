import mongoose, { Document } from "mongoose";

export const channelTypes = [
  "group_chat",
  "ask_questions",
  "share_resources",
  "coding_project",
] as const;

export const channelLabel = {
  group_chat: "Group Chat",
  ask_questions: "Ask Questions",
  share_resources: "Share Resources",
  coding_project: "Coding Project",
};

export interface IChannel extends Document {
  group: mongoose.Types.ObjectId;
  name: string;
  type: keyof typeof channelTypes;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChannelInputDTO {
  group: string;
  name: string;
  type: keyof typeof channelTypes;
}
