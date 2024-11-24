import mongoose, { Document } from "mongoose";

export interface IExternalResource extends Document {
  channel: mongoose.Types.ObjectId;
  url: string;
  title: string;
  description?: string;
}

export interface IExternalResourceDTO {
  channel: string;
  url: string;
  title: string;
  description?: string;
}
