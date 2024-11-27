import mongoose, { Document } from "mongoose";

export interface IDesign extends Document {
  channel: mongoose.Types.ObjectId;
  canvasData: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDesignDTO {
  channel: string;
  canvasData: string;
}
