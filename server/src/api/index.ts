import auth from "./routes/auth";
import group from "./routes/group";
import channel from "./routes/channel";
import { Router } from "express";
import user from "@/api/routes/user";
import { errors } from "celebrate";
import publicRoute from "@/api/routes/public";

export default () => {
  const app = Router();

  publicRoute(app);
  auth(app);
  group(app);
  channel(app);
  user(app);
  app.use(errors());
  return app;
};
