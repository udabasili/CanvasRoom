import { Router } from "express";
import { CodeService } from "@/services/code";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  //    await apiCall.get(`${userId}/groups/${groupId}/channels/${channelId}`)
  app.use("/:userId/code", route);

  route.get("/:channelId", async (req, res, next) => {
    try {
      // @ts-ignore
      const { channelId } = req.params;
      const codeInstance = new CodeService(channelId);
      const code = await codeInstance.getCodeJSON();
      res.status(200).send(code);
    } catch (error) {
      const errorValue: IError = error as IError;
      Logger.error(errorValue);
      next(errorValue);
    }
  });
};