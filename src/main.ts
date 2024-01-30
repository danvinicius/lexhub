import server from "./server";
import ProjectRouter from "./presentation/routers/project-router";
import SymbolRouter from "./presentation/routers/symbol-router";
import ScenarioRouter from "./presentation/routers/scenario-router";
import { MongoDBProjectDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-project-database-wrapper";
import { MongoDBSymbolDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-symbol-wrapper";
import { MongoDBScenarioDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-scenario-wrapper";
import { ProjectRepositoryImpl } from "./domain/repositories/project-repository";
import { SymbolRepositoryImpl } from "./domain/repositories/symbol-repository";
import { ScenarioRepositoryImpl } from "./domain/repositories/scenario-repository";
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
import { GetScenario } from "./domain/use-cases/scenario/get-scenario";
import { CreateScenario } from "./domain/use-cases/scenario/create-scenario";
import { DeleteScenario } from "./domain/use-cases/scenario/delete-scenario";
import { GetAllScenarios } from "./domain/use-cases/scenario/get-all-scenarios";
import { UpdateScenario } from "./domain/use-cases/scenario/update-scenario";
import { getMongoDB } from "./data/mongodb";

(async function () {
  const project = (await getMongoDB()).collection("project");
  const symbol = (await getMongoDB()).collection("symbol");
  const scenario = (await getMongoDB()).collection("scenario");

  const projectRepository = new ProjectRepositoryImpl(
    new MongoDBProjectDatabaseWrapper(project)
  );
  const symbolRepository = new SymbolRepositoryImpl(
    new MongoDBSymbolDatabaseWrapper(symbol)
  );
  const scenarioRepository = new ScenarioRepositoryImpl(
    new MongoDBScenarioDatabaseWrapper(scenario)
  );

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

  const scenarioRouter = ScenarioRouter(
    new GetScenario(scenarioRepository),
    new GetAllScenarios(scenarioRepository),
    new CreateScenario(scenarioRepository, projectRepository),
    new UpdateScenario(scenarioRepository, projectRepository),
    new DeleteScenario(scenarioRepository)
  );

  server.use("/api/project", projectRouter);
  server.use("/api/symbol", symbolRouter);
  server.use("/api/scenario", scenarioRouter);

  server.use(errorHandler);
  server.listen(3000, () => console.log("Server running on port 3000"));
})();
