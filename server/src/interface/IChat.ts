import mongoose, { Document } from "mongoose";

export interface IChat extends Document {
  channel?: mongoose.Schema.Types.ObjectId;
  sender?: mongoose.Schema.Types.ObjectId;
  recipient?: mongoose.Schema.Types.ObjectId;
  message: string;
  url?: string;
  status: "waiting" | "sent" | "received" | "read";
}

export interface IChatInputDTO {
  channel?: string;
  sender?: string;
  recipient?: string;
  message?: string;
  url?: string;
  status?: "waiting" | "sent" | "received" | "read";
}
