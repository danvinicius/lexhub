import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { IProject } from "../../../../../core/domain/entities/project";
import { Symbol } from "./Symbol";
import { ISymbol } from "../../../../../core/domain/entities/symbol";
import { IScenario } from "../../../../../core/domain/entities/scenario";
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

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
