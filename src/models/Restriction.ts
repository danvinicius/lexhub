import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Context, IContext } from './Context';
import { IResource, Resource } from './Resource';
import { Episode, IEpisode } from './Episode';

export interface IRestriction {
  id?: number;
  description: string;
}

@Entity()
export class Restriction implements IRestriction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Context, (context) => context.restrictions)
  @JoinColumn({
    name: 'context_id'
  })
  context: IContext;

  @ManyToOne(() => Resource, (resource) => resource.restrictions)
  @JoinColumn({
    name: 'resource_id'
  })
  resource: IResource;

  @OneToOne(() => Episode, (episode) => episode.restriction)
  @JoinColumn({
    name: 'episode_id'
  })
  episode: IEpisode;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
