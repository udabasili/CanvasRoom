import { User } from '@/features/user';

export interface Question {
  _id: string;
  title: string;
  body?: string;
  channel: string;
  askedBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  _id: string;
  answer: string;
  question: string;
  answeredBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionDto {
  title: string;
  body?: string;
  channel: string;
}

export interface AnswerDto {
  answer: string;
  question: string;
}

export type ApiQuestionsResponse = {
  questions: Question[]; // API returns a 'group' property containing an array of groups
};
