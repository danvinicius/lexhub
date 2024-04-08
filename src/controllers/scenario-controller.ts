import { Request } from "express";
import {
  NotFoundError,
  BadRequestError,
  InvalidParamError,
  MissingParamError,
} from "@/util/errors";
import { validate } from "../util/validation/validate";
import * as DTO from "@/infra/http/dtos";
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
} from "@/infra/http/response";
import {
  GetScenarioUseCase,
  GetScenarioWithLexiconsUseCase,
  GetAllScenariosUseCase,
  CreateScenarioUseCase,
  CreateManyScenariosUseCase,
  UpdateScenarioUseCase,
  DeleteScenarioUseCase,
  CreateExceptionUseCase,
  CreateContextUseCase,
  CreateRestrictionUseCase,
  CreateActorUseCase,
  CreateResourceUseCase,
  AddActorUseCase,
  AddResourceUseCase,
  CreateEpisodeUseCase,
  DeleteExceptionUseCase,
  DeleteRestrictionUseCase,
  DeleteActorUseCase,
  DeleteResourceUseCase,
  RemoveActorUseCase,
  RemoveResourceUseCase,
  DeleteEpisodeUseCase,
  DeleteGroupUseCase,
  DeleteContextUseCase,
} from "@/use-cases/scenario";
import { GetProjectUseCase } from "@/use-cases/project";

export class ScenarioController {
  constructor(
    private getScenarioUseCase: GetScenarioUseCase,
    private getScenarioWithLexiconsUseCase: GetScenarioWithLexiconsUseCase,
    private getAllScenariosUseCase: GetAllScenariosUseCase,
    private createScenarioUseCase: CreateScenarioUseCase,
    private createManyScenariosUseCase: CreateManyScenariosUseCase,
    private updateScenarioUseCase: UpdateScenarioUseCase,
    private deleteScenarioUseCase: DeleteScenarioUseCase,
    private createExceptionUseCase: CreateExceptionUseCase,
    private createContextUseCase: CreateContextUseCase,
    private createRestrictionUseCase: CreateRestrictionUseCase,
    private createActorUseCase: CreateActorUseCase,
    private createResourceUseCase: CreateResourceUseCase,
    private addActorUseCase: AddActorUseCase,
    private addResourceUseCase: AddResourceUseCase,
    private createEpisodeUseCase: CreateEpisodeUseCase,
    private deleteExceptionUseCase: DeleteExceptionUseCase,
    private deleteContextUseCase: DeleteContextUseCase,
    private deleteRestrictionUseCase: DeleteRestrictionUseCase,
    private deleteActorUseCase: DeleteActorUseCase,
    private deleteResourceUseCase: DeleteResourceUseCase,
    private removeActorUseCase: RemoveActorUseCase,
    private removeResourceUseCase: RemoveResourceUseCase,
    private deleteEpisodeUseCase: DeleteEpisodeUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase
  ) {}

  public getAllScenarios = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const scenarios = await this.getAllScenariosUseCase.execute(projectId);
      return ok(scenarios);
    } catch (error: any) {
      return serverError(error);
    }
  };

  public getScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = await this.getScenarioUseCase.execute(id);
      return ok(scenario);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error);
      }
      return serverError(error);
    }
  };
  public getScenarioWithLexicons = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = await this.getScenarioWithLexiconsUseCase.execute(
        Number(id)
      );
      return ok(scenario);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error);
      }
      return serverError(error);
    }
  };
  public createScenario = async (req: Request) => {
    try {
      const scenario = new DTO.CreateScenarioRequestDTO(req.body);
      await validate(scenario);
      const scenarioCreated = await this.createScenarioUseCase.execute(
        scenario
      );
      return created(scenarioCreated);
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };

  public createManyScenarios = async (req: Request) => {
    try {
      const data = new DTO.CreateManyScenariosRequestDTO(req.body);
      await validate(data);
      const scenariosCreated = await this.createManyScenariosUseCase.execute(
        data
      );
      return created(scenariosCreated);
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };

  public createException = async (req: Request) => {
    try {
      const exception = new DTO.CreateExceptionRequestDTO(req.body);
      await validate(exception);
      await this.createExceptionUseCase.execute(exception);
      return created({ message: "Exception created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public createContext = async (req: Request) => {
    try {
      const context = new DTO.CreateContextRequestDTO(req.body);
      await validate(context);
      await this.createContextUseCase.execute(context);
      return created({ message: "Context created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public createRestriction = async (req: Request) => {
    try {
      const restriction = new DTO.CreateRestrictionRequestDTO(req.body);
      await validate(restriction);
      await this.createRestrictionUseCase.execute(restriction);
      return created({ message: "Restriction created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public createActor = async (req: Request) => {
    try {
      const actor = new DTO.CreateActorRequestDTO(req.body);
      await validate(actor);
      await this.createActorUseCase.execute(actor);
      return created({ message: "Actor created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public createResource = async (req: Request) => {
    try {
      const resource = new DTO.CreateResourceRequestDTO(req.body);
      await validate(resource);
      await this.createResourceUseCase.execute(resource);
      return created({ message: "Resource created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public addActor = async (req: Request) => {
    try {
      const { scenarioId, actorId } = req.params;
      await this.addActorUseCase.execute({
        scenarioId: +scenarioId,
        actorId: +actorId,
      });
      return created({ message: "Actor added" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public addResource = async (req: Request) => {
    try {
      const { scenarioId, resourceId } = req.params;
      await this.addResourceUseCase.execute({
        scenarioId: +scenarioId,
        resourceId: +resourceId,
      });
      return created({ message: "Resource added" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public createEpisode = async (req: Request) => {
    try {
      const episode = new DTO.CreateEpisodeRequestDTO(req.body);
      await validate(episode);
      await this.createEpisodeUseCase.execute(episode);
      return created({ message: "Episode created" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError ||
        error instanceof BadRequestError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public deleteException = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteExceptionUseCase.execute(id);
      return ok({ message: "Exception deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteContext = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteContextUseCase.execute(id);
      return ok({ message: "Context deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteRestriction = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteRestrictionUseCase.execute(id);
      return ok({ message: "Restriction deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteActor = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteActorUseCase.execute(id);
      return ok({ message: "Actor deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteResource = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteResourceUseCase.execute(id);
      return ok({ message: "Resource deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteEpisode = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteEpisodeUseCase.execute(id);
      return ok({ message: "Episode deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public deleteGroup = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteGroupUseCase.execute(id);
      return ok({ message: "group deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
  public removeActor = async (req: Request) => {
    try {
      const { scenarioId, actorId } = req.params;
      await this.removeActorUseCase.execute({
        scenarioId: +scenarioId,
        actorId: +actorId,
      });
      return ok({ message: "Actor removed" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public removeResource = async (req: Request) => {
    try {
      const { scenarioId, resourceId } = req.params;
      await this.removeResourceUseCase.execute({
        scenarioId: +scenarioId,
        resourceId: +resourceId,
      });
      return ok({ message: "Resource removed" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public updateScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = new DTO.UpdateScenarioRequestDTO(req.body);
      await validate(scenario);
      await this.updateScenarioUseCase.execute({ id, scenario });
      return ok({ message: "Scenario updated" });
    } catch (error: any) {
      if (
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public deleteScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteScenarioUseCase.execute(id);
      return ok({ message: "Scenario deleted" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
}
