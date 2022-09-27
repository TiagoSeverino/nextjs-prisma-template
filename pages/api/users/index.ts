import {
  Body,
  Catch,
  createHandler,
  Get,
  Post,
  Req,
} from "next-api-decorators";
import type { NextApiAuthRequest } from "../../../@types";
import ensureAuthenticated from "../../../middlewares/ensureAuthenticated";
import exceptionHandler from "../../../middlewares/exceptionHandler";
import CreateUserService from "../../../services/CreateUserService";
import GetUserService from "../../../services/GetUserService";
import { UserCredentials } from "../../../validators";

@Catch(exceptionHandler)
class User {
  @Get()
  @ensureAuthenticated()
  async getUsers(@Req() { user }: NextApiAuthRequest) {
    return GetUserService(user);
  }

  @Post()
  async createUser(@Body() body: UserCredentials) {
    return CreateUserService(body);
  }
}

export default createHandler(User);
