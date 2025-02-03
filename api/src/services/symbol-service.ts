import {
  CreateSymbolRequestDTO,
  UpdateSymbolRequestDTO,
} from '@/infra/http/dtos';
import { IImpact, ISymbol, ISynonym } from '@/models';
import { ScenarioRepository, SymbolRepository } from '@/repositories';
import { BadRequestError } from '@/utils/errors';
import { normalize } from '@/utils/string/normalize';
import { Lexicon, LexiconService } from './lexicon-service';
import { ChangeService } from './change-service';
import { ProjectService } from './project-service';

export interface ILexiconSymbol {
  id: String;
  name: string;
  notion: Lexicon;
  classification: string;
  impacts: {
    description: Lexicon;
  }[];
  synonyms: {
    name: Lexicon;
  }[];
  projectId: String;
}

export class SymbolService {
  constructor(
    private symbolRepository = new SymbolRepository(),
    private scenarioRepository = new ScenarioRepository(),
    private projectService = new ProjectService(),
    private changeService = new ChangeService()
  ) {}
  async createSymbol(
    data: CreateSymbolRequestDTO,
    userId: string
  ): Promise<ISymbol | null> {
    const symbols = await this.getAllSymbols(data.projectId);

    const isDuplicate = symbols.some((symbol: ISymbol) => {
      if (normalize(symbol.name) === normalize(data.name)) {
        return true;
      }
      if (
        symbol.synonyms?.some(
          (synonym) => normalize(synonym.name) === normalize(data.name)
        )
      ) {
        return true;
      }

      if (
        data.synonyms.some(
          (newSynonym) =>
            normalize(newSynonym.name) === normalize(symbol.name) ||
            symbol.synonyms?.some(
              (existingSynonym) =>
                normalize(existingSynonym.name) === normalize(newSynonym.name)
            )
        )
      ) {
        return true;
      }

      return false;
    });

    if (isDuplicate) {
      throw new BadRequestError(
        'Já existe um símbolo com o mesmo nome ou sinônimo.'
      );
    }

    const projectBeforeChange = await this.projectService.getCleanProject(
      data.projectId,
      false
    );

    const createdSymbol = await this.symbolRepository.createSymbol(data);

    const projectAfterChange = await this.projectService.getCleanProject(
      data.projectId,
      false
    );

    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      data.projectId,
      data.name,
      userId
    );

    return createdSymbol;
  }

  async getSymbol(id: String): Promise<null | ISymbol> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      return null;
    }
    return symbol;
  }

  async getSymbolWithLexicon(
    symbolId: String,
    projectId: String
  ): Promise<ILexiconSymbol | null> {
    const lexiconService = new LexiconService();
    const symbol = await this.symbolRepository.getSymbol(symbolId);
    if (!symbol) {
      return null;
    }
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
      id: symbol?.id || '',
      name,
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

  async getAllSymbols(projectId: String): Promise<ISymbol[]> {
    const symbols = await this.symbolRepository.getAllSymbols(projectId);
    return symbols;
  }

  async updateSymbol(
    id: String,
    data: UpdateSymbolRequestDTO,
    userId: String
  ): Promise<ISymbol | null> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }

    const existingSymbols = await this.getAllSymbols(data.projectId);

    const isDuplicate = existingSymbols
      .filter((existingSymbol) => existingSymbol.id !== symbol.id)
      .some((symbol: ISymbol) => {
        if (normalize(symbol.name) === normalize(data.name)) {
          return true;
        }
        if (
          symbol.synonyms?.some(
            (synonym) => normalize(synonym.name) === normalize(data.name)
          )
        ) {
          return true;
        }

        if (
          data.synonyms.some(
            (newSynonym) =>
              normalize(newSynonym.name) === normalize(symbol.name) ||
              symbol.synonyms?.some(
                (existingSynonym) =>
                  normalize(existingSynonym.name) === normalize(newSynonym.name)
              )
          )
        ) {
          return true;
        }

        return false;
      });

    if (isDuplicate) {
      throw new BadRequestError(
        'Já existe um símbolo com o mesmo nome ou sinônimo.'
      );
    }

    const projectBeforeChange = await this.projectService.getCleanProject(
      data.projectId
    );
    const updatedSymbol = this.symbolRepository.updateSymbol(id, data);
    const projectAfterChange = await this.projectService.getCleanProject(
      data.projectId
    );
    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      data.projectId,
      data.name,
      userId
    );
    return updatedSymbol;
  }

  async deleteSymbol(id: String, userId: String): Promise<void> {
    const symbol = await this.symbolRepository.getSymbol(id);
    if (!symbol) {
      throw new BadRequestError('Símbolo inválido ou inexistente');
    }
    const projectBeforeChange = await this.projectService.getCleanProject(
      symbol.project,
      false
    );
    await this.symbolRepository.deleteSymbol(id);
    const projectAfterChange = await this.projectService.getCleanProject(
      symbol.project,
      false
    );
    await this.changeService.createChange(
      projectBeforeChange,
      projectAfterChange,
      symbol.project,
      symbol.name,
      userId
    );
  }
}
