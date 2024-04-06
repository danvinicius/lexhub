import dotenv from "dotenv";
dotenv.config();
import server from "@/config/server";
import {
  MySQLProjectRepository,
  MySQLSymbolRepository,
  MySQLScenarioRepository,
  MySQLUserRepository,
} from "@/infra/db/mysql/repositories";
import { errorHandler } from "@/presentation/middlewares/error-handler";
import { AppDataSource } from "@/infra/db/connection";
import { Logger } from "./logger";
import { ControllerFactory } from "./factories/controllers-factory";
import { Request, Response } from "express";

(async function () {
  const logger = Logger.getInstance();
  const ds = await AppDataSource.initialize();

  const projectRepository = new MySQLProjectRepository(ds);
  const symbolRepository = new MySQLSymbolRepository(ds);
  const scenarioRepository = new MySQLScenarioRepository(ds);
  const userRepository = new MySQLUserRepository(ds);

  const projectController =
    ControllerFactory.createProjectController(projectRepository);
  const symbolController =
    ControllerFactory.creatSymbolController(symbolRepository);
  const scenarioController = ControllerFactory.createScenarioController(
    scenarioRepository,
    symbolRepository
  );
  const userController = ControllerFactory.creatUserController(userRepository);

  server.use("/api/health", (_req: Request, res: Response) => {
    return res.json({ ok: "ok" });
  });

  server.use("/api/project", projectController);
  server.use("/api/symbol", symbolController);
  server.use("/api/scenario", scenarioController);
  server.use("/api/user", userController);

  server.use(errorHandler);
  server.listen(3000, () => logger.info("Server running on port 3000"));
})();
