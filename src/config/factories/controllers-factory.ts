import {
  ProjectRepository,
  ScenarioRepository,
  SymbolRepository,
  UserRepository,
} from "@/data/protocols";
import * as ProjectUseCase from "@/data/use-cases/project";
import * as ScenarioUseCase from "@/data/use-cases/scenario";
import * as SymbolUseCase from "@/data/use-cases/symbol";
import * as UserUseCase from "@/data/use-cases/user";
import { BcryptAdapter } from "@/infra/security/bcrypt-adapter";
import { JwtAdapter } from "@/infra/security/jwt-adapter";
import ProjectController from "@/presentation/http/controllers/project-controller";
import ScenarioController from "@/presentation/http/controllers/scenario-controller";
import SymbolController from "@/presentation/http/controllers/symbol-controller";
import UserController from "@/presentation/http/controllers/user-controller";

export class ControllerFactory {
  static createProjectController(projectRepository: ProjectRepository) {
    return ProjectController(
      new ProjectUseCase.DbGetProject(projectRepository),
      new ProjectUseCase.DbGetAllProjects(projectRepository),
      new ProjectUseCase.DbCreateProject(projectRepository),
      new ProjectUseCase.DbUpdateProject(projectRepository),
      new ProjectUseCase.DbDeleteProject(projectRepository)
    );
  }

  static createScenarioController(
    scenarioRepository: ScenarioRepository,
    symbolRepository: SymbolRepository
  ) {
    return ScenarioController(
      new ScenarioUseCase.DbGetScenario(scenarioRepository),
      new ScenarioUseCase.DbGetScenarioWithLexicons(
        scenarioRepository,
        symbolRepository
      ),
      new ScenarioUseCase.DbGetAllScenarios(scenarioRepository),
      new ScenarioUseCase.DbCreateScenario(scenarioRepository),
      new ScenarioUseCase.DbCreateManyScenarios(scenarioRepository),
      new ScenarioUseCase.DbUpdateScenario(scenarioRepository),
      new ScenarioUseCase.DbDeleteScenario(scenarioRepository),
      new ScenarioUseCase.DbCreateException(scenarioRepository),
      new ScenarioUseCase.DbCreateContext(scenarioRepository),
      new ScenarioUseCase.DbCreateRestriction(scenarioRepository),
      new ScenarioUseCase.DbCreateActor(scenarioRepository),
      new ScenarioUseCase.DbCreateResource(scenarioRepository),
      new ScenarioUseCase.DbAddActor(scenarioRepository),
      new ScenarioUseCase.DbAddResource(scenarioRepository),
      new ScenarioUseCase.DbCreateEpisode(scenarioRepository),
      new ScenarioUseCase.DbDeleteException(scenarioRepository),
      new ScenarioUseCase.DbDeleteContext(scenarioRepository),
      new ScenarioUseCase.DbDeleteRestriction(scenarioRepository),
      new ScenarioUseCase.DbDeleteActor(scenarioRepository),
      new ScenarioUseCase.DbDeleteResource(scenarioRepository),
      new ScenarioUseCase.DbRemoveActor(scenarioRepository),
      new ScenarioUseCase.DbRemoveResource(scenarioRepository),
      new ScenarioUseCase.DbDeleteEpisode(scenarioRepository),
      new ScenarioUseCase.DbDeleteGroup(scenarioRepository)
    );
  }

  static creatSymbolController(symbolRepository: SymbolRepository) {
    return SymbolController(
      new SymbolUseCase.DbGetSymbol(symbolRepository),
      new SymbolUseCase.DbGetAllSymbols(symbolRepository),
      new SymbolUseCase.DbCreateSymbol(symbolRepository),
      new SymbolUseCase.DbUpdateSymbol(symbolRepository),
      new SymbolUseCase.DbDeleteSymbol(symbolRepository),
      new SymbolUseCase.DbCreateImpact(symbolRepository),
      new SymbolUseCase.DbCreateSynonym(symbolRepository),
      new SymbolUseCase.DbDeleteImpact(symbolRepository),
      new SymbolUseCase.DbDeleteSynonym(symbolRepository)
    );
  }

  static creatUserController(userRepository: UserRepository) {
    const bcryptAdapter = new BcryptAdapter(10);
    const jwtAdapter = new JwtAdapter("secret");
    return UserController(
      new UserUseCase.DbAuthenticateUser(
        userRepository,
        jwtAdapter,
        bcryptAdapter
      ),
      new UserUseCase.DbCreateUser(userRepository, jwtAdapter, bcryptAdapter),
    );
  }
}
