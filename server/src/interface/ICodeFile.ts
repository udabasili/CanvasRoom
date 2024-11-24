import mongoose, { Document } from "mongoose";

export interface ICodeFile extends Document {
  channel: mongoose.Types.ObjectId;
  fileUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICodeFileDTO {
  channel: mongoose.Types.ObjectId;
  fileUrl: string;
  description?: string;
}
