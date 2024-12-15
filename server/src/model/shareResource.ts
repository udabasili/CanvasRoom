import { IShareResource } from "@/interface";
import { model, Model, Schema } from "mongoose";

export type ShareResourceModel = Model<IShareResource, {}, {}>;

const externalResourceSchema = new Schema<
  IShareResource,
  ShareResourceModel,
  {}
>(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    sharedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ShareResource = model<IShareResource, ShareResourceModel>(
  "ShareResource",
  externalResourceSchema,
);
