import express, { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Question } from "@/model";
import { Questionnaire } from "@/services/questionnaire";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";

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
        const askedBy = req.currentUser.id;
        const questionInstance = new Questionnaire();
        await questionInstance.createQuestion({
          title,
          body,
          channel,
          askedBy,
        });
        res.status(200).send("Question created successfully");
      } catch (error) {
        res.status(400).send(error);
      }
    },
  );

  route.get("/", async (req: express.Request, res: express.Response) => {
    try {
      const questionInstance = new Questionnaire();
      const questions = await questionInstance.getAllQuestions();
      res.status(200).send(questions);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  route.get(
    "/:questionId/answers",
    async (req: express.Request, res: express.Response) => {
      try {
        const { questionId } = req.params;
        const questionInstance = new Questionnaire();
        const answers = await questionInstance.getAnswers(questionId);
        res.status(200).send(answers);
      } catch (error) {
        res.status(400).send(error);
      }
    },
  );
};
