import { Document, Schema, model } from "mongoose";
import { MongooseClass } from "providers/database";

export interface IApplication {
  name: string;
  url?: string;
  domain?: string;
  description?: string;
  redirectUrl?: string;
  schemaDefinition: Record<
    string,
    {
      type: string;
      required?: boolean;
      unique?: boolean;
    }
  >;
  ip?: string;
}

export interface IApplicationDocument extends Document, IApplication {}

const applicationSchema = new Schema<IApplicationDocument>(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: false },
    domain: { type: String, required: false },
    description: { type: String, required: false },
    redirectUrl: { type: String, required: false },
    schemaDefinition: {
      type: Map,
      of: new Schema({
        type: { type: String, required: true },
        required: { type: Boolean, required: false },
        unique: { type: Boolean, required: false },
      }),
      required: true,
    },
    ip: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Application =
  MongooseClass.getGeneralConnection()?.model<IApplicationDocument>(
    "Applications",
    applicationSchema
  );

export interface IApiKey {
  applicationId: string;
  key: string;
  expiryDate: Date;
  isActive: boolean;
}

export interface IApiKeyDocument extends Document, IApiKey {}

const apiKeySchema = new Schema<IApiKeyDocument>(
  {
    applicationId: { type: String, required: true },
    key: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export const ApiKey =
  MongooseClass.getGeneralConnection()?.model<IApiKeyDocument>(
    "ApiKeys",
    apiKeySchema
  );
