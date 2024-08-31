import { Request } from 'express';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { validate } from '@/utils/validation/validate';
import * as DTO from '@/infra/http/dtos';
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
} from '@/infra/http/response';
import { SymbolService } from '@/services';
import { BadRequestError } from '@/utils/errors';

const symbolService = new SymbolService();

export class SymbolController {
  public getAllSymbols = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const symbols = await symbolService.getAllSymbols(+projectId);
      return ok(symbols);
    } catch (error: any) {
      return serverError(error.message);
    }
  };

  public getSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      const symbol = await symbolService.getSymbol(+id);
      return ok(symbol);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error.message);
      }
      return serverError(error.message);
    }
  };
  public createSymbol = async (req: Request) => {
    try {
      const symbol = new DTO.CreateSymbolRequestDTO({
        ...req.body,
        projectId: Number(req.params.projectId),
      });
      await validate(symbol);
      const symbolCreated = await symbolService.createSymbol(symbol);
      return created(symbolCreated);
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createImpact = async (req: Request) => {
    try {
      const impact = new DTO.CreateImpactRequestDTO({
        ...req.body,
        symbolId: Number(req.params.symbolId),
      });
      await validate(impact);
      await symbolService.createImpact(impact);
      return created({ message: 'Impact created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public createSynonym = async (req: Request) => {
    try {
      const synonym = new DTO.CreateSynonymRequestDTO({
        ...req.body,
        symbolId: Number(req.params.symbolId),
      });
      await validate(synonym);
      await symbolService.createSynonym(synonym);
      return created({ message: 'Synonym created' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public updateSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      const symbol = new DTO.UpdateSymbolRequestDTO(req.body);
      await validate(symbol);
      await symbolService.updateSymbol(+id, symbol);
      return ok({ message: 'Symbol updated' });
    } catch (error: any) {
      if (
        error instanceof BadRequestError
      ) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public deleteSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      await symbolService.deleteSymbol(+id);
      return ok({ message: 'Symbol deleted' });
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return badRequest(error.message);
      }
      return serverError(error.message);
    }
  };
  public deleteImpact = async (req: Request) => {
    try {
      const { impactId } = req.params;
      await symbolService.deleteImpact(+impactId);
      return ok({ message: 'Impact deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };

  public deleteSynonym = async (req: Request) => {
    try {
      const { synonymId } = req.params;
      await symbolService.deleteSynonym(+synonymId);
      return ok({ message: 'Synonym deleted' });
    } catch (error: any) {
      return serverError(error.message);
    }
  };
}
