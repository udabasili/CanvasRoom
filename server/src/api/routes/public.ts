import { Router } from "express";
import { GroupService } from "@/services/group";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";

export default (app: Router) => {
  const route = Router();

  app.use("", route);

  route.get("/groups", async (req, res, next) => {
    try {
      const groupServiceInstance = new GroupService();
      const groups = await groupServiceInstance.getGroups();
      res.status(200).json({ groups });
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });
};
