import { authRouter } from "core/auth/auth.router";
import { Config } from "./config";
import { MongooseClass, SequelizeClass } from "./database";
import express from "express";
import { userRouter } from "core/user/user.router";
import { errorHandler } from "core/middlewares/error/error.handler";
import { applicationsRouter } from "core/applications/applications.router";

export class AuhtServer {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  public async init() {
    // await SequelizeClass.init();
    await MongooseClass.init();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.set("trust proxy", true);
    this.app.use("/applications", applicationsRouter.router);

    this.app.use("/auth", authRouter.router);
    this.app.use("/users", userRouter.router);
    this.app.use(errorHandler);

    this.app.listen(Config.server.port, () => {
      console.log(
        `Server started at ${Config.server.url}:${Config.server.port}`
      );
    });
  }
}

export default new AuhtServer();
