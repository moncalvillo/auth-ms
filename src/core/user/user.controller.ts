import { Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
  getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await userService.getUserByIdExcludeAttrs(userId, "password");
    return res.status(200).json(user);
  };
}

export const userController = new UserController();
