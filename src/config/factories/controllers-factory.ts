import {
  ProjectRepository,
  ScenarioRepository,
  SymbolRepository,
} from "@/data/protocols";
import {
  DbCreateProject,
  DbDeleteProject,
  DbGetAllProjects,
  DbGetProject,
  DbUpdateProject,
} from "@/data/usecases/project";
import {
  DbAddActor,
  DbAddResource,
  DbCreateActor,
  DbCreateContext,
  DbCreateEpisode,
  DbCreateException,
  DbCreateManyScenarios,
  DbCreateResource,
  DbCreateRestriction,
  DbCreateScenario,
  DbDeleteActor,
  DbDeleteContext,
  DbDeleteEpisode,
  DbDeleteException,
  DbDeleteGroup,
  DbDeleteResource,
  DbDeleteRestriction,
  DbDeleteScenario,
  DbGetAllScenarios,
  DbGetScenario,
  DbGetScenarioWithLexicons,
  DbRemoveActor,
  DbRemoveResource,
  DbUpdateScenario,
} from "@/data/usecases/scenario";
import {
  DbCreateImpact,
  DbCreateSymbol,
  DbCreateSynonym,
  DbDeleteImpact,
  DbDeleteSymbol,
  DbDeleteSynonym,
  DbGetAllSymbols,
  DbGetSymbol,
  DbUpdateSymbol,
} from "@/data/usecases/symbol";
import ProjectController from "@/presentation/http/controllers/project-controller";
import ScenarioController from "@/presentation/http/controllers/scenario-controller";
import SymbolController from "@/presentation/http/controllers/symbol-controller";

export class ControllerFactory {
  static createProjectController(projectRepository: ProjectRepository) {
    return ProjectController(
      new DbGetProject(projectRepository),
      new DbGetAllProjects(projectRepository),
      new DbCreateProject(projectRepository),
      new DbUpdateProject(projectRepository),
      new DbDeleteProject(projectRepository)
    );
  }

  static createScenarioController(
    scenarioRepository: ScenarioRepository,
    symbolRepository: SymbolRepository
  ) {
    return ScenarioController(
      new DbGetScenario(scenarioRepository),
      new DbGetScenarioWithLexicons(scenarioRepository, symbolRepository),
      new DbGetAllScenarios(scenarioRepository),
      new DbCreateScenario(scenarioRepository),
      new DbCreateManyScenarios(scenarioRepository),
      new DbUpdateScenario(scenarioRepository),
      new DbDeleteScenario(scenarioRepository),
      new DbCreateException(scenarioRepository),
      new DbCreateContext(scenarioRepository),
      new DbCreateRestriction(scenarioRepository),
      new DbCreateActor(scenarioRepository),
      new DbCreateResource(scenarioRepository),
      new DbAddActor(scenarioRepository),
      new DbAddResource(scenarioRepository),
      new DbCreateEpisode(scenarioRepository),
      new DbDeleteException(scenarioRepository),
      new DbDeleteContext(scenarioRepository),
      new DbDeleteRestriction(scenarioRepository),
      new DbDeleteActor(scenarioRepository),
      new DbDeleteResource(scenarioRepository),
      new DbRemoveActor(scenarioRepository),
      new DbRemoveResource(scenarioRepository),
      new DbDeleteEpisode(scenarioRepository),
      new DbDeleteGroup(scenarioRepository)
    );
  }

  static creatSymbolController(symbolRepository: SymbolRepository) {
    return SymbolController(
      new DbGetSymbol(symbolRepository),
      new DbGetAllSymbols(symbolRepository),
      new DbCreateSymbol(symbolRepository),
      new DbUpdateSymbol(symbolRepository),
      new DbDeleteSymbol(symbolRepository),
      new DbCreateImpact(symbolRepository),
      new DbCreateSynonym(symbolRepository),
      new DbDeleteImpact(symbolRepository),
      new DbDeleteSynonym(symbolRepository)
    );
  }
}
