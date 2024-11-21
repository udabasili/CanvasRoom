
import auth from './routes/auth';
import group from './routes/group';
import channel from './routes/channel';
import {Router} from "express";
import user from "@/api/routes/user";

export default () => {
    const app = Router();

    auth(app);
    group(app);
    channel(app);
    user(app);
    return app;
}