import { model, Model, Schema } from "mongoose";
import { IAnswer, IQuestion } from "@/interface/IQuestionnaire";

export type QuestionModel = Model<IQuestion>;

const questionSchema = new Schema<IQuestion, QuestionModel>(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String },
    channel: { type: Schema.Types.ObjectId, ref: "Channel" },
    askedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

//delete all answers when a question is deleted
questionSchema.post("deleteOne", async function (doc) {
  new this.model("Answer").deleteMany({ question: doc._id });
});
export type AnswerModel = Model<IAnswer>;

const answerSchema = new Schema<IAnswer, IAnswer>(
  {
    answer: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    answeredBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const Question = model<IQuestion>("Question", questionSchema);
export const Answer = model<IAnswer>("Answer", answerSchema);
