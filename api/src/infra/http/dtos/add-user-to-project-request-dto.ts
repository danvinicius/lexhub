import { UserRole } from '@/models';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToProjectRequestDTO {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;

  @IsNotEmpty()
  projectId: String;

  constructor(data: any) {
    this.email = data.email;
    this.role = data.role;
    this.projectId = data.projectId;
  }
}
