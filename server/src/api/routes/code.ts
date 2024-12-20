import { Router } from "express";
import { CodeService } from "@/services/code";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  //    await apiCall.get(`${userId}/groups/${groupId}/channels/${channelId}`)
  app.use("/:userId/code", confirmAuthentication, setCurrentUser, route);

  route.get("/:channelId", async (req, res, next) => {
    try {
      // @ts-ignore
      const { channelId } = req.params;
      const codeInstance = new CodeService(channelId);
      const code = await codeInstance.getCodeJSON();
      res.status(200).send(code);
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });
};
