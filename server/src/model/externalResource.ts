import {IExternalResource} from "@/interface";
import {model, Model, Schema} from "mongoose";

export type ExternalResourceModel = Model<IExternalResource, {}, {}>

const externalResourceSchema = new Schema<IExternalResource, ExternalResourceModel, {}>({
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
},{
    timestamps: true
})

export const ExternalResource = model<IExternalResource, ExternalResourceModel>('ExternalResource', externalResourceSchema)