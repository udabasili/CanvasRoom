import mongoose, { Document } from "mongoose";

export interface IShareResource extends Document {
  channel: mongoose.Types.ObjectId;
  url?: string;
  title: string;
  description?: string;
  sharedBy: mongoose.Types.ObjectId;
}

export interface IShareResourceDTO {
  channel: string;
  url?: string;
  title: string;
  description?: string;
}
