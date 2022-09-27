import { hash } from "bcryptjs";
import { User } from "../database/prismaClient";
import { UserCredentials, validateObject } from "../validators";

interface Response {
  id: string;
  username: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const CreateUserService = async (
  credentials: UserCredentials
): Promise<Response> => {
  await validateObject(UserCredentials, credentials);

  const { username, password } = credentials;

  const userExists = await User.findUnique({
    where: { username },
  });

  if (userExists) throw new Error("This user already exists");

  const hashedPassword = await hash(password, 8);

  const { id, createdAt, updatedAt } = await User.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return {
    id,
    username,
    createdAt,
    updatedAt,
  };
};

export default CreateUserService;
