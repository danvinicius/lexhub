import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveUserFromProjectRequestDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  constructor(data: any) {
    this.userId = data.userId;
    this.projectId = data.projectId;
  }
}
