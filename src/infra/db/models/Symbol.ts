import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { ISymbol } from '@/entities';
import { Synonym } from './Synonym';
import { Impact } from './Impact';
import { Project } from './Project';

@Entity()
export class Symbol implements ISymbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column({ nullable: true })
  notion: string;

  @OneToMany(() => Synonym, (synonym) => synonym.symbol)
  synonyms: Synonym[];

  @OneToMany(() => Impact, (Impact) => Impact.symbol)
  impacts: Impact[];

  @ManyToOne(() => Project, (project) => project.symbols)
  @JoinColumn({
    name: 'project_id',
  })
  project: Project;

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
