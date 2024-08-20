import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { Logger } from './utils/logger/logger';
import { scenarioRouter } from '@/infra/http/routers/scenario-router';
import express, { Application, Request, Response, Router } from 'express';
import { userRouter, projectRouter, symbolRouter } from '@/infra/http/routers';
import { ProjectController, ScenarioController, SymbolController, UserController } from '@/controllers';

export class Server {
  
  private router = Router();
  private server: Application;

  public async run() {
    this.config()
    this.setupControllers();
    this.setupDocumentation();
    this.server.listen(3000, () => Logger.info('Server running on port 3000'));
  }

  private config() {
    this.server = express()
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use('/api/health', (_req: Request, res: Response) => {
      return res.json({ ok: 'ok' });
    });
    this.server.use('/api', this.router);
  }

  private setupControllers() {
    const projectController = new ProjectController();
    const symbolController = new SymbolController()
    const userController = new UserController();
    const scenarioController = new ScenarioController();
    projectRouter(this.router, projectController);
    symbolRouter(this.router, symbolController);
    scenarioRouter(this.router, scenarioController);
    userRouter(this.router, userController);
  }

  private setupDocumentation() {
    const file = fs.readFileSync(
      path.resolve(__dirname, '..','swagger.yaml'),
      'utf8'
    );
    const swaggerDocument = YAML.parse(file);
    this.server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}
