import { Schema } from "mongoose";
import { MongooseClass } from "providers/database";
import { ValidationError } from "shared/customErros";

export const generateMongooseModel = (
  modelName: string,
  fields: Record<string, { type: string; required?: boolean; unique?: boolean }>
) => {
  const schemaFields: Record<string, any> = {};
  Object.keys(fields).forEach((field) => {
    const fieldConfig = fields[field];

    if (!Schema.Types.hasOwnProperty(fieldConfig.type)) {
      throw new ValidationError(`Type not supported: ${fieldConfig.type}`);
    }

    schemaFields[field] = {
      type: Schema.Types[fieldConfig.type as keyof typeof Schema.Types],
      required: !!fieldConfig.required,
      unique: !!fieldConfig.unique,
    };
  });
  const dynamicSchema = new Schema(schemaFields, { timestamps: true });
  modelName = modelName.replace(/\s/g, "");
  const model = MongooseClass.getAppsConnection().model(
    modelName,
    dynamicSchema,
    modelName
  );
  return model;
};
