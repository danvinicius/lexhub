import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @ManyToOne(() => Group, group => group.nonSequentialEpisodes, {
        onDelete: 'CASCADE'
    })
    group: IGroup;

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
