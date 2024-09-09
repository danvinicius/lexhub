import {
  CreateImpactRequestDTO,
  CreateSymbolRequestDTO,
  CreateSynonymRequestDTO,
  UpdateSymbolRequestDTO,
} from '@/infra/http/dtos';
import { ISymbol } from '@/models';
import { SymbolRepository } from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { ScenarioService } from './scenario-service';

const symbolRepository = new SymbolRepository();

export class SymbolService {
  async createImpact(impact: CreateImpactRequestDTO): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(impact.symbolId);
    if (!symbolExists) {
      throw new BadRequestError('Parâmetro "symbolId" inválido ou inexistente');
    }
    return await symbolRepository.createImpact(impact);
  }

  async createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    const scenarioService = new ScenarioService();
    const symbols = await this.getAllSymbols(symbol.projectId);
    if (
      symbols.some(
        (existingSymbol: ISymbol) =>
          scenarioService.normalize(existingSymbol.name) ==
          scenarioService.normalize(symbol.name)
      )
    ) {
      throw new BadRequestError('Já existe um símbolo com o mesmo nome');
    }
    return await symbolRepository.createSymbol(symbol);
  }

  async createSynonym(synonym: CreateSynonymRequestDTO): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(synonym.symbolId);
    if (!symbolExists) {
      throw new BadRequestError('Parâmetro "symbolId" inválido ou inexistente');
    }
    return await symbolRepository.createSynonym(synonym);
  }

  async deleteImpact(id: number): Promise<void> {
    return await symbolRepository.deleteImpact(id);
  }

  async deleteSymbol(id: number): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Parâmetro "symbolId" inválido ou inexistente');
    }
    await symbolRepository.deleteSymbol(id);
  }

  async deleteSynonym(id: number): Promise<void> {
    return await symbolRepository.deleteSynonym(id);
  }

  async getSymbol(id: number): Promise<null | ISymbol> {
    const symbol = await symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Símbolo inexistente');
    }
    return symbol;
  }

  async getAllSymbols(projectId: number): Promise<ISymbol[]> {
    const symbols = await symbolRepository.getAllSymbols(projectId);
    return symbols;
  }

  async updateSymbol(
    id: number,
    symbol: UpdateSymbolRequestDTO
  ): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Parâmetro "symbolId" inválido ou inexistente');
    }
    await symbolRepository.updateSymbol(id, symbol);
  }
}
