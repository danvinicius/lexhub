import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
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
}
