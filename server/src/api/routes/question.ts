import express, { NextFunction, Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Question } from "@/model";
import { Questionnaire } from "@/services/questionnaire";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  app.use("/:userId/question", confirmAuthentication, setCurrentUser, route);

  route.post(
    "/",
    celebrate({
      body: {
        title: Joi.string().required(),
        body: Joi.string(),
        channel: Joi.string().required(),
      },
    }),
    async (req: express.Request, res: express.Response) => {
      try {
        const { title, body, channel } = req.body;
        const askedBy = req.currentUser._id;
        const questionInstance = new Questionnaire();
        await questionInstance.createQuestion({
          title,
          body,
          askedBy,
          channel,
        });
        res.status(200).send("Question created successfully");
      } catch (error) {
        res.status(400).send(error);
      }
    },
  );

  route.get(
    "/:channelId",
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      try {
        Logger.debug("Calling Get Questions endpoint");
        const { channelId } = req.params;
        const questionInstance = new Questionnaire();
        const questions = await questionInstance.getAllQuestions(channelId);
        res.status(200).json({ questions });
      } catch (e) {
        console.log(e);
        const error = e as IError;
        Logger.error("🔥 error: %o", error);
        return next(error);
      }
    },
  );

  route.get(
    "/:questionId/answers",
    async (req: express.Request, res: express.Response, next: NextFunction) => {
      try {
        Logger.debug("Calling Get Answers endpoint");
        const { questionId } = req.params;
        const questionInstance = new Questionnaire();
        const { answerRecords, answerCount, question } =
          await questionInstance.getAnswers(questionId);
        res.status(200).json({ answers: answerRecords, answerCount, question });
      } catch (e) {
        const error = e as IError;
        Logger.error("🔥 error: %o", error);
        return next(error);
      }
    },
  );
};
