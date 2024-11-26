import { Router } from "express";
import confirmAuthentication from "../middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";

export default (app: Router) => {
  const route = Router();

  app.get("/auth/me", confirmAuthentication, setCurrentUser, (req, res) => {
    res.status(200).json({ user: req.currentUser });
  });

  app.use("/user", route);
};
