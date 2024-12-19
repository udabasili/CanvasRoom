import { NextFunction, Router } from "express";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { celebrate, Joi } from "celebrate";
import { IError } from "@/interface";
import Logger from "@/loaders/logger";
import { Questionnaire } from "@/services/questionnaire";

export default (app: Router) => {
  const route = Router({ mergeParams: true });

  app.use("/:userId/question", confirmAuthentication, setCurrentUser, route);

  //answer a question
  route.post(
    "/answer",
    celebrate({
      body: {
        question: Joi.string().required(),
        answer: Joi.string().required(),
      },
    }),
    async (req: any, res: any, next: NextFunction) => {
      try {
        Logger.debug("Calling Answer Question endpoint");
        const { question, answer } = req.body;
        const answeredBy = req.currentUser._id;
        const questionInstance = new Questionnaire();
        await questionInstance.answerQuestion({
          question,
          answer,
          answeredBy,
        });
        res.status(201).json({ message: "Answer created successfully" });
      } catch (e) {
        const error = e as IError;
        Logger.error(error.message);
        return next(error);
      }
    },
  );
};
