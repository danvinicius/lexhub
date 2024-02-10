import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IProject } from "../../../../domain/entities/project";
import { Symbol } from "./Symbol";
import { ISymbol } from "../../../../domain/entities/symbol";
import { IScenario } from "../../../../domain/entities/scenario";
import { Scenario } from "./Scenario";

@Entity()
export class Project implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Symbol, (symbol) => symbol.project)
  symbols: ISymbol[];

  @OneToMany(() => Scenario, (scenario) => scenario.project)
  scenarios: IScenario[];
}
