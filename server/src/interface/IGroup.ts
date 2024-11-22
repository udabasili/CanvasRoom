import mongoose, {Document} from "mongoose";

export interface IGroup extends Document {
    name: string;
    description?: string;
    language?: string;
    createdAt: Date;
    updatedAt: Date;
    members: mongoose.Types.ObjectId[]; // Array of user IDs
    channels: mongoose.Types.ObjectId[]; // Array of channel IDs
}

export interface IGroupDto {
    name: string;
    description?: string;
    language?: string;
}