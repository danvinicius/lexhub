import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IGroup,
  INonSequentialEpisode,
} from "../../../../../core/domain/entities/scenario";
import { IScenario } from "../../../../../core/domain/entities/scenario";
import { Scenario } from "./Scenario";
import { NonSequentialEpisode } from "./NonSequentialEpisode";

@Entity()
export class Group implements IGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  position: number;

  @OneToMany(
    () => NonSequentialEpisode,
    (nonSequentialEpisode) => nonSequentialEpisode.group
  )
  nonSequentialEpisodes: INonSequentialEpisode[];

  @ManyToOne(() => Scenario, (scenario) => scenario.groups)
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
