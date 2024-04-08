import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IContext, IRestriction } from "@/entities";
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
}
