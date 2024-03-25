import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IEpisode, IRestriction } from "@/domain/entities";
import { IScenario } from "@/domain/entities";
import { Scenario } from "./Scenario";
import { Restriction } from "./Restriction";

@Entity()
export class Episode implements IEpisode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  position: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @OneToOne(() => Restriction, (restriction) => restriction.episode)
  restriction: IRestriction;
  
  @ManyToOne(() => Scenario, (scenario) => scenario.episodes)
  scenario: IScenario;

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
