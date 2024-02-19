import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { IGroup, INonSequentialEpisode, IRestriction } from "../../../../../core/domain/entities/scenario";
import { Group } from "./Group";
import { Restriction } from "./Restriction";

@Entity()
export class NonSequentialEpisode implements INonSequentialEpisode {
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

    @ManyToOne(() => Group, group => group.nonSequentialEpisodes)
    group: IGroup;
}
