import prismaClient from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

// todo: in future secret will get from env
const JWT_SECRET = "secret";

export interface ICreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IGetUserTokenInput {
  email: string;
  password: string;
}

class UserService {
  public static createUser(payload: ICreateUserInput) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHashedPassword(password, salt);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    });
  }

  public static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email },
    });
  }

  public static generateHashedPassword(password: string, salt: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static async getUserToken(payload: IGetUserTokenInput) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const userSalt = user.salt;
    const userHashedPassword = UserService.generateHashedPassword(
      password,
      userSalt
    );

    if (userHashedPassword !== user.password) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }
}

export default UserService;
