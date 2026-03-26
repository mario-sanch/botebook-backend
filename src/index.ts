import { Express } from "express";
import { Server, createServer } from "http";
import { logger } from "./config/loggers";
import { validateEnv } from "./config/env.config";
import mongoose from "mongoose";
import { bootstrap } from "./loader/bootstrap";
//import sitemap from "express-sitemap-html";

const exitHandler = (server: Server | null) => {
  if (server) {
    server.close(async () => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server: Server) => {
  return function (error: Error) {
    logger.error(error);
    exitHandler(server);
  };
};

//const app: Express = express();

const startServer = async () => {
  const app: Express = await bootstrap();

  const httpServer = createServer(app);
  const { port } = validateEnv();

  //sitemap.swagger("Api Docs", app);

  const server: Server = httpServer.listen(port, () => {
    logger.info(`server listening on port ${port}`);
  });

  process.on("uncaughtException", unExpectedErrorHandler(server));
  process.on("unhandledRejection", unExpectedErrorHandler(server));
  process.on("SIGTERM", () => {
    logger.info("SIGTERM recieved");

    if (server) {
      server.close();
    }
  });

  mongoose.connection.on("error", (err) => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
  });

  //return server;
};

startServer();
