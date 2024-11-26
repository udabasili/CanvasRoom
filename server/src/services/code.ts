import Logger from "@/loaders/logger";
import { Code, CodeModel } from "@/model";
import { Types } from "mongoose";

export class CodeService {
  private logger: typeof Logger;
  private codeModel: CodeModel;
  private readonly channelId: string;

  constructor(channelId: string) {
    this.logger = Logger;
    this.codeModel = Code;
    this.channelId = channelId;
  }

  public async createCodeProject() {
    return await this.codeModel.create({
      channel: this.channelId,
    });
  }

  public async getCodeJSON() {
    this.logger.silly("Getting code");
    const codeRecord = await this.getCode();
    return codeRecord.toJSON();
  }

  public async getCode() {
    this.logger.silly("Getting code");
    let codeRecord = await this.codeModel.findOne({
      channel: new Types.ObjectId(this.channelId),
    });
    if (!codeRecord) {
      codeRecord = await this.createCodeProject();
    }
    return codeRecord;
  }

  public async updateCode(newCode: string) {
    const codeRecord = await this.getCode();

    this.logger.silly("Updating code");
    return this.codeModel.findByIdAndUpdate(
      codeRecord._id,
      {
        code: newCode,
      },
      {
        new: true,
      },
    );
  }
}
