import mongoose, { Document } from "mongoose";

export interface IChat extends Document {
  channel?: string;
  sender?: string;
  recipient?: string;
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
}
