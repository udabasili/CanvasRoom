import { Router } from "express";
import { celebrate, errors, Joi, Segments } from "celebrate";
import { AuthService } from "@/services/auth";
import { CreateUserDto } from "@/interface/IUser";
import Logger from "@/loaders/logger";
import { TokenService } from "@/services/token";
import { IError } from "@/interface";

const router = Router();

export default (app: Router) => {
  app.use("/auth", router);

  router.get("/refresh-token", async (req, res, next) => {
    try {
      const refreshToken = req.cookies["x-token-refresh"];
      const accessToken = await TokenService.reIssueAccessToken(refreshToken);
      res.json({ accessToken });
    } catch (e) {
      const error = e as IError;
      Logger.error("🔥 error: %o", error);
      return next(error);
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
        const error = e as Error;
        Logger.error("🔥 error: %o", error);
        return next(error);
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
        const error = e as Error;
        Logger.error("🔥 error: %o", error);
        return next(error);
      }
    },
  );
};
