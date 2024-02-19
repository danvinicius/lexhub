import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IImpact } from "../../../../../core/domain/entities/symbol";
import { Symbol } from "./Symbol";

@Entity()
export class Impact implements IImpact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Symbol, (symbol) => symbol.impacts)
  symbol: Symbol;
}
