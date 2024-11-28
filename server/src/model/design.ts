import { IDesign } from "@/interface/IDesign";
import { model, Model, Schema } from "mongoose";

export type DesignModel = Model<IDesign, {}, {}>;

const designSchema = new Schema<IDesign, DesignModel, {}>(
  {
    channel: { type: Schema.Types.ObjectId, ref: "Channel" },
    canvasData: { type: Schema.Types.Mixed }, // Stores JSON data of the canvas
  },
  {
    timestamps: true,
  },
);

designSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Design = model<IDesign, DesignModel>("Design", designSchema);
