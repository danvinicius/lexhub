import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IResource, IRestriction } from "@/entities";
import { IScenario } from "@/entities";
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

  @ManyToMany(() => Scenario, scenario => scenario.resources)
  scenario: IScenario[];

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
