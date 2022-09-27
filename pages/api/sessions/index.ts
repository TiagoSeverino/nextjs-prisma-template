import { Body, Catch, createHandler, Post } from "next-api-decorators";

import exceptionHandler from "../../../middlewares/exceptionHandler";
import AuthenticateUserService from "../../../services/AuthenticateUserService";
import { UserCredentials } from "../../../validators";

@Catch(exceptionHandler)
class Session {
  @Post()
  async auth(@Body() body: UserCredentials) {
    return AuthenticateUserService(body);
  }
}

export default createHandler(Session);
