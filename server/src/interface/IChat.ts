import mongoose, {Document} from "mongoose";

export interface IChat extends Document {
    channel?: string;
    sender?: string; //recipient and sender for private message and channel is for messages sent on channels
    recipient?: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IChatInputDto {
    channel?: string;
    sender?: string; 
    recipient?: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}