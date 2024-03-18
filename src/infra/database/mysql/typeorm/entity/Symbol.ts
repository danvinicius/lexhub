import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ISymbol } from "../../../../../core/domain/entities/symbol";
import { Synonym } from "./Synonym";
import { Impact } from "./Impact";
import { Project } from "./Project";

@Entity()
export class Symbol implements ISymbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column({nullable: true})
  notion: string;
  
  @OneToMany(() => Synonym, (synonym) => synonym.symbol)
  synonyms: Synonym[];

  @OneToMany(() => Impact, (Impact) => Impact.symbol)
  impacts: Impact[];

  @ManyToOne(() => Project, (project) => project.symbols)
  project: Project;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
