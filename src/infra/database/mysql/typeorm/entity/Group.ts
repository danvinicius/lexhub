import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { IGroup, INonSequentialEpisode } from "../../../../../core/domain/entities/scenario";
import { IScenario } from "../../../../../core/domain/entities/scenario";
import { Scenario } from "./Scenario";
import { NonSequentialEpisode } from "./NonSequentialEpisode";

@Entity()
export class Group implements IGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: number;

    @OneToMany(() => NonSequentialEpisode, nonSequentialEpisode => nonSequentialEpisode.group)
    nonSequentialEpisodes: INonSequentialEpisode[]

    @ManyToOne(() => Scenario, scenario => scenario.groups)
    scenario: IScenario[];
}
