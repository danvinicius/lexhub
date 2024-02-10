import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { IResource, IRestriction } from "../../../../domain/entities/scenario";
import { IScenario } from "../../../../domain/entities/scenario";
import { Scenario } from "./Scenario";
import { Restriction } from "./Restriction";

@Entity()
export class Resource implements IResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Restriction, (restriction) => restriction.context)
  restrictions: IRestriction[];

  @ManyToMany(() => Scenario)
  scenario: IScenario[];
}
