import { NextFunction, Request, Response } from "express";
import { applicationsService } from "./application.service";

class ApplicationsController {
  registerApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, url, description, redirectUrl } = req.body;
      const ip = req.ip || req.headers["x-forwarded-for"]?.[0];
      const domain = req.headers.host;

      const { apiKey } = await applicationsService.registerApplication({
        name,
        url,
        description,
        redirectUrl,
        ip,
        domain,
      });

      return res.status(201).json({ apiKey });
    } catch (e) {
      next(e);
    }
  };

  getApplicationApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appId } = req.params;
      const apiKey = await applicationsService.getApplicationApiKey(appId);

      return res.status(200).json({ apiKey });
    } catch (e) {
      next(e);
    }
  };

  generateApplicationApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { appId } = req.params;
      const apiKey = await applicationsService.generateApplicationApiKey(appId);

      return res.status(200).json({ apiKey });
    } catch (e) {
      next(e);
    }
  };
}

export const applicationsController = new ApplicationsController();
