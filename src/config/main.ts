import dotenv from 'dotenv'
dotenv.config()

import server from "./server";
import { MySQLProjectRepository } from "../infra/repositories/mysql/mysql-project-database-repository";
import { MySQLSymbolRepository } from "../infra/repositories/mysql/mysql-symbol-database-repository";
import { MySQLScenarioRepository } from "../infra/repositories/mysql/mysql-scenario-database-repository";
import { errorHandler } from "../application/middlewares/error-handler";
import { AppDataSource } from '../infra/database/connection';
import { Logger } from './logger';
import { ControllerFactory } from './factories/controllers-factory'

(async function () {
  const logger = Logger.getInstance()
  const ds = await AppDataSource.initialize();

  const projectRepository = new MySQLProjectRepository(ds)
  const symbolRepository = new MySQLSymbolRepository(ds)
  const scenarioRepository = new MySQLScenarioRepository(ds)

  const projectController = ControllerFactory.createProjectController(projectRepository)
  const symbolController = ControllerFactory.creatSymbolController(symbolRepository)
  const scenarioController = ControllerFactory.createScenarioController(scenarioRepository, symbolRepository);

  server.use("/api/project", projectController);
  server.use("/api/symbol", symbolController);
  server.use("/api/scenario", scenarioController);

  server.use(errorHandler);
  server.listen(3000, () => logger.info("Server running on port 3000"));
})();