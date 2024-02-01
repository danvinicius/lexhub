import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ISynonym } from "../../../../domain/entities/symbol";
import { Symbol } from "./Symbol";

@Entity()
export class Synonym implements ISynonym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => Symbol, (symbol) => symbol.impacts)
  symbol: Symbol
}
