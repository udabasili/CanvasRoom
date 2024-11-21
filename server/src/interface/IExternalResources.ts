import mongoose, {Document} from "mongoose";

export interface IExternalResource extends Document {
    channel: mongoose.Types.ObjectId;
    url: string;
    title: string;
    description?: string;
}

export interface IExternalResourceDto {
    channel: string
    url: string;
    title: string;
    description?: string;
}