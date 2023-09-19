import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config } from "./config";
import { models } from "core";

export class SequelizeClass {
  private static instance: Sequelize;

  static async init() {
    if (!SequelizeClass.instance) {
      try {
        console.log("Initializing Sequelize...");
        this.instance = this.initSequelize(
          Config.database.host,
          Config.database.port,
          Config.database.username,
          Config.database.password,
          Config.database.name,
          Config.database.dialect
        );
        await this.instance.authenticate();
        console.log("Sequelize initialized.");
        await this.instance.sync();
        console.log("Sequelize models synchronized with the database.");
      } catch (e) {
        console.error("Failed to initialize Sequelize.");
        console.error(e);
      }
    }
  }

  private static initSequelize(
    host: string,
    port: string | number,
    username: string,
    password: string,
    name: string,
    dialect: string
  ): Sequelize {
    const sequelize = new Sequelize({
      host,
      port,
      username,
      password,
      database: name,
      dialect,
      models: models,
      logging: Config.nodeEnv === "development",
    } as SequelizeOptions);
    return sequelize;
  }

  static getInstance() {
    if (!SequelizeClass.instance) {
      SequelizeClass.init();
    }
    return SequelizeClass.instance;
  }
}
