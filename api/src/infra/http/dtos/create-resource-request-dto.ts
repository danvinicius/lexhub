import { IRestriction } from '@/models';
import { IsOptional, IsString } from 'class-validator';

export class CreateResourceRequestDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  scenarioId: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.scenarioId = data.scenarioId;
  }
}
