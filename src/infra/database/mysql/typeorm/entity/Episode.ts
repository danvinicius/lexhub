import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IEpisode, IRestriction } from "../../../../../core/domain/entities/scenario";
import { IScenario } from "../../../../../core/domain/entities/scenario";
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
