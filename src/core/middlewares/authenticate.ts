import {
  ApiKey,
  Application,
  IApplicationDocument,
} from "core/applications/applications.model-mon";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export type AuthenticatedRequestHandler = RequestHandler<
  ParamsDictionary,
  any,
  any,
  qs.ParsedQs,
  AuthenticatedRequest
>;

declare global {
  namespace Express {
    interface Request {
      application?: IApplicationDocument;
    }
  }
}
interface AuthenticatedRequest extends Request {
  application: IApplicationDocument;
}

export const authenticate: AuthenticatedRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).send("API Key is required");
  }

  const apiKeyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });
  if (!apiKeyDoc) {
    return res.status(401).send("Invalid API Key");
  }

  const application = await Application.findById(apiKeyDoc.applicationId);
  if (!application) {
    return res.status(401).send("Application not found");
  }

  (req as AuthenticatedRequest).application = application.toJSON();
  next();
};
