import { IError } from "@/interface/IError";
import Logger from "@/loaders/logger";
import { Request, Response, NextFunction } from "express";
import { User } from "@/model";

const setCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let userId = "";
    if (req.params.userId) {
      userId = req.params.userId;
    } else {
      userId = req.userId;
    }
    Logger.debug("Getting current user");
    console.log(userId);
    const userRecord = await User.findById(userId);
    if (!userRecord) {
      throw new Error("User not found");
    }
    Logger.debug("User found");
    const currentUser = userRecord.toJSON();
    Logger.debug("Deleting password and email from current user");
    Reflect.deleteProperty(currentUser, "password");
    Reflect.deleteProperty(currentUser, "email");
    Logger.debug("Setting current user");

    req.currentUser = currentUser;
    return next();
  } catch (e) {
    const errorObject = e as IError;
    Logger.error("🔥 Error", errorObject);
    return next({
      message: "UnAuthorized",
      status: 401,
    });
  }
};

export default setCurrentUser;
