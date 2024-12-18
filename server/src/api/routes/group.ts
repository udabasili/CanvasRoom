import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { GroupService } from "@/services/group";
import Logger from "@/loaders/logger";
import { IError } from "@/interface";
import { getIO } from "@/loaders/socket";
import confirmAuthentication from "@/api/middlewares/confirmAuthentication";
import setCurrentUser from "@/api/middlewares/setCurrentUser";

export default (app: Router) => {
  const route = Router({
    mergeParams: true,
  });
  let io;

  app.use("/:userID/groups", confirmAuthentication, setCurrentUser, route);

  /**
	 * Types of groups:
	 * Java group
	 * Python group
	 * JavaScript group
	 * C++ group
	 * C# group
	 * Design group
	 *
	 * Under each group we have channels

	 */
  //get all groups for a user
  route.get("/", async (req, res, next) => {
    try {
      const groupServiceInstance = new GroupService();
      const groups = await groupServiceInstance.getUserGroups(
        req.currentUser._id,
      );
      res.status(200).json({ groups });
    } catch (e) {
      const error = e as IError;
      Logger.error("🔥 error: %o", error);
      return next(error);
    }
  });

  //create group
  route.post(
    "/create",
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { name, description, language } = req.body;
        const owner = req.currentUser._id;
        const groupServiceInstance = new GroupService();
        const group = await groupServiceInstance.createGroup({
          name,
          description,
          language,
          owner,
        });
        res.status(200).json({ group });
      } catch (e) {
        const error = e as IError;
        Logger.error(error.message);
        return next(error);
      }
    },
  );

  route.get(
    "/:groupId",
    celebrate({
      [Segments.PARAMS]: {
        groupId: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { groupId } = req.params;
        const groupServiceInstance = new GroupService();
        const group = await groupServiceInstance.getGroup(groupId);
        //join group chat
        //join group chat
        res.status(200).json({ group });
      } catch (e) {
        const error = e as IError;
        Logger.error(error.message);
        return next(error);
      }
    },
  );

  route.patch(
    "/:groupId/join/",
    celebrate({
      [Segments.PARAMS]: {
        groupId: Joi.string().required(),
        userID: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        console.log(req.params);
        const { userID, groupId } = req.params;
        const groupServiceInstance = new GroupService();
        const group = await groupServiceInstance.joinGroup(groupId, userID);
        res.status(200).json({ group });
      } catch (e) {
        const error = e as IError;
        Logger.error(error.message);
        return next(error);
      }
    },
  );

  route.patch(
    "/leave/:groupId/:leavingUserId",
    celebrate({
      [Segments.PARAMS]: {
        leavingUserId: Joi.string().required(),
        groupId: Joi.string().required(),
      },
    }),
    async (req, res, next) => {
      try {
        const { leavingUserId, groupId } = req.params;
        const groupServiceInstance = new GroupService();
        await groupServiceInstance.leaveGroup(groupId, leavingUserId);
        res.status(200).json({});
      } catch (e) {
        const error = e as IError;
        Logger.error(error.message);
        return next(error);
      }
    },
  );
};
