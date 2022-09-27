import { User } from "../database/prismaClient";

interface Response {
  id: string;
  username: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const GetUserService = async (id: string): Promise<Response> => {
  const user = await User.findUnique({
    where: { id },
  });

  if (!user) throw new Error("This user not found");

  return user;
};

export default GetUserService;
