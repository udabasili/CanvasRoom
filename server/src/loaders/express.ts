import express, { Application, NextFunction } from "express";
import cors from "cors";
import routes from "@/api";
import config from "@/config";
import { isCelebrateError } from "celebrate";
import cookieParser from "cookie-parser";
import path from "path";
import {
  ErrorHandler,
  ErrorHandlerProps,
} from "@/api/middlewares/errorHandler";

export default ({ app }: { app: Application }) => {
  app.use(express.static(path.join(__dirname, "../../public")));

  app.get("/status", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.prefix, routes());

  /// error handlers

  app.use((req, res, next) => {
    const error = new ErrorHandler("Not Found", 404);
    return next(error);
  });

  app.use((err: ErrorHandlerProps, req: any, res: any, next: any) => {
    if (isCelebrateError(err)) {
      const errorBody = err.details.get("body")?.message; // 'details' is a Map()
      err.message = errorBody || "";
    }
    res.status(err.status || 500);
    return res.json({
      message: err.message,
    });
  });

  app.use((req: any, res: any, next: NextFunction) => {
    const error = new Error("Not found");
    res.status(404);
    next(error);
  });
  //Put this after all middleware. Otherwise, Heroku will give you 304 page
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./../public", "index.html"));
  });
};
