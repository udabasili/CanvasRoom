import mongoose, { Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  description?: string;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
  owner: mongoose.Types.ObjectId; // User ID
  members: mongoose.Types.ObjectId[]; // Array of user IDs
  channels: mongoose.Types.ObjectId[]; // Array of channel IDs
}

export interface IGroupDTO {
  name: string;
  description?: string;
  language?: string;
  owner: string; // User ID
}
