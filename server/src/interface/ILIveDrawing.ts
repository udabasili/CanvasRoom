import mongoose, { Document } from "mongoose";

export interface ILiveDrawing extends Document {
  channel: mongoose.Types.ObjectId;
  strokes: [
    {
      color: string;
      width: number;
      points: [{ x: number; y: number }];
    },
  ];
}

export interface LiveDrawingInputDTO {
  color: string;
  width: number;
  points: [{ x: number; y: number }];
}
