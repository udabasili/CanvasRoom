import { model, Model, Schema } from "mongoose";
import { IGroup } from "@/interface";

export type GroupModel = Model<IGroup, {}, {}>;

const groupSchema = new Schema<IGroup, GroupModel, {}>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//after deleting group, delete all the channels associated with it
groupSchema.post("deleteOne", async function (doc) {
  await new this.model("Channel").deleteMany({ group: doc._id });
});

export const Group = model<IGroup, GroupModel>("Group", groupSchema);
