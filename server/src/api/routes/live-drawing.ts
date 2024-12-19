import { Router } from "express";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";
import Logger from "@/loaders/logger";
import { LiveDrawingService } from "@/services/live-drawing";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });

  app.use(
    "/:userId/live-drawing",
    confirmAuthentication,
    setCurrentUser,
    route,
  );

  route.get("/:channelId", async (req, res, next) => {
    try {
      Logger.debug("Calling live-drawing get");
      const { channelId } = req.params;
      const liveDrawingInstance = new LiveDrawingService(channelId);
      const liveDrawing = await liveDrawingInstance.getDrawing();
      res.status(200).json({ liveDrawing });
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });

  route.post("/:channelId", async (req, res, next) => {
    try {
      Logger.debug("Calling live-drawing post");
      const { channelId } = req.params;
      const liveDrawingInstance = new LiveDrawingService(channelId);
      const { liveDrawing } = req.body;
      await liveDrawingInstance.draw(liveDrawing);
      res.status(200).send("Drawing saved");
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });
};
