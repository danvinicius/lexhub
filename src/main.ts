import server from "./server";
import ProjectRouter from "./presentation/routers/project-router";
import { GetProject } from "./domain/use-cases/project/get-project";
import { GetAllProjects } from "./domain/use-cases/project/get-all-projects";
import { CreateProject } from "./domain/use-cases/project/create-project";
import { ProjectRepositoryImpl } from "./domain/repositories/project-repository";
import { UpdateProject } from "./domain/use-cases/project/update-project";
import { DeleteProject } from "./domain/use-cases/project/delete-project";
import { MongoDBProjectDatabaseWrapper } from "./data/wrapper/mongodb/mongodb-project-database-wrapper";
import { getMongoDB } from "./data/mongodb";

(async function () {
  const project = (await getMongoDB()).collection('project');

  const projectRepository = new ProjectRepositoryImpl(new MongoDBProjectDatabaseWrapper(project));

  const projectMiddleware = ProjectRouter(
    new GetProject(projectRepository),
    new GetAllProjects(projectRepository),
    new CreateProject(projectRepository),
    new UpdateProject(projectRepository),
    new DeleteProject(projectRepository)
  );

  server.use("/api/project", projectMiddleware);
  server.listen(3000, () => console.log("Server running on port 3000"));
})();
