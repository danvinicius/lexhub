import dotenv from 'dotenv'
dotenv.config()

import server from "./server";
import ProjectController from "../application/http/controllers/project-controller";
import SymbolController from "../application/http/controllers/symbol-controller";
import ScenarioController from '../application/http/controllers/scenario-controller';
import { MySQLProjectRepository } from "../infra/repositories/mysql/mysql-project-database-repository";
import { MySQLSymbolRepository } from "../infra/repositories/mysql/mysql-symbol-database-repository";
import { MySQLScenarioRepository } from "../infra/repositories/mysql/mysql-scenario-database-repository";
import { GetProject } from '../core/domain/use-cases/project/get-project';
import { GetAllProjects } from '../core/domain/use-cases/project/get-all-projects';
import { CreateProject } from '../core/domain/use-cases/project/create-project';
import { UpdateProject } from '../core/domain/use-cases/project/update-project';
import { DeleteProject } from '../core/domain/use-cases/project/delete-project';
import { GetSymbol } from '../core/domain/use-cases/symbol/get-symbol';
import { GetAllSymbols } from '../core/domain/use-cases/symbol/get-all-symbols';
import { CreateSymbol } from '../core/domain/use-cases/symbol/create-symbol';
import { DeleteSymbol } from '../core/domain/use-cases/symbol/delete-symbol';
import { CreateImpact } from '../core/domain/use-cases/symbol/create-impact';
import { CreateSynonym } from '../core/domain/use-cases/symbol/create-synonym';
import { DeleteImpact } from '../core/domain/use-cases/symbol/delete-impact';
import { DeleteSynonym } from '../core/domain/use-cases/symbol/delete-synonym';
import { UpdateSymbol } from '../core/domain/use-cases/symbol/update-symbol';
import { errorHandler } from "../application/middlewares/error-handler";
import { CreateScenario } from '../core/domain/use-cases/scenario/create-scenario';
import { DeleteScenario } from '../core/domain/use-cases/scenario/delete-scenario';
import { GetAllScenarios } from '../core/domain/use-cases/scenario/get-all-scenarios';
import { GetScenario } from '../core/domain/use-cases/scenario/get-scenario';
import { UpdateScenario } from '../core/domain/use-cases/scenario/update-scenario';
import { GetScenarioWithLexicons } from '../core/domain/use-cases/scenario/get-scenario-with-lexicons';
import { AppDataSource } from '../infra/database/connection';
import { Logger } from './logger';
import { CreateException } from '../core/domain/use-cases/scenario/create-exception';
import { CreateContext } from '../core/domain/use-cases/scenario/create-context';
import { CreateRestriction } from '../core/domain/use-cases/scenario/create-restriction';
import { DeleteContext } from '../core/domain/use-cases/scenario/delete-context';
import { DeleteException } from '../core/domain/use-cases/scenario/delete-exception';
import { DeleteRestriction } from '../core/domain/use-cases/scenario/delete-restriction';

(async function () {
  const logger = Logger.getInstance()
  const ds = await AppDataSource.initialize();

  const projectRepository = new MySQLProjectRepository(ds)
  const symbolRepository = new MySQLSymbolRepository(ds)
  const scenarioRepository = new MySQLScenarioRepository(ds)

  const projectController = ProjectController(
    new GetProject(projectRepository),
    new GetAllProjects(projectRepository),
    new CreateProject(projectRepository),
    new UpdateProject(projectRepository),
    new DeleteProject(projectRepository)
  );

  const symbolController = SymbolController(
    new GetSymbol(symbolRepository),
    new GetAllSymbols(symbolRepository),
    new CreateSymbol(symbolRepository),
    new UpdateSymbol(symbolRepository),
    new DeleteSymbol(symbolRepository),
    new CreateImpact(symbolRepository),
    new CreateSynonym(symbolRepository),
    new DeleteImpact(symbolRepository),
    new DeleteSynonym(symbolRepository),
  );

  const scenarioController = ScenarioController(
    new GetScenario(scenarioRepository),
    new GetScenarioWithLexicons(scenarioRepository, symbolRepository),
    new GetAllScenarios(scenarioRepository),
    new CreateScenario(scenarioRepository),
    new UpdateScenario(scenarioRepository),
    new DeleteScenario(scenarioRepository),
    new CreateException(scenarioRepository),
    new CreateContext(scenarioRepository),
    new CreateRestriction(scenarioRepository),
    new DeleteException(scenarioRepository),
    new DeleteContext(scenarioRepository),
    new DeleteRestriction(scenarioRepository),
  );

  server.use("/api/project", projectController);
  server.use("/api/symbol", symbolController);
  server.use("/api/scenario", scenarioController);

  server.use(errorHandler);
  server.listen(3000, () => logger.info("Server running on port 3000"));
})();