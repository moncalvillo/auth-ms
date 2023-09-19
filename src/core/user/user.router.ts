import { Router } from "express";
import { userController } from "./user.controller";

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/:userId", userController.getUser);
  }
}

export const userRouter = new UserRouter();
