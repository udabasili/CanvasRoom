import { Router } from "express";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";
import { DesignService } from "@/services/design";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  app.use("/:userId/design", route);

  route.get("/:channelId", async (req, res, next) => {
    try {
      // @ts-ignore
      const { channelId } = req.params;
      const designInstance = new DesignService(channelId);
      const design = await designInstance.getDesignJSON();
      res.status(200).send(design);
    } catch (error) {
      const errorValue: IError = error as IError;
      Logger.error(errorValue);
      next(errorValue);
    }
  });
};
