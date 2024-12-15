import auth from "./routes/auth";
import group from "./routes/group";
import code from "./routes/code";
import { Router } from "express";
import user from "@/api/routes/user";
import { errors } from "celebrate";
import publicRoute from "@/api/routes/public";
import chat from "@/api/routes/chat";

export default () => {
  const app = Router();

  publicRoute(app);
  auth(app);
  group(app);
  code(app);
  user(app);
  chat(app);
  app.use(errors());
  return app;
};
