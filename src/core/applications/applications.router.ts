import { authController } from "core/auth/auth.controller";
import { Router } from "express";
import { applicationsController } from "./applications.controller";

export class ApplicationsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", applicationsController.registerApplication);
    this.router.get(
      "/:appId/apiKey",
      applicationsController.getApplicationApiKey
    );
    this.router.post(
      "/:appId/apiKey/regenerate",
      applicationsController.generateApplicationApiKey
    );
  }
}

export const applicationsRouter = new ApplicationsRouter();
