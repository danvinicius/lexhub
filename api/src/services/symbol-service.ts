import {
  CreateSymbolRequestDTO,
  UpdateSymbolRequestDTO,
} from '@/infra/http/dtos';
import { ISymbol } from '@/models';
import { SymbolRepository } from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { normalize } from '@/utils/string/normalize';

const symbolRepository = new SymbolRepository();

export class SymbolService {
  async createSymbol(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    const symbols = await this.getAllSymbols(symbol.projectId);
    if (
      symbols.some(
        (existingSymbol: ISymbol) =>
          normalize(existingSymbol.name) == normalize(symbol.name)
      )
    ) {
      throw new BadRequestError('Já existe um símbolo com o mesmo nome');
    }
    return await symbolRepository.createSymbol(symbol);
  }

  async deleteSymbol(id: string): Promise<void> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }
    await symbolRepository.deleteSymbol(id);
  }

  async getSymbol(id: string): Promise<null | ISymbol> {
    const symbol = await symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Símbolo inexistente');
    }
    return symbol;
  }

  async getAllSymbols(projectId: string): Promise<ISymbol[]> {
    const symbols = await symbolRepository.getAllSymbols(projectId);
    return symbols;
  }

  async updateSymbol(
    id: string,
    symbol: UpdateSymbolRequestDTO
  ): Promise<ISymbol> {
    const symbolExists = await symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }
    return symbolRepository.updateSymbol(id, symbol);
  }
}
