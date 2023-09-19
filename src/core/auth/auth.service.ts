import { IUserModel, User } from "core/models";
import { UserService, userService } from "core/user/user.service";
import { AuthHelper } from "./auth.helper";
import { CodedError, ErrorCodes } from "utils/codedError";

export class AuthService {
  login = async (data: any): Promise<{ token: string }> => {
    const { email, password, nickname } = data;
    const user = await userService.getUserByEmailOrNickname(
      email ?? null,
      nickname ?? null
    );
    await AuthHelper.validatePassword(password, user.password);
    const { password: _, ...userNoPassword } = user.toJSON();
    const token = await AuthHelper.generateToken(userNoPassword);
    return { token };
  };
  register = async (data: Omit<IUserModel, "id">) => {
    const user = await userService.createUser(data);
    const { password, ...userNoPassword } = user.toJSON();
    const token = await AuthHelper.generateToken(userNoPassword);
    return { token };
  };
  refreshToken = (data: any) => {};
}

export const authService = new AuthService();
