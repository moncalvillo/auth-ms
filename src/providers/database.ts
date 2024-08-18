import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config } from "./config";
import { models } from "core";
import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

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
  private static instance: {
    general: Connection;
    apps: Connection;
  };

  static init() {
    if (!MongooseClass.instance) {
      try {
        this.instance = this.initMongoose();
        return this.instance;
      } catch (e) {
        console.error("Failed to initialize Mongoose.");
        console.error(e);
      }
    }
  }

  private static initMongoose(): {
    general: Connection;
    apps: Connection;
  } {
    console.log("Initializing Mongoose...");
    if (!Config.database.generalUrl || !Config.database.appsUrl) {
      throw new Error("Database URL not provided.");
    }
    const general = mongoose.createConnection(Config.database.generalUrl);
    const apps = mongoose.createConnection(Config.database.appsUrl);
    const mongooseInstance = {
      general,
      apps,
    };

    if (!mongooseInstance.general || !mongooseInstance.apps) {
      throw new Error("Failed to connect to the database.");
    }
    console.log("Mongoose initialized.");
    return mongooseInstance;
  }

  static getInstance() {
    if (!MongooseClass.instance) {
      return MongooseClass.init();
    }
    return MongooseClass.instance;
  }

  static getGeneralConnection() {
    if (!MongooseClass.instance) {
      return MongooseClass.init()!.general;
    }
    return MongooseClass.instance?.general;
  }

  static getAppsConnection() {
    if (!MongooseClass.instance) {
      return MongooseClass.init()!.general;
    }
    return MongooseClass.instance?.apps;
  }
}
