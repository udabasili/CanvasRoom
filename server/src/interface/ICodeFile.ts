import mongoose, {Document} from "mongoose";

export interface ICodeFile extends Document {
    channel: mongoose.Types.ObjectId;
    fileUrl: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICodeFileDto {
    channel: mongoose.Types.ObjectId;
    fileUrl: string;
    description?: string;
}