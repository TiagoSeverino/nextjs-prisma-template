import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import AuthConfig from "../config/AuthConfig";
import { User } from "../database/prismaClient";
import { UserCredentials, validateObject } from "../validators";

interface Response {
  token: string;
}

const AuthenticateUserService = async (
  credentials: UserCredentials
): Promise<Response> => {
  try {
    await validateObject(UserCredentials, credentials);

    const { username, password } = credentials;

    const user = await User.findUnique({ where: { username } });

    if (!user) throw new Error();

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new Error();

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
    };
  } catch {
    throw new Error("Incorrect email/password combination");
  }
};

export default AuthenticateUserService;
