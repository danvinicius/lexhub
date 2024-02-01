import dotenv from 'dotenv'
dotenv.config()

import server from "./server";
import ProjectRouter from "./presentation/routers/project-router";
import SymbolRouter from "./presentation/routers/symbol-router";
import { MySQLProjectRepository } from "./data/repositories/mysql/mysql-project-database-repository";
import { MySQLSymbolRepository } from "./data/repositories/mysql/mysql-symbol-database-repository";
import { GetProject } from "./domain/use-cases/project/get-project";
import { GetAllProjects } from "./domain/use-cases/project/get-all-projects";
import { CreateProject } from "./domain/use-cases/project/create-project";
import { UpdateProject } from "./domain/use-cases/project/update-project";
import { DeleteProject } from "./domain/use-cases/project/delete-project";
import { GetSymbol } from "./domain/use-cases/symbol/get-symbol";
import { GetAllSymbols } from "./domain/use-cases/symbol/get-all-symbols";
import { CreateSymbol } from "./domain/use-cases/symbol/create-symbol";
import { DeleteSymbol } from "./domain/use-cases/symbol/delete-symbol";
import { UpdateSymbol } from "./domain/use-cases/symbol/update-symbol";
import { errorHandler } from "./presentation/middlewares/error-handler";
import { AppDataSource } from "./data/mysql";

(async function () {
  const ds = await AppDataSource.initialize();

  const projectRepository = new MySQLProjectRepository(ds)
  const symbolRepository = new MySQLSymbolRepository(ds)

  const projectRouter = ProjectRouter(
    new GetProject(projectRepository),
    new GetAllProjects(projectRepository),
    new CreateProject(projectRepository),
    new UpdateProject(projectRepository),
    new DeleteProject(projectRepository)
  );

  const symbolRouter = SymbolRouter(
    new GetSymbol(symbolRepository),
    new GetAllSymbols(symbolRepository),
    new CreateSymbol(symbolRepository),
    new UpdateSymbol(symbolRepository),
    new DeleteSymbol(symbolRepository)
  );

  server.use("/api/project", projectRouter);
  server.use("/api/symbol", symbolRouter);

  server.use(errorHandler);
  server.listen(3000, () => console.log("Server running on port 3000"));
})();
