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
      const scenarios = await scenarioService.getAllScenarios(projectId);
      return ok(scenarios);
    } catch (error: any) {
      return serverError(error.message);
    }
  };

  public getScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = await scenarioService.getScenario(id);
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
        projectId: req.params.projectId,
      });
      await validate(scenario);
      const scenarioCreated = await scenarioService.createScenario(scenario, req.userId);
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
        projectId: req.params.projectId,
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
  public updateScenario = async (req: Request) => {
    try {
      const { id } = req.params;
      const scenario = new DTO.UpdateScenarioRequestDTO(req.body);
      await validate(scenario);
      await scenarioService.updateScenario(id, scenario, req.userId);
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
      await scenarioService.deleteScenario(id, req.userId);
      return ok({ message: 'Scenario deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
}
