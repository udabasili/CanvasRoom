export interface Question {
  _id: string;
  title: string;
  body?: string;
  channel: string;
  askedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  _id: string;
  answer: string;
  question: string;
  answeredBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionDto {
  title: string;
  body?: string;
  channel: string;
  askedBy: string;
}

export interface AnswerDto {
  answer: string;
  question: string;
  answeredBy: string;
}
