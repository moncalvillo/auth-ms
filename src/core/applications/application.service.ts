import { CryptoService } from "utils/crypto.service";
import { CodedError, NotFoundError, ValidationError } from "shared/customErros";

import {
  Application,
  IApplication,
  ApiKey,
  IApplicationDocument,
} from "./applications.model-mon";
import { generateMongooseModel } from "utils/generateDynamicSchema";
import mongoose, { omitUndefined } from "mongoose";
import { MongooseClass } from "providers/database";

export class ApplicationsService {
  registerApplication = async (
    data: Partial<IApplication>
  ): Promise<{ apiKey: string }> => {
    const {
      name,
      url,
      description,
      redirectUrl,
      domain,
      ip,
      schemaDefinition,
    } = data;

    if (!name || !schemaDefinition)
      throw new ValidationError("Name and schemaDefinition are required");

    try {
      const application = new Application({
        name,
        url,
        description,
        domain,
        redirectUrl,
        schemaDefinition,
        ip,
      });

      // first look for the application in the database
      const existingApp = await Application.findOne({ name });
      if (existingApp)
        throw new ValidationError("Application with this name already exists");

      await application.save();

      const appModel = await generateMongooseModel(name, schemaDefinition);
      await appModel.createCollection();

      const apiKey = this.generateApiKey(application.id);
      await this.saveApiKey(application.id, apiKey);

      return { apiKey };
    } catch (e: any) {
      if (e instanceof CodedError) {
        throw e;
      } else {
        throw new CodedError(500, e.message);
      }
    }
  };

  getApplicationApiKey = async (appId: string): Promise<string> => {
    const application = await this.findApplicationById(appId);
    const apiKey = await ApiKey.findOne({
      where: {
        applicationId: application._id,
        isActive: true,
      },
    });
    if (!apiKey)
      throw new NotFoundError(`Api key for application ${appId} not found`);

    return apiKey.key;
  };

  generateApplicationApiKey = async (appId: string): Promise<string> => {
    const application = await this.findApplicationById(appId);
    const apiKey = this.generateApiKey(application.id);
    await this.saveApiKey(appId, apiKey);
    return apiKey;
  };

  findApplicationById = async (
    appId: string
  ): Promise<IApplicationDocument> => {
    const application = await Application.findById(appId);
    if (!application) {
      throw new NotFoundError(`Application with id ${appId} not found`);
    }
    return application;
  };

  saveApiKey = async (applicationId: string, apiKey: string): Promise<void> => {
    await ApiKey.create({
      applicationId,
      key: apiKey,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    await ApiKey.updateOne(
      { isActive: false },
      {
        where: {
          applicationId,
          key: {
            $ne: apiKey,
          },
        },
      }
    );
  };

  generateApiKey = (appId: string): string => {
    return CryptoService.createHash(appId);
  };
}

export const applicationsService = new ApplicationsService();
