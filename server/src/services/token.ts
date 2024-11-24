import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "@/interface/IUser";
import config from "@/config";
import { IError } from "@/interface/IError";
import { Token } from "@/model/token";
import Logger from "@/loaders/logger";

/** Generate access token and refresh token */

export class TokenService {
  /**
   * @param userId
   * @returns string
   */
  public static generateAccessToken = (userId: string) => {
    return jwt.sign(
      {
        id: userId,
      },
      config.accessTokenSecret,
      { expiresIn: config.accessTokenExpiration },
    );
  };

  /**
   * @returns string
   * @param userId
   */

  public static generateRefreshToken = async (userId: string) => {
    const refreshToken = jwt.sign(
      {
        id: userId,
      },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiration },
    );

    await Token.create({
      userId,
      refreshToken,
    });
    return refreshToken;
  };

  public static async reIssueAccessToken(refreshToken: string) {
    let customError: IError = {} as IError;

    try {
      Logger.silly("Reissuing access token");
      const payload: JwtPayload = jwt.verify(
        refreshToken,
        config.refreshTokenSecret as string,
      ) as JwtPayload;
      const refreshTokenFound = await Token.find({
        where: {
          refreshToken,
        },
        limit: 1,
        order: [["createdAt", "DESC"]],
      });
      if (!refreshTokenFound) {
        customError.message = "Unauthorized";
        customError.status = 401;
        Logger.debug("Refresh token not found");
        throw customError;
      }
      const newestRefreshToken = refreshTokenFound[0]?.toJSON().refreshToken;
      Logger.silly("Newest refresh token issued");
      const userId = refreshTokenFound[0]?.toJSON().userId;

      if (newestRefreshToken !== refreshToken) {
        customError.message = "Unauthorized";
        customError.status = 401;
        Logger.debug("Old token.Not valid anymore.");
      }
      return this.generateAccessToken(userId);
    } catch (error) {
      throw customError;
    }
  }
}
