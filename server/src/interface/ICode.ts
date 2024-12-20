import mongoose, { Document } from "mongoose";

export interface ICode extends Document {
  channel: mongoose.Types.ObjectId;
  code?: string;
}
