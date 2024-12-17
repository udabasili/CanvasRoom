import Logger from "@/loaders/logger";
import { Answer, AnswerModel, Question, QuestionModel } from "@/model";
import {
  IAnswer,
  CreateAnswerDto,
  CreateQuestionDto,
} from "@/interface/IQuestionnaire";
import { Types } from "mongoose";

export class Questionnaire {
  private logger: typeof Logger;
  private answerModel: AnswerModel;
  private questionModel: QuestionModel;

  constructor() {
    this.logger = Logger;
    this.questionModel = Question;
    this.answerModel = Answer;
  }

  public async createQuestion(input: CreateQuestionDto) {
    this.logger.silly("Creating Question of title " + input.title);
    await this.questionModel.create({
      title: input.title,
      body: input.body,
      channel: new Types.ObjectId(input.channel),
      askedBy: new Types.ObjectId(input.askedBy),
    });
  }

  public async answerQuestion(input: CreateAnswerDto) {
    this.logger.silly("Creating Answer  of question" + input.question);
    await this.answerModel.create({
      answer: input.answer,
      question: new Types.ObjectId(input.question),
      answeredBy: new Types.ObjectId(input.answeredBy),
    });
  }

  public async getAllQuestions() {
    this.logger.silly("Getting all questions");
    const questionRecords = await this.questionModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("channel", ["name"])
      .populate("askedBy", ["name"])
      .populate("answers", ["answer", "answeredBy"]);
    return questionRecords;
  }

  public async getAnswers(questionId: string) {
    this.logger.silly("Getting answers for question " + questionId);
    const answerRecords = await this.answerModel
      .find({ question: questionId })
      .populate("answeredBy", ["name"]);
    return answerRecords;
  }
}
