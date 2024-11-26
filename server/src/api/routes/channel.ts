import { Router } from "express";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  app.use("/channel", route);

  /**
   * - Ask questions
   * - Share resources
   * - Project ideas
   * - Start coding project and allow others to code
   * - Design a project
   * - Frequently asked questions
   * - External resources (links)
   */
};
