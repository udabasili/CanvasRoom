import customers from "./routes/customers";
import {Router} from "express";

export default () => {
    const app = Router();
    customers(app);
    return app;
}