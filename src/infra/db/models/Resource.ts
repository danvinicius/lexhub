import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { IResource, IRestriction } from '@/entities';
import { IScenario } from '@/entities';
import { Scenario } from './Scenario';
import { Restriction } from './Restriction';

@Entity()
export class Resource implements IResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Restriction, (restriction) => restriction.context)
  restrictions: IRestriction[];

  @ManyToMany(() => Scenario, (scenario) => scenario.resources)
  @JoinTable({
    name: 'scenario_resource',
    joinColumn: {
      name: 'resource_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'scenario_id',
      referencedColumnName: 'id',
    },
  })
  scenario: IScenario[];

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
