import { IDesign } from "@/interface/IDesign";
import { model, Model, Schema } from "mongoose";

export type DesignFileModel = Model<IDesign, {}, {}>;

const designFileSchema = new Schema<IDesign, DesignFileModel, {}>(
  {
    channel: { type: Schema.Types.ObjectId, ref: "Channel" },
    canvasData: { type: Schema.Types.Mixed, required: true }, // Stores JSON data of the canvas
  },
  {
    timestamps: true,
  },
);

designFileSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Design = model<IDesign, DesignFileModel>(
  "Design",
  designFileSchema,
);
