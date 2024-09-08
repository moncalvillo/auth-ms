import { authController } from "core/auth/auth.controller";
import { Router } from "express";
import { authenticate } from "core/middlewares/authenticate";

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.use(authenticate);
    this.router.post("/login", authController.login);
    this.router.post("/register", authController.register);
    this.router.post("/refresh-token", authController.refreshToken);
    this.router.post("/verify-token", authController.verifyToken);
  }
}

export const authRouter = new AuthRouter();
