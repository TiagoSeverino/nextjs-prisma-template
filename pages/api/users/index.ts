import {
  Body,
  Catch,
  createHandler,
  Post,
  ValidationPipe,
} from "next-api-decorators";

import exceptionHandler from "../../../middlewares/exceptionHandler";
import CreateUserService, {
  CreateUserBody,
} from "../../../services/CreateUserService";

@Catch(exceptionHandler)
class User {
  @Post()
  async createUser(@Body(ValidationPipe) body: CreateUserBody) {
    return CreateUserService(body);
  }
}

export default createHandler(User);
