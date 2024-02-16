import { SymbolRepository } from "../../../interfaces/repositories/symbol-repository";
import { Symbol } from "./entity/Symbol";
import { DataSource } from "typeorm";
import { Synonym } from "./entity/Synonym";
import { Project } from "./entity/Project";
import { CreateSymbolRequestDTO } from "../../../domain/dto/create-symbol-request-dto";
import { Impact } from "./entity/Impact";
import { UpdateSymbolRequestDTO } from "../../../domain/dto/update-symbol-request-dto";

export class MySQLSymbolRepository implements SymbolRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getSymbol(id: number): Promise<Symbol> {
    const [symbol] = await this.dataSource.manager.find(Symbol, {
      where: {
        id,
      },
      relations: {
        synonyms: true,
        impacts: true,
        project: true
      },
    });
    if (!symbol) {
      throw new Error("Symbol not found");
    }
    return symbol;
  }
  async getAllSymbols(projectId: number): Promise<Symbol[]> {
    const symbols = await this.dataSource.manager.find(Symbol, {
      where: {
        project: {
          id: projectId
        }
      },
      relations: {
        synonyms: true,
        impacts: true,
      },
    });
    return symbols;
  }
  async createSymbol(data: CreateSymbolRequestDTO): Promise<Symbol> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      if (!project) {
        throw new Error("Project does not exist");
      }
      const symbol = new Symbol();
      symbol.name = data.name;
      symbol.classification = data.classification;
      symbol.notion = data.notion || "";
      symbol.project = project;

      await this.dataSource.manager.save(Symbol, symbol);

      data.synonyms?.map(async (s) => {
        const synonym = new Synonym();
        synonym.name = s?.name;
        synonym.symbol = symbol;
        await this.dataSource.manager.save(synonym);
      });

      data.impacts?.map(async (i) => {
        const impact = new Impact();
        impact.description = i?.description;
        impact.symbol = symbol;
        await this.dataSource.manager.save(impact);
      });
      return symbol;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateSymbol(id: string, data: UpdateSymbolRequestDTO): Promise<void> {
    try {
      await this.dataSource.manager.update(Symbol, { id }, data);
    } catch (error) {
      throw new Error("Error on updating symbol");
    }
  }
  async deleteSymbol(id: string): Promise<void> {
    try {
      await this.dataSource.manager.delete(Symbol, id);
    } catch (error) {
      throw new Error("Error on deleting symbol");
    }
  }
}
