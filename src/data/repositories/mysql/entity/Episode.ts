import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { IEpisode, IRestriction } from "../../../../domain/entities/scenario";
import { IScenario } from "../../../../domain/entities/scenario";
import { Scenario } from "./Scenario";
import { Restriction } from "./Restriction";

@Entity()
export class Episode implements IEpisode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
