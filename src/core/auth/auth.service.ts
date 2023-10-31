import { IUserModel } from "core/models";
import { userService } from "core/user/user.service";
import { AuthHelper } from "./auth.helper";

export class AuthService {
  login = async (data: any): Promise<{ token: string }> => {
    const { email, password, nickname } = data;
    const user = await userService.getUserByEmailOrNickname(email, nickname);
    await AuthHelper.validatePassword(password, user?.password);
    const { password: _, ...userNoPassword } = user?.toJSON();
    const token = await AuthHelper.generateToken(userNoPassword);
    return { token };
  };
  register = async (data: IUserModel): Promise<{ token: string }> => {
    const user = await userService.createUser(data);
    const { password, ...userNoPassword } = user.toJSON();
    const token = await AuthHelper.generateToken(userNoPassword);
    return { token };
  };

  verifyToken = async (token: string) => {
    return !!(await AuthHelper.verifyToken(token));
  };

  refreshToken = (data: any) => {};
}

export const authService = new AuthService();
