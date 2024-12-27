import {
  CreateSymbolRequestDTO,
  UpdateSymbolRequestDTO,
} from '@/infra/http/dtos';
import { IImpact, ISymbol, ISynonym } from '@/models';
import { ScenarioRepository, SymbolRepository } from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { normalize } from '@/utils/string/normalize';
import { Lexicon, LexiconService } from './lexicon-service';

const symbolRepository = new SymbolRepository();
const scenarioRepository = new ScenarioRepository();
const lexiconService = new LexiconService();

export interface ILexiconSymbol {
  id: string;
  name: {
    content: string;
    foundLexicons: Lexicon[];
  };
  notion: {
    content: string;
    foundLexicons: Lexicon[];
  };
  classification: string;
  impacts: {
    description: {
      content: string;
      foundLexicons: Lexicon[];
    };
  }[];
  synonyms: {
    name: {
      content: string;
      foundLexicons: Lexicon[];
    };
  }[];
  projectId: string;
}

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

  async getSymbolWithLexicon(
    symbolId: string,
    projectId: string
  ): Promise<ILexiconSymbol> {
    const symbol = await symbolRepository.getSymbol(symbolId);

    const [symbols, scenarios] = await Promise.all([
      symbolRepository.getAllSymbols(projectId),
      scenarioRepository.getAllScenarios(projectId),
    ]);

    // retira o próprio símbolo
    const symbolIndex = symbols.findIndex((current: ISymbol) => {
      return current.id?.valueOf() === symbol?.id?.valueOf();
    });

    symbols.splice(symbolIndex, 1);

    const {
      name = '',
      notion = '',
      classification,
      impacts = [],
      synonyms = [],
    } = symbol;

    const processedLexicon = (content: string, searchOtherScenarios: boolean) =>
      lexiconService.processLexicon(
        content,
        symbols,
        scenarios,
        searchOtherScenarios
      );

    return {
      id: symbol.id,
      name: processedLexicon(name, false),
      notion: processedLexicon(notion, true),
      classification,
      impacts: impacts?.map((impact: IImpact) => ({
        description: processedLexicon(impact.description, true),
      })),
      synonyms: synonyms?.map((synonym: ISynonym) => ({
        name: processedLexicon(synonym.name, true),
      })),
      projectId,
    };
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
