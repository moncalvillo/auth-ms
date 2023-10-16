import { UuidService } from "utils/uuid.service";
import { IUserModel, User } from "./user.model";
import { AuthHelper } from "core/auth/auth.helper";
import { FindOptions, Op, WhereOptions } from "sequelize";
import { AuthenticationError, NotFoundError } from "shared/customErros";

export class UserService {
  createUser = async (userData: Omit<IUserModel, "id">): Promise<User> => {
    if (userData.email) AuthHelper.validateEmail(userData.email);
    if (userData.password)
      userData.password = await AuthHelper.encryptPassword(userData.password);

    const existingUser = await this.findUserByEmailOrNickname(
      userData.email,
      userData.nickname
    );

    if (existingUser) throw new AuthenticationError("User already exists");

    const user = await User.create({
      ...userData,
      id: UuidService.uuidv4(),
    });
    return user;
  };

  getUserById = async (id: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("User not found");
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
    if (!user) throw new NotFoundError("User not found");
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

  findUser = async (options: FindOptions) => {
    return await User.findOne(options);
  };

  findUserByEmailOrNickname = async (
    email?: string,
    nickname?: string
  ): Promise<User | null> => {
    const whereConditions: WhereOptions = {};

    if (!!email) whereConditions.email = email;
    if (!!nickname) whereConditions.nickname = nickname;

    const user = await this.findUser({
      where: { [Op.or]: whereConditions },
    });

    return user;
  };

  getUserByEmailOrNickname = async (
    email?: string,
    nickname?: string
  ): Promise<User> => {
    const user = await this.findUserByEmailOrNickname(email, nickname);
    if (!user) throw new NotFoundError("User not found");
    return user;
  };
}

export const userService = new UserService();
