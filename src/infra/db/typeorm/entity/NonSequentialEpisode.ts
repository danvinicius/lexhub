import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGroup, INonSequentialEpisode, IRestriction } from '@/entities';
import { Group } from './Group';
import { Restriction } from './Restriction';

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

  @ManyToOne(() => Group, (group) => group.nonSequentialEpisodes, {
    onDelete: 'CASCADE',
  })
  group: IGroup;

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
