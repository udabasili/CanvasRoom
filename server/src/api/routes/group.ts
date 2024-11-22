import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";
import {GroupService} from "@/services/group";
import Logger from "@/loaders/logger";
import {IError} from "@/interface";
import {getIO} from "@/loaders/socket";

export default (app: Router) => {
    const route = Router();
    let io;


    app.use('/group', route);

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
    route.get('/:groupId',
        celebrate({
            [Segments.PARAMS]: {
                groupId: Joi.string().required()
            }
        })
        ,
        async (req, res, next) => {
            try {
                const {groupId} = req.params;
                const groupServiceInstance = new GroupService()
                const group = await groupServiceInstance.getGroup(groupId)
                //join group chat
                //join group chat
                res.status(200).json({group})
            } catch (e) {
                const error = e as IError
                Logger.error('🔥 error: %o', error);
                return next(error);
            }
        })

    route.patch('/:groupId/join/:userId',
        celebrate({
            [Segments.PARAMS]: {
                userId: Joi.string().required(),
                groupId: Joi.string().required()
            }
        })
        ,
        async (req, res, next) => {
            try {
                const {userId, groupId} = req.params;
                const groupServiceInstance = new GroupService()
                const group = await groupServiceInstance.joinGroup(groupId, userId)
                io = getIO()
                //join group chat
                io.to(groupId).emit('joinGroup', {userId, groupId}); // Let the socket server know the user joined
                io.emit('joinGroup', { userId, groupId }); // Let the socket server know the user joined
                res.status(200).json({group})
            } catch (e) {
                const error = e as IError
                Logger.error('🔥 error: %o', error);
                return next(error);
            }
        })

    route.patch('/leave/:groupId/:userId',
        celebrate({
            [Segments.PARAMS]: {
                userId: Joi.string().required(),
                groupId: Joi.string().required()
            }
        })
        ,
        async (req, res, next) => {
            try {
                const {userId, groupId} = req.params;
                const groupServiceInstance = new GroupService()
                await groupServiceInstance.leaveGroup(groupId, userId)
                res.status(200).json({})
            } catch (e) {
                const error = e as IError
                Logger.error('🔥 error: %o', error);
                return next(error);
            }
        })
}