import dotenv from 'dotenv';
dotenv.config();
import server from '@/config/server';
import {
  MySQLProjectRepository,
  MySQLSymbolRepository,
  MySQLScenarioRepository,
  MySQLUserRepository,
} from '@/infra/db/repositories';
import { AppDataSource } from '@/infra/db/connection';
import { Logger } from '../util/logger/logger';
import { Request, Response, Router } from 'express';
import { userRouter, projectRouter, symbolRouter } from '@/infra/http/routers';
import { scenarioRouter } from '@/infra/http/routers/scenario-router';
import { ProjectControllerFactory } from '@/controllers/factories/project-controller-factory';
import { SymbolControllerFactory } from '@/controllers/factories/symbol-controller-factory';
import { UserController } from '@/controllers';
import { ScenarioControllerFactory } from '../controllers/factories/scenario-controller-factory';
import { UserControllerFactory } from '@/controllers/factories/user-controller-factory';

(async function () {
  const logger = Logger.getInstance();
  const ds = await AppDataSource.initialize();
  const router = Router();

  const projectRepository = new MySQLProjectRepository(ds);
  const symbolRepository = new MySQLSymbolRepository(ds);
  const scenarioRepository = new MySQLScenarioRepository(ds);
  const userRepository = new MySQLUserRepository(ds);

  const projectController =
    ProjectControllerFactory.makeProjectController(projectRepository);
  const symbolController = SymbolControllerFactory.makeSymbolController(
    symbolRepository,
    projectRepository
  );
  const userController =
    UserControllerFactory.makeUserController(userRepository);
  const scenarioController = ScenarioControllerFactory.makeScenarioController(
    scenarioRepository,
    projectRepository,
    symbolRepository
  );

  server.use('/api/health', (_req: Request, res: Response) => {
    return res.json({ ok: 'ok' });
  });

  projectRouter(router, projectController);
  symbolRouter(router, symbolController);
  scenarioRouter(router, scenarioController);
  userRouter(router, userController);
  server.use('/api', router);
  server.listen(3000, () => logger.info('Server running on port 3000'));
})();
