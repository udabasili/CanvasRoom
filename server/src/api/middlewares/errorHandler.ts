import { Response } from "express";
import mongoose from "mongoose";
import Logger from "@/loaders/logger";
import { isCelebrateError } from "celebrate";

export class ErrorHandler extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export interface ErrorHandlerProps extends Error {
  message: string;
  status: number;
}

const mongooseErrHandler = (err: mongoose.Error) => {
  const errs = [];
  Logger.error("Error: %o", err);
  if (err instanceof mongoose.Error.ValidationError) {
    Object.keys(err.errors).forEach((key) => {
      Logger.error(err.errors[key].message);
      errs.push(err.errors[key].message);
    });
  } else if (isCelebrateError(err)) {
    const errorBody = err.details.get("body")?.message; // 'details' is a Map()
    if (errorBody) {
      errs.push(errorBody);
    }
  } else {
    errs.push(err.message);
  }
  return errs;
};

export const errHandler = (res: Response, err: any, code: number) => {
  code = code || 500;
  const errs = mongooseErrHandler(err);
  res.status(code).json({
    errors: errs,
  });
};
