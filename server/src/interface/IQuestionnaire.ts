import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document {
  id: string;
  question: string;
  channel: mongoose.Types.ObjectId;
  answers: mongoose.Types.ObjectId[];
  askedBy: mongoose.Types.ObjectId;
}

export interface IQuestionInputDTO extends Document {
  question: string;
}

export interface IAnswer {
  answer: string;
  question: mongoose.Types.ObjectId;
  answeredBy: mongoose.Types.ObjectId;
}

export interface IAnswerInputDTO {
  answer: string;
}
