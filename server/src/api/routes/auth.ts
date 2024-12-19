import { Router } from "express";
import { celebrate, errors, Joi, Segments } from "celebrate";
import { AuthService } from "@/services/auth";
import { CreateUserDto } from "@/interface/IUser";
import Logger from "@/loaders/logger";
import { TokenService } from "@/services/token";
import { IError } from "@/interface";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";

const router = Router();

export default (app: Router) => {
  app.use("/auth", router);

  router.get("/refresh-token", async (req, res, next) => {
    try {
      const refreshToken = req.cookies["x-token-refresh"];
      const accessToken = await TokenService.reIssueAccessToken(refreshToken);
      res.json({ accessToken });
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });

  router.post(
    "/register",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().valid("user", "admin").default("user"),
      }),
    }),
    async (req, res, next) => {
      try {
        const authServiceInstance = new AuthService();
        Logger.debug("Calling Register endpoint with body: %o", req.body);
        const { user, token } = await authServiceInstance.register(
          req.body as CreateUserDto,
        );
        res.cookie("refreshToken", token.refreshToken, {
          httpOnly: true,
          secure: true,
        });
        res.json({ user, accessToken: token.accessToken });
      } catch (e) {
        const error = e as ErrorHandler;
        errHandler(res, error, error.status);
      }
    },
  );

  router.post(
    "/login",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const authServiceInstance = new AuthService();
        Logger.debug("Calling Login endpoint with body: %o", req.body);
        const { user, token } = await authServiceInstance.login(req.body);
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // milliseconds
        res.cookie("x-token-refresh", token.refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: sevenDays,
        });
        res.status(200).json({ user, accessToken: token.accessToken });
      } catch (e) {
        const error = e as ErrorHandler;
        errHandler(res, error, error.status);
      }
    },
  );

  router.get("/logout", async (req, res, next) => {
    try {
      const authInstance = new AuthService();
      Logger.debug("Calling Logout endpoint");
      const tokenRemoved = await authInstance.logout(
        req.cookies["x-token-refresh"],
      );
      if (!tokenRemoved) {
        throw new Error("Error logging out");
      }
      res.clearCookie("x-token-refresh");
      res.json({ message: "Logged out" });
    } catch (e) {
      const error = e as ErrorHandler;
      errHandler(res, error, error.status);
    }
  });
};
