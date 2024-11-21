import {IDesignFile} from "@/interface/IDesignFile";
import {model, Model, Schema} from "mongoose";

export type DesignFileModel = Model<IDesignFile, {}, {}>

const designFileSchema = new Schema<IDesignFile, DesignFileModel, {}>({
    channel: {type: Schema.Types.ObjectId, ref: 'Channel'},
    fileUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
},
{
    timestamps: true
})

export const DesignFile = model<IDesignFile, DesignFileModel>('DesignFile', designFileSchema)