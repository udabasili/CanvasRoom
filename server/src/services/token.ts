import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "@/interface/IUser";
import config from "@/config";
import { IError } from "@/interface/IError";
import { Token } from "@/model";
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
    let customError: IError = new Error();

    try {
      Logger.silly("Getting refresh token from db");
      const refreshTokenFound = await Token.findOne({
        refreshToken: refreshToken,
      });
      console.log(refreshTokenFound);
      if (!refreshTokenFound) {
        customError.message = "Unauthorized";
        customError.status = 401;
        Logger.debug("Refresh token not found");
        throw customError;
      }

      const newestRefreshToken = refreshTokenFound.toJSON().refreshToken;
      const userId = refreshTokenFound?.toJSON().userId;
      console.log(refreshTokenFound, refreshToken);

      if (newestRefreshToken !== refreshToken) {
        customError.message = "Unauthorized";
        customError.status = 401;
        Logger.debug("Old token.Not valid anymore or user not found");
        throw customError;
      }
      Logger.silly("Generating new access token");
      return this.generateAccessToken(userId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public static invalidateRefreshToken = async (
    refreshToken: string,
  ): Promise<boolean> => {
    const tokenRemovedSuccessful = await Token.findOneAndDelete({
      refreshToken,
    });
    return !!tokenRemovedSuccessful;
  };
}
