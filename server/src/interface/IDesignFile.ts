import mongoose, { Document } from "mongoose";

export interface IDesignFile extends Document {
  channel: mongoose.Types.ObjectId;
  fileUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDesignFileDTO {
  channel: string;
  fileUrl: string;
  description?: string;
}
