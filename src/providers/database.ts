import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config } from "./config";
import { models } from "core";

export class SequelizeClass {
  private static instance: Sequelize;

  static async init() {
    if (!SequelizeClass.instance) {
      try {
        console.log("Initializing Sequelize...");
        this.instance = this.initSequelize();
        await this.instance.authenticate();
        console.log("Sequelize initialized.");
        await this.instance.sync({
          logging: Config.nodeEnv === "development" ? console.log : false,
        });
        console.log("Sequelize models synchronized with the database.");
      } catch (e) {
        console.error("Failed to initialize Sequelize.");
        console.error(e);
      }
    }
  }

  private static initSequelize(): Sequelize {
    if (Config.database.url) {
      const sequelize = new Sequelize(Config.database.url, {
        ssl: true,
        models: models,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: Config.nodeEnv !== "development",
          },
        },
        logging: Config.nodeEnv === "development" ? console.log : false,
      } as SequelizeOptions);

      return sequelize;
    }
    return new Sequelize({
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: Config.nodeEnv !== "development",
        },
      },
      host: Config.database.host,
      port: Config.database.port,
      username: Config.database.username,
      password: Config.database.password,
      database: Config.database.name,
      dialect: Config.database.dialect,
      models: models,
      logging: Config.nodeEnv === "development" ? console.log : false,
    } as SequelizeOptions);
  }

  static getInstance() {
    if (!SequelizeClass.instance) {
      SequelizeClass.init();
    }
    return SequelizeClass.instance;
  }
}
