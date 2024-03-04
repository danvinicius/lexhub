import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
}
