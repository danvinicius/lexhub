import { ServerError } from '@/utils/errors';
import { Project, Impact, Synonym, Symbol } from '@/models';
import dataSource, { initializeDataSource } from '@/infra/db/connection';

export namespace SymbolRepository {
  export interface CreateSymbolParams {
    name: string;
    classification: string;
    notion: string;
    projectId: number;
  }

  export interface UpdateSymbolParams {
    name: string;
    classification: string;
    notion: string;
  }

  export interface CreateImpactParams {
    description: string;
    symbolId: number;
  }

  export interface CreateSynonymParams {
    name: string;
    symbolId: number;
  }
}


export class SymbolRepository  {

  constructor() {
    initializeDataSource();
  }

  async getSymbol(id: number): Promise<Symbol> {
    const [symbol] = await dataSource.manager.find(Symbol, {
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
    const symbols = await dataSource.manager.find(Symbol, {
      where: {
        project: {
          id: projectId,
        },
      },
      relations: {
        synonyms: true,
        impacts: true,
        project: true
      },
    });
    return symbols;
  }
  async createSymbol(data: SymbolRepository.CreateSymbolParams): Promise<Symbol> {
    try {
      const [project] = await dataSource.manager.findBy(Project, {
        id: data.projectId as number,
      });
      const symbol = new Symbol();
      symbol.name = data.name;
      symbol.classification = data.classification;
      symbol.notion = data.notion || '';
      symbol.project = project;

      await dataSource.manager.save(Symbol, symbol);
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
      await dataSource.manager.save(Impact, impact);
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
      await dataSource.manager.save(Synonym, synonym);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteImpact(id: number): Promise<void> {
    try {
      const [impact] = await dataSource.manager.findBy(Impact, {
        id,
      });
      if (impact) {
        await dataSource.manager.delete(Impact, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteSynonym(id: number): Promise<void> {
    try {
      const [synonym] = await dataSource.manager.findBy(Synonym, {
        id,
      });
      if (synonym) {
        await dataSource.manager.delete(Synonym, id);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async updateSymbol(id: number, data: SymbolRepository.UpdateSymbolParams): Promise<void> {
    try {
      await dataSource.manager.update(Symbol, { id }, data);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
  async deleteSymbol(id: number): Promise<void> {
    try {
      await dataSource.manager.softDelete(Symbol, id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}