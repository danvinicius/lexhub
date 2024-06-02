import dotenv from 'dotenv'
dotenv.config();
import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import helmet from 'helmet';
import { DataSource } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import { Logger } from '../util/logger/logger';
import { AppDataSource } from '@/infra/db/connection';
import { scenarioRouter } from '@/infra/http/routers/scenario-router';
import express, { Application, Request, Response, Router } from 'express';
import { userRouter, projectRouter, symbolRouter } from '@/infra/http/routers';
import { UserControllerFactory } from '@/controllers/factories/user-controller-factory';
import { SymbolControllerFactory } from '@/controllers/factories/symbol-controller-factory';
import { ProjectControllerFactory } from '@/controllers/factories/project-controller-factory';
import { ScenarioControllerFactory } from '../controllers/factories/scenario-controller-factory';
import { ProjectRepository, ScenarioRepository, SymbolRepository, UserRepository } from './db/protocols';
import { MySQLProjectRepository, MySQLSymbolRepository, MySQLScenarioRepository, MySQLUserRepository } from '@/infra/db/repositories';

export class Server {
  private ds: DataSource;
  
  private router = Router();
  private projectRepository: ProjectRepository;
  private symbolRepository: SymbolRepository;
  private scenarioRepository: ScenarioRepository;
  private userRepository: UserRepository;
  private server: Application
  private static _instance: Server;

  public static getInstance() {
    if (!Server._instance) {
      Server._instance = new Server();
    }
    return Server._instance;
  }

  constructor() { }

  public async run() {
    Server.getInstance().config()
    await Server.getInstance().initDb();
    Server.getInstance().setupControllers();
    Server.getInstance().setupDocumentation();
    this.server.listen(3000, () => Server.getInstance().logger.info('Server running on port 3000'));
  }

  private config() {
    this.server = express()
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use('/api/health', (_req: Request, res: Response) => {
      return res.json({ ok: 'ok' });
    });
    this.server.use('/api', this.router);
  }

  private async initDb() {
    this.ds = await AppDataSource.initialize();
    this.projectRepository = new MySQLProjectRepository(this.ds);
    this.symbolRepository = new MySQLSymbolRepository(this.ds);
    this.scenarioRepository = new MySQLScenarioRepository(this.ds);
    this.userRepository = new MySQLUserRepository(this.ds);
  }

  private setupControllers() {
    const projectController = ProjectControllerFactory.makeProjectController(
      this.projectRepository,
      this.userRepository
    );
    const symbolController = SymbolControllerFactory.makeSymbolController(
      this.symbolRepository,
      this.projectRepository
    );
    const userController = UserControllerFactory.makeUserController(
      this.userRepository
    );
    const scenarioController = ScenarioControllerFactory.makeScenarioController(
      this.scenarioRepository,
      this.projectRepository,
      this.symbolRepository
    );
    projectRouter(this.router, projectController);
    symbolRouter(this.router, symbolController);
    scenarioRouter(this.router, scenarioController);
    userRouter(this.router, userController);
  }

  private setupDocumentation() {
    const file = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'swagger.yaml'),
      'utf8'
    );
    const swaggerDocument = YAML.parse(file);
    this.server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public getUserRepository() {
    return this.userRepository;
  }
}
