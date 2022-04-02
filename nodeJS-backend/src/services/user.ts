import { User } from "../models";
import { BadRequestError400 } from "../centeralizedErrorHandler/badRequest400";
import jwt from "jsonwebtoken";
import { Password } from "./password";
import { ErrorConstants } from "../centeralizedErrorHandler/constants";
import { UnAuthorizedError401 } from "../centeralizedErrorHandler/unAuthorize401";
import { UserCreationAttributes } from "../interfaces";

class UserService {
  async signUp(reqBody: UserCreationAttributes) {
    const { username, password, name } = reqBody;
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestError400(ErrorConstants.USER_ALREADY_EXSISTS);
    }

    const user = await User.create({
      username,
      password,
      name,
    });

    const token = jwt.sign(
      {
        username,
        id: user.id,
      },
      process.env.JWT_KEY!,
      { expiresIn: 60 * 60 }
    );

    return { token, username };
  }

  async signIn(reqBody: UserCreationAttributes) {
    const { username, password } = reqBody;

    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (!existingUser) {
      throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
    }

    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser.id,
      },
      process.env.JWT_KEY!,
      { expiresIn: 60 * 60 }
    );

    return { token, username };
  }
}

export default new UserService();
