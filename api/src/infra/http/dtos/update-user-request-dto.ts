import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  currentPassword: string;

  @IsOptional()
  @IsString()
  newPassword: string;

  constructor(data: any) {
    this.name = data.name;
    this.currentPassword = data.currentPassword;
    this.newPassword = data.newPassword;
  }
}
