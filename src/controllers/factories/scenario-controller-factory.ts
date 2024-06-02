import {
  ProjectRepository,
  ScenarioRepository,
  SymbolRepository,
} from '@/infra/db/protocols';

import {
  GetScenarioUseCase,
  GetAllScenariosUseCase,
  CreateScenarioUseCase,
  CreateManyScenariosUseCase,
  UpdateScenarioUseCase,
  DeleteScenarioUseCase,
  CreateExceptionUseCase,
  CreateContextUseCase,
  CreateRestrictionUseCase,
  CreateActorUseCase,
  CreateResourceUseCase,
  AddActorUseCase,
  AddResourceUseCase,
  CreateEpisodeUseCase,
  DeleteExceptionUseCase,
  DeleteContextUseCase,
  DeleteRestrictionUseCase,
  DeleteActorUseCase,
  DeleteResourceUseCase,
  RemoveActorUseCase,
  RemoveResourceUseCase,
  DeleteEpisodeUseCase,
  DeleteGroupUseCase,
  GetScenarioWithLexiconsUseCase,
} from '@/use-cases/scenario';

import { ScenarioController } from '@/controllers';

export class ScenarioControllerFactory {
  static makeScenarioController(
    scenarioRepository: ScenarioRepository,
    projectRepository: ProjectRepository,
    symbolRepository: SymbolRepository
  ) {
    return new ScenarioController(
      new GetScenarioUseCase(scenarioRepository),
      new GetScenarioWithLexiconsUseCase(scenarioRepository, symbolRepository),
      new GetAllScenariosUseCase(scenarioRepository),
      new CreateScenarioUseCase(scenarioRepository),
      new CreateManyScenariosUseCase(scenarioRepository),
      new UpdateScenarioUseCase(scenarioRepository),
      new DeleteScenarioUseCase(scenarioRepository),
      new CreateExceptionUseCase(scenarioRepository),
      new CreateContextUseCase(scenarioRepository),
      new CreateRestrictionUseCase(scenarioRepository),
      new CreateActorUseCase(scenarioRepository),
      new CreateResourceUseCase(scenarioRepository),
      new AddActorUseCase(scenarioRepository),
      new AddResourceUseCase(scenarioRepository),
      new CreateEpisodeUseCase(scenarioRepository),
      new DeleteExceptionUseCase(scenarioRepository),
      new DeleteContextUseCase(scenarioRepository),
      new DeleteRestrictionUseCase(scenarioRepository),
      new DeleteActorUseCase(scenarioRepository),
      new DeleteResourceUseCase(scenarioRepository),
      new RemoveActorUseCase(scenarioRepository),
      new RemoveResourceUseCase(scenarioRepository),
      new DeleteEpisodeUseCase(scenarioRepository),
      new DeleteGroupUseCase(scenarioRepository)
    );
  }
}
