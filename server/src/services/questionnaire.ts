import Logger from "@/loaders/logger";
import { Answer, AnswerModel, Question, QuestionModel } from "@/model";
import {
  IAnswer,
  CreateAnswerDto,
  CreateQuestionDto,
} from "@/interface/IQuestionnaire";

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
    await this.questionModel.create(input);
  }

  public async answerQuestion(input: CreateAnswerDto) {
    this.logger.silly("Creating Answer  of question" + input.question);
    await this.answerModel.create(input);
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
