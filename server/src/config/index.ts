import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
//only load the .env file if it exists and only check for development and test environments
if (
  envFound.error &&
  (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
) {
  throw new Error("Couldn't find .env file");
}
export default {
  port: parseInt(process.env.PORT as string, 10),
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: "/api",
  },
  mongodbUri: process.env.MONGODB_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRY,
  appUrl: process.env.APP_URL,
};
