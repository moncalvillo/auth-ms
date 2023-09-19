import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, surname, profilePictureUrl, nickname } =
        req.body;
      const { token } = await authService.register({
        email,
        password,
        name,
        surname,
        profilePictureUrl,
        nickname,
      });
      return res.status(201).json({ token });
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, nickname } = req.body;
      const { token } = await authService.login({ email, password, nickname });
      return res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  refreshToken = (req: Request, res: Response) => {};
}

export const authController = new AuthController();
