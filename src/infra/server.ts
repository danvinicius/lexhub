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
import { ProjectRepository, SymbolRepository, ScenarioRepository, UserRepository } from '@/infra/db/repositories';
import { ProjectController, ScenarioController, SymbolController, UserController } from '@/controllers';
import { CreateProjectUseCase, DeleteProjectUseCase, GetAllProjectsUseCase, GetProjectUseCase, UpdateProjectUseCase } from '@/use-cases/project';
import { GetScenarioUseCase, GetScenarioWithLexiconsUseCase, GetAllScenariosUseCase, CreateScenarioUseCase, CreateManyScenariosUseCase, UpdateScenarioUseCase, DeleteScenarioUseCase, CreateExceptionUseCase, CreateContextUseCase, CreateRestrictionUseCase, CreateActorUseCase, CreateResourceUseCase, AddActorUseCase, AddResourceUseCase, CreateEpisodeUseCase, DeleteExceptionUseCase, DeleteContextUseCase, DeleteRestrictionUseCase, DeleteActorUseCase, DeleteResourceUseCase, RemoveActorUseCase, RemoveResourceUseCase, DeleteEpisodeUseCase, DeleteGroupUseCase } from '@/use-cases/scenario';
import { GetSymbolUseCase, GetAllSymbolsUseCase, CreateSymbolUseCase, UpdateSymbolUseCase, DeleteSymbolUseCase, CreateImpactUseCase, CreateSynonymUseCase, DeleteImpactUseCase, DeleteSynonymUseCase } from '@/use-cases/symbol';
import { AuthenticateUserUseCase, CreateUserUseCase } from '@/use-cases/user';
import { AddUserToProjectUseCase } from '@/use-cases/user/add-user-to-project';
import { BcryptService, JwtService } from './security';

export class Server {
  private ds: DataSource;
  
  private router = Router();
  private projectRepository: ProjectRepository;
  private symbolRepository: SymbolRepository;
  private scenarioRepository: ScenarioRepository;
  private userRepository: UserRepository;
  private jwtService: JwtService;
  private bcryptService: BcryptService;
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
    this.server.listen(3000, () => Logger.info('Server running on port 3000'));
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
    this.projectRepository = new ProjectRepository(this.ds);
    this.symbolRepository = new SymbolRepository(this.ds);
    this.scenarioRepository = new ScenarioRepository(this.ds);
    this.userRepository = new UserRepository(this.ds);
  }

  private setupControllers() {
    const projectController = new ProjectController(
      new GetProjectUseCase(this.projectRepository),
      new GetAllProjectsUseCase(this.projectRepository),
      new CreateProjectUseCase(this.projectRepository, this.userRepository),
      new UpdateProjectUseCase(this.projectRepository),
      new DeleteProjectUseCase(this.projectRepository)
    );
    const symbolController = new SymbolController(
      new GetSymbolUseCase(this.symbolRepository),
      new GetAllSymbolsUseCase(this.symbolRepository),
      new CreateSymbolUseCase(this.symbolRepository),
      new UpdateSymbolUseCase(this.symbolRepository),
      new DeleteSymbolUseCase(this.symbolRepository),
      new CreateImpactUseCase(this.symbolRepository),
      new CreateSynonymUseCase(this.symbolRepository),
      new DeleteImpactUseCase(this.symbolRepository),
      new DeleteSynonymUseCase(this.symbolRepository)
    )
    const userController = new UserController(
      new AuthenticateUserUseCase(this.userRepository, this.jwtService, this.bcryptService),
      new CreateUserUseCase(this.userRepository, this.jwtService, this.bcryptService),
      new AddUserToProjectUseCase(this.userRepository, this.projectRepository)
    );
    const scenarioController = new ScenarioController(
      new GetScenarioUseCase(this.scenarioRepository),
      new GetScenarioWithLexiconsUseCase(this.scenarioRepository, this.symbolRepository),
      new GetAllScenariosUseCase(this.scenarioRepository),
      new CreateScenarioUseCase(this.scenarioRepository),
      new CreateManyScenariosUseCase(this.scenarioRepository),
      new UpdateScenarioUseCase(this.scenarioRepository),
      new DeleteScenarioUseCase(this.scenarioRepository),
      new CreateExceptionUseCase(this.scenarioRepository),
      new CreateContextUseCase(this.scenarioRepository),
      new CreateRestrictionUseCase(this.scenarioRepository),
      new CreateActorUseCase(this.scenarioRepository),
      new CreateResourceUseCase(this.scenarioRepository),
      new AddActorUseCase(this.scenarioRepository),
      new AddResourceUseCase(this.scenarioRepository),
      new CreateEpisodeUseCase(this.scenarioRepository),
      new DeleteExceptionUseCase(this.scenarioRepository),
      new DeleteContextUseCase(this.scenarioRepository),
      new DeleteRestrictionUseCase(this.scenarioRepository),
      new DeleteActorUseCase(this.scenarioRepository),
      new DeleteResourceUseCase(this.scenarioRepository),
      new RemoveActorUseCase(this.scenarioRepository),
      new RemoveResourceUseCase(this.scenarioRepository),
      new DeleteEpisodeUseCase(this.scenarioRepository),
      new DeleteGroupUseCase(this.scenarioRepository)
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
