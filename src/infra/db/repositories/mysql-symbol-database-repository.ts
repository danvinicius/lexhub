import { SymbolRepository } from '@/infra/db/protocols';
import { DataSource } from 'typeorm';
import { Symbol, Synonym, Project, Impact } from '@/infra/db/models'
import { ServerError } from '@/util/errors';

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
        project: true,
      },
    });
    delete symbol?.deletedAt;
    return symbol;
  }
  async getAllSymbols(projectId: number): Promise<Symbol[]> {
    const symbols = await this.dataSource.manager.find(Symbol, {
      where: {
        project: {
          id: projectId,
        },
      },
      relations: {
        synonyms: true,
        impacts: true,
      },
    });
    return symbols;
  }
  async createSymbol(data: SymbolRepository.CreateSymbolParams): Promise<Symbol> {
    try {
      const [project] = await this.dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      const symbol = new Symbol();
      symbol.name = data.name;
      symbol.classification = data.classification;
      symbol.notion = data.notion || '';
      symbol.project = project;

      await this.dataSource.manager.save(Symbol, symbol);
      return symbol;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async createImpact(data: SymbolRepository.CreateImpactParams): Promise<void> {
    try {
      const symbol = await this.getSymbol(data?.symbolId as number);
      const impact = new Impact();
      impact.description = data?.description;
      impact.symbol = symbol;
      await this.dataSource.manager.save(Impact, impact);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async createSynonym(data: SymbolRepository.CreateSynonymParams): Promise<void> {
    try {
      const symbol = await this.getSymbol(data?.symbolId as number);
      const synonym = new Synonym();
      synonym.name = data?.name;
      synonym.symbol = symbol;
      await this.dataSource.manager.save(Synonym, synonym);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteImpact(id: number): Promise<void> {
    try {
      const [impact] = await this.dataSource.manager.findBy(Impact, {
        id,
      });
      if (impact) {
        await this.dataSource.manager.delete(Impact, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteSynonym(id: number): Promise<void> {
    try {
      const [synonym] = await this.dataSource.manager.findBy(Synonym, {
        id,
      });
      if (synonym) {
        await this.dataSource.manager.delete(Synonym, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateSymbol(id: number, data: SymbolRepository.UpdateSymbolParams): Promise<void> {
    try {
      await this.dataSource.manager.update(Symbol, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteSymbol(id: number): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(Symbol, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
