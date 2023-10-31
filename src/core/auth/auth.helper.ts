import { Config } from "providers/config";
import {
  AuthenticationError,
  ErrorCode,
  ValidationError,
} from "shared/customErros";

import jwt from "jsonwebtoken";
export class AuthHelper {
  public static validateEmail(email: string): boolean {
    if (!email) throw new ValidationError("Email is required");
    const regex = /\S+@\S+\.\S+/;
    const valid = regex.test(email);
    if (!valid) {
      throw new ValidationError("Invalid email");
    }
    return valid;
  }

  public static async validatePassword(
    password?: string,
    hashedPassword?: string
  ): Promise<void> {
    if (!hashedPassword) return;
    if (!password) throw new ValidationError("Password is required");
    const valid = await this.isCorrectPassword(password, hashedPassword);
    if (!valid) throw new AuthenticationError("Wrong credentials");
  }

  public static jwtDecode(token: string): any {
    const decoded = jwt.decode(token);
    return decoded;
  }

  public static generateToken(object: any): string {
    const secret = Config.jwt.secret;
    const token = jwt.sign(object, secret, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    return token;
  }

  public static async isCorrectPassword(
    password: string,
    hash: string
  ): Promise<Boolean> {
    return await Bun.password.verify(password, hash);
  }

  public static async encryptPassword(password: string): Promise<string> {
    return await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
  }

  public static async verifyToken(token: string): Promise<any> {
    const payload = await jwt.verify(token, Config.jwt.secret, {
      algorithms: ["HS256"],
    });

    return payload;
  }
}
