import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IContext, IEpisode, IResource, IRestriction } from "../../../../../core/domain/entities/scenario";
import { Context } from "./Context";
import { Resource } from "./Resource";
import { Episode } from "./Episode";

@Entity()
export class Restriction implements IRestriction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Context, (context) => context.restrictions)
  context: IContext;

  @ManyToOne(() => Resource, (resource) => resource.restrictions)
  resource: IResource;

  @OneToOne(() => Episode, (episode) => episode.restriction)
  @JoinColumn()
  episode: IEpisode;

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
