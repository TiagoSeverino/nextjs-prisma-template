import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export { validateObject } from "next-api-decorators/dist/internals/validateObject";

export class UserCredentials {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  password!: string;
}
