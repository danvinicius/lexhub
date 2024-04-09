import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { IGroup, INonSequentialEpisode } from '@/entities';
import { IScenario } from '@/entities';
import { Scenario } from './Scenario';
import { NonSequentialEpisode } from './NonSequentialEpisode';

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
  @JoinColumn({
    name: 'scenario_id'
  })
  scenario: IScenario;

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
