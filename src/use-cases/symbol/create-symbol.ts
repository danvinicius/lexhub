import { ISymbol } from '@/entities';
import { ProjectRepository, SymbolRepository } from '@/infra/db/protocols';
import { CreateSymbolRequestDTO } from '@/infra/http/dtos';
import { InvalidParamError } from '@/util/errors';

export class CreateSymbolUseCase {
  constructor(
    private symbolRepository: SymbolRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute(symbol: CreateSymbolRequestDTO): Promise<ISymbol> {
    const projectExists = await this.projectRepository.getProject(
      symbol.projectId
    );
    if (!projectExists) {
      throw new InvalidParamError('projectId');
    }
    return await this.symbolRepository.createSymbol(symbol);
  }
}
