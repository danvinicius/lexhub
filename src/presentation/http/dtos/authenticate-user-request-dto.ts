import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateUserRequestDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
  }
}
