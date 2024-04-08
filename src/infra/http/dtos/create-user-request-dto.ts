import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
