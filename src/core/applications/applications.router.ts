import { authController } from "core/auth/auth.controller";
import { Router } from "express";
import { applicationsController } from "./applications.controller";
import { authenticate } from "core/middlewares/authenticate";

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
      authenticate,
      applicationsController.getApplicationApiKey
    );
    this.router.post(
      "/:appId/apiKey/regenerate",
      authenticate,
      applicationsController.generateApplicationApiKey
    );

    this.router.get("/test", (req, res) => {
      const ip = req.ip || req.headers["x-forwarded-for"];
      console.log("IP: ", ip);
      res.send("Test successful: " + ip);
    });
  }
}

export const applicationsRouter = new ApplicationsRouter();
