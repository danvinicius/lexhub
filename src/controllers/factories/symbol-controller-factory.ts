import { ProjectRepository, SymbolRepository } from '@/infra/db/protocols';

import {
  GetSymbolUseCase,
  GetAllSymbolsUseCase,
  CreateSymbolUseCase,
  UpdateSymbolUseCase,
  DeleteSymbolUseCase,
  CreateImpactUseCase,
  CreateSynonymUseCase,
  DeleteImpactUseCase,
  DeleteSynonymUseCase,
} from '@/use-cases/symbol';

import { SymbolController } from '@/controllers';

export class SymbolControllerFactory {
  static makeSymbolController(
    symbolRepository: SymbolRepository,
    projectRepository: ProjectRepository
  ) {
    return new SymbolController(
      new GetSymbolUseCase(symbolRepository),
      new GetAllSymbolsUseCase(symbolRepository),
      new CreateSymbolUseCase(symbolRepository),
      new UpdateSymbolUseCase(symbolRepository),
      new DeleteSymbolUseCase(symbolRepository),
      new CreateImpactUseCase(symbolRepository),
      new CreateSynonymUseCase(symbolRepository),
      new DeleteImpactUseCase(symbolRepository),
      new DeleteSynonymUseCase(symbolRepository)
    );
  }
}
