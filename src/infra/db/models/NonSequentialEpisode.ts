import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
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
  @JoinColumn({
    name: 'restriction_id'
  })
  restriction: IRestriction;

  @ManyToOne(() => Group, (group) => group.nonSequentialEpisodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'group_id'
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
