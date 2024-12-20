export interface LiveDrawing {
  channel: string;
  strokes: [
    {
      color: string;
      width: number;
      points: [{ x: number; y: number }];
    },
  ];
}

export interface Stroke {
  color: string;
  width: number;
  points: [{ x: number; y: number }];
}

export type ApiLiveDrawingResponse = {
  liveDrawing: LiveDrawing;
};
