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
import {
  IActor,
  IContext,
  IEpisode,
  IException,
  IGroup,
  IResource,
  IScenario,
} from '@/entities';
import { Exception } from './Exception';
import { Actor } from './Actor';
import { Context } from './Context';
import { Project } from './Project';
import { Resource } from './Resource';
import { Episode } from './Episode';
import { IProject } from '@/entities';
import { Group } from './Group';

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
  @JoinTable()
  actors: IActor[];

  @ManyToMany(() => Resource)
  @JoinTable()
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
