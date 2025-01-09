import 'reflect-metadata'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ScenarioDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  goal: string;
}

export class CreateManyScenariosRequestDTO {
  @IsArray()
  @ValidateNested({ each: true }) // Validação aninhada para cada elemento do array
  @Type(() => ScenarioDTO) // Transforma os objetos do array em instâncias de ScenarioDTO
  scenarios: ScenarioDTO[];

  @IsString()
  projectId: string;

  constructor(data: any) {
    this.scenarios = data.scenarios;
    this.projectId = data.projectId;
  }
}
