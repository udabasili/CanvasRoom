import { Router } from "express";
import { CodeService } from "@/services/code";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";
import { ChatService } from "@/services/chat";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  app.use("/:userId/chat", confirmAuthentication, setCurrentUser, route);

  route.get("/private", async (req, res, next) => {
    try {
      // @ts-ignore
      const { userId } = req.params;
      const chatInstance = new ChatService();
      const chat = await chatInstance.getPrivateChat(userId);
      res.status(200).json(chat);
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });

  route.get("/:channelId", async (req, res, next) => {
    try {
      // @ts-ignore
      const { channelId } = req.params;
      const chatInstance = new ChatService(channelId);
      const chat = await chatInstance.getChannelChat();
      res.status(200).json({ chat });
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });
};
