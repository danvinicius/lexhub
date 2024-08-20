import { CreateImpactRequestDTO, CreateSymbolRequestDTO, CreateSynonymRequestDTO, UpdateSymbolRequestDTO } from "@/infra/http/dtos";
import { ISymbol } from "@/models";
import { SymbolRepository } from "@/repositories";
import { InvalidParamError, NotFoundError } from "@/utils/errors";

const symbolRepository = new SymbolRepository();

export namespace SymbolService {
  export interface UpdateSymbolParams {
    id: number;
    symbol: UpdateSymbolRequestDTO;
  }
}

export class SymbolService {
  async createImpact(impact: CreateImpactRequestDTO): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(impact.symbolId);
    if (!symbolExists) {
      throw new InvalidParamError('symbolId');
    }
    return await symbolRepository.createImpact(impact);
  }

  async createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    return await symbolRepository.createSymbol(symbol);
  }

  async createSynonym(synonym: CreateSynonymRequestDTO): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(
      synonym.symbolId
    );
    if (!symbolExists) {
      throw new InvalidParamError('symbolId');
    }
    return await symbolRepository.createSynonym(synonym);
  }

  async deleteImpact(id: number): Promise<void> {
    return await symbolRepository.deleteImpact(id);
  }

  async deleteSymbol(id: number): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new InvalidParamError('symbolId');
    }
    await symbolRepository.deleteSymbol(id);
  }

  async deleteSynonym(id: number): Promise<void> {
    return await symbolRepository.deleteSynonym(id);
  }

  async getSymbol(id: number): Promise<null | ISymbol> {
    const symbol = await symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Symbol not found');
    }
    return symbol;
  }

  async getAllSymbols(projectId: number): Promise<ISymbol[]> {
    const symbols = await symbolRepository.getAllSymbols(projectId);
    return symbols;
  }

  async updateSymbol({ id, symbol }: SymbolService.UpdateSymbolParams): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new InvalidParamError('symbolId');
    }
    await symbolRepository.updateSymbol(id, symbol);
  }
}
