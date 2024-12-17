import mongoose, { Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  description?: string;
  language: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  owner: mongoose.Types.ObjectId; // User ID
  members: mongoose.Types.ObjectId[]; // Array of user IDs
  channels: mongoose.Types.ObjectId[]; // Array of channel IDs
}

export interface CreateGroupDTO {
  name: string;
  description?: string;
  language?: string;
  icon?: string;
  owner: string; // User ID
}
