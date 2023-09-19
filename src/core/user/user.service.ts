import { UuidService } from "utils/uuid.service";
import { IUserModel, User } from "./user.model";
import { AuthHelper } from "core/auth/auth.helper";
import { CodedError, ErrorCodes } from "utils/codedError";
import { Op } from "sequelize";

export class UserService {
  createUser = async (userData: Omit<IUserModel, "id">): Promise<User> => {
    console.log(userData);
    if (userData.email) AuthHelper.validateEmail(userData.email);
    if (userData.password)
      userData.password = await AuthHelper.encryptPassword(userData.password);

    await this.checkEmailAndNicknameExists(userData.email, userData.nickname);

    const user = await User.create({
      ...userData,
      id: UuidService.uuidv4(),
    });
    return user;
  };

  getUserById = async (id: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new CodedError(ErrorCodes.NOT_FOUND, "User not found");
    return user;
  };

  getUserByIdExcludeAttrs = async (
    id: string,
    excludeAttrs: string | string[] = []
  ): Promise<User> => {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: [...excludeAttrs],
      },
    });
    if (!user) throw new CodedError(ErrorCodes.NOT_FOUND, "User not found");
    return user;
  };

  findUserById = async (id: string): Promise<User | null> => {
    const user = await User.findByPk(id);
    return user;
  };

  findUserByIdExcludeAttrs = async (
    id: string,
    excludeAttrs: string | string[] = []
  ): Promise<User | null> => {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: [...excludeAttrs],
      },
    });
    return user;
  };

  checkEmailAndNicknameExists = async (
    email?: string | null,
    nickname?: string | null
  ): Promise<void> => {
    const whereConditions: any = {};
    if (email && email !== null) whereConditions.email = email;
    if (nickname && nickname !== null) whereConditions.nickname = nickname;

    if (email === null && nickname === null)
      throw new CodedError(
        ErrorCodes.BAD_REQUEST,
        "Both email and nickname cannot be null"
      );

    let queryCondition;
    if (email !== null && nickname !== null) {
      queryCondition = {
        [Op.and]: whereConditions,
      };
    } else {
      queryCondition = whereConditions;
    }

    const user = await User.findOne({
      where: queryCondition,
    });

    if (user)
      throw new CodedError(
        ErrorCodes.FORBIDDEN,
        "Email or nickname already taken"
      );
  };

  getUserByEmailOrNickname = async (
    email: string | null = null,
    nickname: string | null = null
  ): Promise<User> => {
    const whereConditions: any = {};

    if (email !== null) whereConditions.email = email;

    if (nickname !== null) whereConditions.nickname = nickname;

    if (email === null && nickname === null)
      throw new CodedError(
        ErrorCodes.BAD_REQUEST,
        "Both email and nickname cannot be null"
      );

    const user = await User.findOne({
      where: whereConditions,
    });

    if (!user) throw new CodedError(ErrorCodes.NOT_FOUND, "Wrong credentials");

    return user;
  };
}

export const userService = new UserService();
