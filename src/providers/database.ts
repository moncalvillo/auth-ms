import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config } from "./config";
import { models } from "core";
import { Mongoose } from "mongoose";

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
            rejectUnauthorized: false,
          },
        },

        logging: Config.nodeEnv !== "development" ? false : console.log,
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

export class MongooseClass {
  private static instance: Mongoose;

  static async init() {
    if (!MongooseClass.instance) {
      try {
        this.instance = await this.initMongoose();
      } catch (e) {
        console.error("Failed to initialize Mongoose.");
        console.error(e);
      }
    }
  }

  private static async initMongoose(): Promise<Mongoose> {
    console.log(Config);
    const mongooseObject = new Mongoose();
    if (!Config.database.url) {
      throw new Error("Database URL not provided.");
    }
    const mongooseInstance = await mongooseObject.connect(Config.database.url);
    if (!mongooseInstance) {
      throw new Error("Failed to connect to the database.");
    }
    return mongooseInstance;
  }

  static async getInstance() {
    if (!MongooseClass.instance) {
      await MongooseClass.init();
    }
    return MongooseClass.instance;
  }
}
