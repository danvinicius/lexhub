import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IException } from "../../../../../core/domain/entities/scenario";
import { IScenario } from "../../../../../core/domain/entities/scenario";
import { Scenario } from "./Scenario";

@Entity()
export class Exception implements IException {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Scenario, (scenario) => scenario.exceptions)
  scenario: IScenario;
}
