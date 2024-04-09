import { ISymbol } from '@/entities/symbol';

export interface SymbolRepository {
  getSymbol(id: number | string): Promise<null | ISymbol>;
  getAllSymbols(projectId: number | string): Promise<ISymbol[]>;
  createSymbol(symbol: SymbolRepository.CreateSymbolParams): Promise<ISymbol>;
  updateSymbol(
    id: number | string,
    symbol: SymbolRepository.UpdateSymbolParams
  ): Promise<void>;
  deleteSymbol(id: number | string): Promise<void>;
  createImpact(data: SymbolRepository.CreateImpactParams): Promise<void>;
  createSynonym(data: SymbolRepository.CreateSynonymParams): Promise<void>;
  deleteImpact(id: number | string): Promise<void>;
  deleteSynonym(id: number | string): Promise<void>;
}

export namespace SymbolRepository {
  export interface CreateSymbolParams {
    name: string;
    classification: string;
    notion: string;
    projectId: number | string;
  }

  export interface UpdateSymbolParams {
    name: string;
    classification: string;
    notion: string;
  }

  export interface CreateImpactParams {
    description: string;
    symbolId: number | string;
  }

  export interface CreateSynonymParams {
    name: string;
    symbolId: number | string;
  }
}
