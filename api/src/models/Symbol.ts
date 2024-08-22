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
import { ISynonym, Synonym } from './Synonym';
import { IImpact, Impact } from './Impact';
import { IProject, Project } from './Project';

export interface ISymbol {
  id?: number;
  name: string;
  classification: string;
  notion?: string;
  synonyms?: ISynonym[];
  impacts?: IImpact[];
  project: IProject;
}

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
