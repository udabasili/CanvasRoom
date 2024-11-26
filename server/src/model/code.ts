import { ICode } from "@/interface/ICode";
import { model, Model, Schema } from "mongoose";

export type CodeModel = Model<ICode, {}, {}>;

const codeSchema = new Schema<ICode, CodeModel, {}>(
  {
    channel: { type: Schema.Types.ObjectId, ref: "Channel" },
    code: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Code = model<ICode, CodeModel>("Code", codeSchema);
