import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { IContext, IRestriction } from "../../../../../core/domain/entities/scenario";
import { Scenario } from "./Scenario";
import { Restriction } from "./Restriction";

@Entity()
export class Context implements IContext {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preCondition: string;
  
  @Column()
  temporalLocation: string;

  @Column()
  geographicLocation: string;

  @OneToMany(() => Restriction, (restriction) => restriction.context)
  restrictions: IRestriction[];

  @OneToOne(() => Scenario, (scenario) => scenario.context)
  @JoinColumn()
  scenario: Scenario;
}
