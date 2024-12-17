import { NextFunction, Router } from "express";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";
import { celebrate, Joi } from "celebrate";

export default (app: Router) => {
  const route = Router({ mergeParams: true });

  app.use("/:userId/answers", confirmAuthentication, setCurrentUser, route);

  //answer a question
  route.post(
    "/",
    celebrate({
      body: {
        question: Joi.string().required(),
        answer: Joi.string().required(),
      },
    }),
    async (req: any, res: any, next: NextFunction) => {
      try {
        const { question, answer } = req.body;
        const answeredBy = req.currentUser.id;
        await req.services.questionnaire.answerQuestion({
          question,
          answer,
          answeredBy,
        });
        res.status(201).json({ message: "Answer created successfully" });
      } catch (error) {
        next(error);
      }
    },
  );
};
