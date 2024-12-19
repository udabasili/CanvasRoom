import setCurrentUser from "./setCurrentUser";
import confirmAuthentication from "./confirmAuthentication";
import { errHandler, ErrorHandler } from "@/api/middlewares/errorHandler";

export default {
  setCurrentUser,
  confirmAuthentication,
  errHandler,
  ErrorHandler,
};
