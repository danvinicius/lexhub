import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Exception, IException } from './Exception';
import { Actor, IActor } from './Actor';
import { Context, IContext } from './Context';
import { Project } from './Project';
import { IResource, Resource } from './Resource';
import { Episode, IEpisode } from './Episode';
import { IProject } from './Project';
import { Group, IGroup } from './Group';

export interface IScenario {
  readonly id?: number;
  title: string;
  goal: string;
  exceptions?: IException[];
  resources?: IResource[];
  actors?: IActor[];
  context?: IContext;
  episodes?: IEpisode[];
  groups?: IGroup[];
  project: IProject;
}

@Entity()
export class Scenario implements IScenario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  goal: string;

  @OneToMany(() => Exception, (exception) => exception.scenario)
  exceptions: IException[];

  @ManyToMany(() => Actor)
  @JoinTable({
    name: 'scenario_actor',
    joinColumn: {
      name: 'scenario_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: IActor[];

  @ManyToMany(() => Resource)
  @JoinTable({
    name: 'scenario_resource',
    joinColumn: {
      name: 'scenario_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resource_id',
      referencedColumnName: 'id',
    },
  })
  resources: IResource[];

  @OneToOne(() => Context, (context) => context.scenario)
  context: IContext;

  @OneToMany(() => Episode, (episode) => episode.scenario)
  episodes: IEpisode[];

  @OneToMany(() => Group, (group) => group.scenario)
  groups: IGroup[];

  @ManyToOne(() => Project, (project) => project.scenarios)
  @JoinColumn({
    name: 'project_id',
  })
  project: IProject;

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
