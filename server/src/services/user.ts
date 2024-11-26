import { User, UserModel } from "@/model";
import Logger from "@/loaders/logger";
import { IUser } from "@/interface/IUser";

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
      throw new Error("No user found");
    }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    return user;
  }
}
