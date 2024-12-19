import { User, UserModel } from "@/model";
import Logger from "@/loaders/logger";
import { IUser } from "@/interface/IUser";
import { ErrorHandler } from "@/api/middlewares/errorHandler";

export class UserService {
  private userModel: UserModel;
  private logger: typeof Logger;

  constructor() {
    this.userModel = User;
    this.logger = Logger;
  }

  public async getUser(userId: string): Promise<IUser> {
    const userRecord = await this.userModel.findById(userId);
    this.logger.silly("Getting user");
    if (!userRecord) {
      const error = new ErrorHandler("User not found", 404);
      throw error;
    }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    return user;
  }
}
