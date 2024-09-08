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

  login = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;

    const { token } = await authService.login({
      email,
      password,
      nickname,
      application: req.application,
    });
    return res.status(200).json({ token });
  };

  refreshToken = (req: Request, res: Response) => {};
  verifyToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    const isValid = await authService.verifyToken(token);
    return res.status(200).json({ isValid });
  };
}

export const authController = new AuthController();
