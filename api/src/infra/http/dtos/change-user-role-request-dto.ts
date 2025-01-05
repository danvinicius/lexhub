import { IUserRole } from '@/models';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeUserRoleRequestDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  newRole: IUserRole;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  constructor(data: any) {
    this.userId = data.userId;
    this.newRole = data.newRole;
    this.projectId = data.projectId;
  }
}
