import Logger from "@/loaders/logger";
import { Design, DesignModel } from "@/model";
import { Types } from "mongoose";

export class DesignService {
  private logger: typeof Logger;
  private designModel: DesignModel;
  private readonly channelId: string;

  constructor(channelId: string) {
    this.logger = Logger;
    this.designModel = Design;
    this.channelId = channelId;
  }

  public async createDesignProject() {
    return await this.designModel.create({
      channel: this.channelId,
    });
  }

  public async getDesignJSON() {
    this.logger.silly("Getting design");
    const designRecord = await this.getDesign();
    return designRecord.toJSON();
  }

  public async getDesign() {
    this.logger.silly("Getting design");
    let designRecord = await this.designModel.findOne({
      channel: new Types.ObjectId(this.channelId),
    });
    if (!designRecord) {
      designRecord = await this.createDesignProject();
    }
    return designRecord;
  }

  public async updateDesign(newDesign: string) {
    const designRecord = await this.getDesign();
    console.log(newDesign);
    this.logger.silly("Updating design");
    return this.designModel.findByIdAndUpdate(
      designRecord._id,
      {
        canvasData: newDesign,
      },
      {
        new: true,
      },
    );
  }
}
