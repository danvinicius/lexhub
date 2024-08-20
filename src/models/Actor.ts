import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { IScenario, Scenario } from './Scenario';

export interface IActor {
  id?: number;
  name: string;
}

@Entity()
export class Actor implements IActor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Scenario, (scenario) => scenario.actors)
  @JoinTable({
    name: 'scenario_actor',
    joinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'scenario_id',
      referencedColumnName: 'id',
    },
  })
  scenarios: IScenario[];

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
