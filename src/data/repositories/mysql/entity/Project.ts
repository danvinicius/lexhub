import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IProject } from "../../../../domain/entities/project";
import { Symbol } from "./Symbol";

@Entity()
export class Project implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Symbol, (symbol) => symbol.project)
  symbols: Symbol[];
}
