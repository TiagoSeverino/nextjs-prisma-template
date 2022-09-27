import { hash } from "bcryptjs";
import { IsNotEmpty } from "class-validator";

import { User } from "../database/prismaClient";

interface Response {
  id: string;
  username: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const CreateUserService = async ({
  username,
  password,
}: CreateUserBody): Promise<Response> => {
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

export class CreateUserBody {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
