import mongoose, {Document} from "mongoose";

export interface IGroup extends Document {
    name: string;
    description?: string;
    language?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroupDto {
    name: string;
    description?: string;
}