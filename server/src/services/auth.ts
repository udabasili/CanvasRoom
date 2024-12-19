import { User, UserModel } from "@/model";
import { CreateUserDto, IUser, LoginUserDto } from "@/interface/IUser";
import { TokenService } from "@/services/token";
import Logger from "@/loaders/logger";
import { ErrorHandler } from "@/api/middlewares/errorHandler";

export class AuthService {
  private readonly tokenService: typeof TokenService;
  private readonly logger: typeof Logger;
  private readonly userModel: UserModel;

  constructor() {
    this.userModel = User;
    this.logger = Logger;
    this.tokenService = TokenService;
  }

  /**
   * @returns Promise
   * @param userInputDTO
   */
  public async register(userInputDTO: CreateUserDto): Promise<{
    user: IUser;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    const userRecord = await this.userModel.create(userInputDTO);
    this.logger.silly("Generating JWT");
    const accessToken = this.tokenService.generateAccessToken(userRecord.id);
    const refreshToken = await this.tokenService.generateRefreshToken(
      userRecord.id,
    );
    if (!userRecord) {
      throw new Error("User cannot be created");
    }
    Logger.silly("User Created");
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    return {
      user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  public async login(loginDTO: LoginUserDto): Promise<{
    user: IUser;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    const userRecord = await this.userModel.findOne({
      email: loginDTO.email,
    });
    this.logger.silly("Finding User");

    if (!userRecord) {
      throw new ErrorHandler("Invalid Email/Password", 404);
    }

    const passwordValidated: boolean = await userRecord.validatePassword(
      loginDTO.password,
    );
    this.logger.silly("Validating Password");
    if (!passwordValidated) {
      throw new ErrorHandler("Invalid Email/Password", 401);
    }
    this.logger.silly("Generating JWT");
    const accessToken = this.tokenService.generateAccessToken(userRecord.id);
    const refreshToken = await this.tokenService.generateRefreshToken(
      userRecord.id,
    );
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    return {
      user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  }

  public async logout(token: string): Promise<boolean> {
    this.logger.silly("Invalidating JWT");
    const tokenDeleted = await this.tokenService.invalidateRefreshToken(token);
    return tokenDeleted;
  }
}
