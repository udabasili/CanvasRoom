import mongoose, { Document } from "mongoose";

export const channelTypes = [
  "ask_questions",
  "share_resources",
  "project_ideas",
  "coding_project",
  "design_project",
  "faq",
  "external_resources",
] as const;

export const channelLabel = {
  ask_questions: "Ask Questions",
  share_resources: "Share Resources",
  project_ideas: "Project Ideas",
  coding_project: "Coding Project",
  design_project: "Design Project",
  faq: "FAQ",
  external_resources: "External Resources",
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
