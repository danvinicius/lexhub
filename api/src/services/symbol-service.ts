import {
  CreateSymbolRequestDTO,
  UpdateSymbolRequestDTO,
} from '@/infra/http/dtos';
import { IImpact, ISymbol, ISynonym } from '@/models';
import { ScenarioRepository, SymbolRepository } from '@/repositories';
import { BadRequestError, NotFoundError } from '@/utils/errors';
import { normalize } from '@/utils/string/normalize';
import { Lexicon, LexiconService } from './lexicon-service';
import { ChangeService } from './change-service';
import { ProjectService } from './project-service';

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
  constructor(
    private symbolRepository = new SymbolRepository(),
    private scenarioRepository = new ScenarioRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService()
  ) {}
  async createSymbol(symbol: CreateSymbolRequestDTO, userId: string): Promise<ISymbol> {
    const symbols = await this.getAllSymbols(symbol.projectId);
    if (
      symbols.some(
        (existingSymbol: ISymbol) =>
          normalize(existingSymbol.name) == normalize(symbol.name)
      )
    ) {
      throw new BadRequestError('Já existe um símbolo com o mesmo nome');
    }
    const beforeChange = await this.projectService.getCleanProject(symbol.projectId, false);
    const created = await this.symbolRepository.createSymbol(symbol);
    const afterChange = await this.projectService.getCleanProject(symbol.projectId, false);
    await this.changeService.createChange(beforeChange, afterChange, symbol.projectId, symbol.name, userId);
    return created;
  }

  async deleteSymbol(id: string, userId: string): Promise<void> {
    const symbolExists = await this.symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }
    const beforeChange = await this.projectService.getCleanProject(symbolExists.project.id, false);
    await this.symbolRepository.deleteSymbol(id);
    const afterChange = await this.projectService.getCleanProject(symbolExists.project.id, false);
    await this.changeService.createChange(beforeChange, afterChange, symbolExists.project.id, symbolExists.name, userId);
  }

  async getSymbol(id: string): Promise<null | ISymbol> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new NotFoundError('Símbolo inexistente');
    }
    return symbol;
  }

  async getSymbolWithLexicon(
    symbolId: string,
    projectId: string
  ): Promise<ILexiconSymbol> {
    const lexiconService = new LexiconService();
    const symbol = await this.symbolRepository.getSymbol(symbolId);

    const [symbols, scenarios] = await Promise.all([
      this.symbolRepository.getAllSymbols(projectId),
      this.scenarioRepository.getAllScenarios(projectId),
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
    const symbols = await this.symbolRepository.getAllSymbols(projectId);
    return symbols;
  }

  async updateSymbol(
    id: string,
    symbol: UpdateSymbolRequestDTO,
    userId: string
  ): Promise<ISymbol> {
    const symbolExists = await this.symbolRepository.getSymbol(id);
    if (!symbolExists) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }
    const beforeChange = await this.projectService.getCleanProject(symbol.projectId);
    const updatedSymbol = this.symbolRepository.updateSymbol(id, symbol);
    const afterChange = await this.projectService.getCleanProject(symbol.projectId);
    await this.changeService.createChange(
      beforeChange,
      afterChange,
      symbol.projectId,
      symbol.name,
      userId
    );
    return updatedSymbol;
  }
}
