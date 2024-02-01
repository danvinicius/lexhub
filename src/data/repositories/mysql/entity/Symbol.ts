import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ISymbol } from "../../../../domain/entities/symbol";
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
}
