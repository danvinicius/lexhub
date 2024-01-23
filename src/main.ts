import server from "./server";
import ProjectRouter from "./presentation/routers/project-router";
import SymbolRouter from "./presentation/routers/symbol-router";
import { MongoDBSymbolDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-symbol-wrapper";
import { MongoDBProjectDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-project-database-wrapper";
import { SymbolRepositoryImpl } from "./domain/repositories/symbol-repository";
import { ProjectRepositoryImpl } from "./domain/repositories/project-repository";
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
import { getMongoDB } from "./data/mongodb";

(async function () {
  const project = (await getMongoDB()).collection('project');
  const symbol = (await getMongoDB()).collection('symbol');

  const projectRepository = new ProjectRepositoryImpl(new MongoDBProjectDatabaseWrapper(project));
  const symbolRepository = new SymbolRepositoryImpl(new MongoDBSymbolDatabaseWrapper(symbol));

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
