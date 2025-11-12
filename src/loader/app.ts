import { config } from "dotenv";
import express from "express";
const morgan = require("morgan");
import helmet from "helmet";
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "../middleware/index.middleware";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { corsOptions } from "../config/corsOptions";
import { errorHandler, successHandler } from "../config/morgan";
import api from "../api/index.api";

config();

export const bootstrapExpress = (app: any) => {
  app.use(successHandler);
  app.use(errorHandler);
  app.use(ExpressMongoSanitize());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

  app.use("/api/", api);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
};

//const app = express();

//export default app;
