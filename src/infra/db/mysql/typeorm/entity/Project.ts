import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { IProject, IUser, IUserProject } from "@/domain/entities";
import { Symbol } from "./Symbol";
import { ISymbol } from "@/domain/entities";
import { IScenario } from "@/domain/entities";
import { Scenario } from "./Scenario";
import { UserProject } from "./UserProject";

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

  @OneToMany(() => UserProject, (user) => user.project)
  users: IUserProject[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
