import Logger from "@/loaders/logger";
import { Answer, AnswerModel, Question, QuestionModel } from "@/model";
import {
  IAnswer,
  CreateAnswerDto,
  CreateQuestionDto,
  IQuestion,
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

  public async getAllQuestions(channelID: string) {
    this.logger.silly("Getting all questions");
    const questionRecords = await this.questionModel
      .find({
        channel: new Types.ObjectId(channelID),
      })
      .sort({ createdAt: -1 })
      .populate("channel", ["name"])
      .populate("askedBy", ["username"]);
    return questionRecords;
  }

  public async getAnswers(questionId: string): Promise<{
    answerRecords: IAnswer[];
    question: IQuestion;
    answerCount: number;
  }> {
    this.logger.silly("Getting answers for question " + questionId);
    const questionRecord = await this.questionModel.findById(questionId);
    if (!questionRecord) {
      throw new Error("Question not found");
    }
    const question = await this.getQuestion(questionId);
    const answerRecords = await this.answerModel
      .find({ question: questionId })
      .populate("answeredBy", ["username"])
      .populate("question", ["title, description"]);
    const answerCount = await this.answerModel.countDocuments({
      question: questionId,
    });
    return { answerRecords, answerCount, question };
  }

  private async getQuestion(questionId: string) {
    const questionRecord = await this.questionModel
      .findById(questionId)
      .populate("channel", ["name"])
      .populate("askedBy", ["username"]);
    if (!questionRecord) {
      throw new Error("Question not found");
    }
    const question = questionRecord.toObject();
    return question;
  }
}
