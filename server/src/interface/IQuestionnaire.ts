import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document {
  id: string;
  title: string;
  body?: string;
  channel: mongoose.Types.ObjectId;
  askedBy: mongoose.Types.ObjectId;
}

export interface CreateQuestionDto {
  title: string;
  body?: string;
  channel: string;
  askedBy: string;
}

export interface IAnswer {
  answer: string;
  question: mongoose.Types.ObjectId;
  answeredBy: mongoose.Types.ObjectId;
}

export interface CreateAnswerDto {
  question: string;
  answer: string;
  answeredBy: string;
}
