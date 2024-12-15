/**
 * export interface IQuestion extends Document {
 *   id: string;
 *   question: string;
 *   channel: mongoose.Types.ObjectId;
 *   answers: mongoose.Types.ObjectId[];
 *   askedBy: mongoose.Types.ObjectId;
 * }
 *
 * export interface IAnswer {
 *   answer: string;
 *   question: mongoose.Types.ObjectId;
 *   answeredBy: mongoose.Types.ObjectId;
 * }
 */
import { model, Model, Schema } from "mongoose";
import { IAnswer, IQuestion } from "@/interface/IQuestionnaire";

export type AnswerModel = Model<IAnswer>;

const answerSchema = new Schema({
  answer: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answeredBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export type QuestionModel = Model<IQuestion>;

const questionSchema = new Schema({
  question: { type: String, required: true },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  askedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

//delete all answers when a question is deleted
questionSchema.post("deleteOne", async function (doc) {
  new this.model("Answer").deleteMany({ question: doc._id });
});

export const Question = model<IQuestion>("Question", questionSchema);
export const Answer = model<IAnswer>("Answer", answerSchema);
