import { Schema } from "mongoose";
import { MongooseClass } from "providers/database";

export const generateMongooseModel = (
  modelName: string,
  fields: Record<string, string>
) => {
  const schemaFields: Record<string, any> = {};
  Object.keys(fields).forEach((field) => {
    const typeKey = fields[field] as keyof typeof Schema.Types;
    if (!Schema.Types.hasOwnProperty(typeKey)) {
      throw new Error(`Type not supported: ${fields[field]}`);
    }
    schemaFields[field] = Schema.Types[typeKey];
  });
  const dynamicSchema = new Schema(schemaFields, { timestamps: true });
  modelName = modelName.replace(/\s/g, "");
  const model = MongooseClass.getAppsConnection()?.model(
    modelName,
    dynamicSchema,
    modelName
  );
  return model;
};
