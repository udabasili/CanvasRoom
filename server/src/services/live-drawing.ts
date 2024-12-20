import Logger from "@/loaders/logger";
import { LiveDrawing, LiveDrawingModel } from "@/model";
import { LiveDrawingInputDTO } from "@/interface";
import { Types } from "mongoose";
import { ErrorHandler } from "@/api/middlewares/errorHandler";

export class LiveDrawingService {
  private logger: typeof Logger;
  private liveDrawingModel: LiveDrawingModel;
  private readonly channelID: string;

  constructor(channelID: string) {
    this.logger = Logger;
    this.liveDrawingModel = LiveDrawing;
    this.channelID = channelID;
  }

  public async draw(input: LiveDrawingInputDTO) {
    this.logger.silly("Adding drawing");
    const query = {
      channel: new Types.ObjectId(this.channelID),
    };
    const update = {
      $push: {
        strokes: input,
      },
    };
    const options = {
      upsert: true,
      new: true,
    };
    await this.liveDrawingModel.findOneAndUpdate(query, update, options);
  }

  public async getDrawing() {
    this.logger.silly("Adding drawing");
    const query = {
      channel: new Types.ObjectId(this.channelID),
    };
    const drawingRecord = await this.liveDrawingModel.findOne(query).lean();
    if (!drawingRecord) {
      throw new ErrorHandler("No Record Found", 404);
    }
    return drawingRecord;
  }
}
