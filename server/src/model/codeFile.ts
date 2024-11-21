import {ICodeFile} from "@/interface/ICodeFile";
import {model, Model, Schema} from "mongoose";

export type CodeFileModel = Model<ICodeFile, {}, {}>

const codeFileSchema = new Schema<ICodeFile, CodeFileModel, {}>({
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

export const CodeFile = model<ICodeFile, CodeFileModel>('CodeFile', codeFileSchema)