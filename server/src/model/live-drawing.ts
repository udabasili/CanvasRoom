import { ILiveDrawing } from "@/interface";
import { model, Model, Schema } from "mongoose";

export type LiveDrawingModel = Model<ILiveDrawing, {}, {}>;

const liveDrawingSchema = new Schema<ILiveDrawing, LiveDrawingModel, {}>(
  {
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    strokes: [
      {
        color: String,
        width: Number,
        points: [{ x: Number, y: Number }],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const LiveDrawing = model<ILiveDrawing, LiveDrawingModel>(
  "LiveDrawing",
  liveDrawingSchema,
);
