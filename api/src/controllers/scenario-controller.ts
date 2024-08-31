import { Request } from 'express';
import {
  NotFoundError,
  BadRequestError,
} from '@/utils/errors';
import { validate } from '../utils/validation/validate';
import * as DTO from '@/infra/http/dtos';
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
} from '@/infra/http/response';
import { ScenarioService } from '@/services';

const scenarioService = new ScenarioService();

export class ScenarioController {
  public getAllScenarios = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const scenarios = await scenarioService.getAllScenarios(+projectId);
      return ok(scenarios);
    } catch (error: any) {
      return serverError(error.message);
    }
  };

  public getScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = await scenarioService.getScenario(+id);
      return ok(scenario);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error.message);
      }
      return serverError(error.message);
    }
  };
  public getScenarioWithLexicons = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = await scenarioService.getScenarioWithLexicon(+id);
      return ok(scenario);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error.message);
      }
      return serverError(error.message);
    }
  };
  public createScenario = async (req: Request) => {
    try {
      const scenario = new DTO.CreateScenarioRequestDTO({
        ...req.body,
        projectId: Number(req.params.projectId),
      });
      await validate(scenario);
      const scenarioCreated = await scenarioService.createScenario(scenario);
      return created(scenarioCreated);
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };

  public createManyScenarios = async (req: Request) => {
    try {
      const data = new DTO.CreateManyScenariosRequestDTO({
        ...req.body,
        projectId: Number(req.params.projectId),
      });
      await validate(data);
      const scenariosCreated = await scenarioService.createManyScenarios(data);
      return created(scenariosCreated);
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };

  public createException = async (req: Request) => {
    try {
      const exception = new DTO.CreateExceptionRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(exception);
      await scenarioService.createException(exception);
      return created({ message: 'Exception created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createContext = async (req: Request) => {
    try {
      const context = new DTO.CreateContextRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(context);
      await scenarioService.createContext(context);
      return created({ message: 'Context created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createRestriction = async (req: Request) => {
    try {
      const restriction = new DTO.CreateRestrictionRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(restriction);
      await scenarioService.createRestriction(restriction);
      return created({ message: 'Restriction created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createActor = async (req: Request) => {
    try {
      const actor = new DTO.CreateActorRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(actor);
      await scenarioService.createActor(actor);
      return created({ message: 'Actor created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createResource = async (req: Request) => {
    try {
      const resource = new DTO.CreateResourceRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(resource);
      await scenarioService.createResource(resource);
      return created({ message: 'Resource created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public addActor = async (req: Request) => {
    try {
      const { scenarioId, actorId } = req.params;
      await scenarioService.addActor({
        scenarioId: +scenarioId,
        actorId: +actorId,
      });
      return created({ message: 'Actor added' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public addResource = async (req: Request) => {
    try {
      const { scenarioId, resourceId } = req.params;
      await scenarioService.addResource({
        scenarioId: +scenarioId,
        resourceId: +resourceId,
      });
      return created({ message: 'Resource added' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createEpisode = async (req: Request) => {
    try {
      const episode = new DTO.CreateEpisodeRequestDTO({
        ...req.body,
        scenarioId: Number(req.params.scenarioId),
      });
      await validate(episode);
      await scenarioService.createEpisode(episode);
      return created({ message: 'Episode created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError ||
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public deleteException = async (req: Request) => {
    try {
      const { exceptionId } = req.params;
      await scenarioService.deleteException(+exceptionId);
      return ok({ message: 'Exception deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteContext = async (req: Request) => {
    try {
      const { contextId } = req.params;
      await scenarioService.deleteContext(+contextId);
      return ok({ message: 'Context deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteRestriction = async (req: Request) => {
    try {
      const { restrictionId } = req.params;
      await scenarioService.deleteRestriction(+restrictionId);
      return ok({ message: 'Restriction deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteActor = async (req: Request) => {
    try {
      const { actorId } = req.params;
      await scenarioService.deleteActor(+actorId);
      return ok({ message: 'Actor deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteResource = async (req: Request) => {
    try {
      const { resourceId } = req.params;
      await scenarioService.deleteResource(+resourceId);
      return ok({ message: 'Resource deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteEpisode = async (req: Request) => {
    try {
      const { episodeId } = req.params;
      await scenarioService.deleteEpisode(+episodeId);
      return ok({ message: 'Episode deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public deleteGroup = async (req: Request) => {
    try {
      const { groupId } = req.params;
      await scenarioService.deleteGroup(+groupId);
      return ok({ message: 'group deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
  public removeActor = async (req: Request) => {
    try {
      const { scenarioId, actorId } = req.params;
      await scenarioService.removeActor({
        scenarioId: +scenarioId,
        actorId: +actorId,
      });
      return ok({ message: 'Actor removed' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public removeResource = async (req: Request) => {
    try {
      const { scenarioId, resourceId } = req.params;
      await scenarioService.removeResource({
        scenarioId: +scenarioId,
        resourceId: +resourceId,
      });
      return ok({ message: 'Resource removed' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public updateScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = new DTO.UpdateScenarioRequestDTO(req.body);
      await validate(scenario);
      await scenarioService.updateScenario(+id, scenario);
      return ok({ message: 'Scenario updated' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public deleteScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      await scenarioService.deleteScenario(+id);
      return ok({ message: 'Scenario deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
}
