import express, { Application, NextFunction, Request, Response } from "express";
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
  if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "../../public")));
  }

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

  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found") as ErrorHandlerProps;
    error.status = 404;
    next(error);
  });

  app.use(
    (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    },
  );
  //Put this after all middleware. Otherwise, Heroku will give you 304 page
  if (process.env.NODE_ENV !== "development") {
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "./../public", "index.html"));
    });
  }
};
