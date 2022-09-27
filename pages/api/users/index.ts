import { Body, Catch, createHandler, Post } from "next-api-decorators";

import exceptionHandler from "../../../middlewares/exceptionHandler";
import CreateUserService from "../../../services/CreateUserService";
import { UserCredentials } from "../../../validators";

@Catch(exceptionHandler)
class User {
  @Post()
  async createUser(@Body() body: UserCredentials) {
    return CreateUserService(body);
  }
}

export default createHandler(User);
