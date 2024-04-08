import express, { Response, Request, NextFunction } from "express";
import { NotFoundError } from "@/util/errors/not-found-error";
import { validate } from "@/util/validation/validate";
import * as DTO from "@/infra/http/dtos";
import {
  CreateImpactUseCase,
  CreateSymbolUseCase,
  CreateSynonymUseCase,
  DeleteImpactUseCase,
  DeleteSymbolUseCase,
  DeleteSynonymUseCase,
  GetAllSymbolsUseCase,
  GetSymbolUseCase,
  UpdateSymbolUseCase,
} from "@/use-cases/symbol";
import {
  badRequest,
  created,
  notFound,
  ok,
  serverError,
} from "@/infra/http/response";
import { InvalidParamError, MissingParamError } from "@/util/errors";

export class SymbolController {
  constructor(
    private getSymbolUseCase: GetSymbolUseCase,
    private getAllSymbolsUseCase: GetAllSymbolsUseCase,
    private createSymbolUseCase: CreateSymbolUseCase,
    private updateSymbolUseCase: UpdateSymbolUseCase,
    private deleteSymbolUseCase: DeleteSymbolUseCase,
    private createImpactUseCase: CreateImpactUseCase,
    private createSynonymUseCase: CreateSynonymUseCase,
    private deleteImpactUseCase: DeleteImpactUseCase,
    private deleteSynonymUseCase: DeleteSynonymUseCase
  ) {}

  public getAllSymbols = async (req: Request) => {
    try {
      const { projectId } = req.params;
      const symbols = await this.getAllSymbolsUseCase.execute(projectId);
      return ok(symbols);
    } catch (error: any) {
      return serverError(error);
    }
  };

  public getSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      const symbol = await this.getSymbolUseCase.execute(id);
      return ok(symbol);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return notFound(error);
      }
      return serverError(error);
    }
  };
  public createSymbol = async (req: Request) => {
    try {
      const symbol = new DTO.CreateSymbolRequestDTO(req.body);
      await validate(symbol);
      const symbolCreated = await this.createSymbolUseCase.execute(symbol);
      return created(symbolCreated);
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
  public createImpact = async (req: Request) => {
    try {
      const impact = new DTO.CreateImpactRequestDTO(req.body);
      await validate(impact);
      await this.createImpactUseCase.execute(impact);
      return created({ message: "Impact created" });
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
  public createSynonym = async (req: Request) => {
    try {
      const synonym = new DTO.CreateSynonymRequestDTO(req.body);
      await validate(synonym);
      await this.createSynonymUseCase.execute(synonym);
      return created({ message: "Synonym created" });
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
  public updateSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      const symbol = new DTO.UpdateSymbolRequestDTO(req.body);
      await validate(symbol);
      await this.updateSymbolUseCase.execute({ id, symbol });
      return ok({ message: "Symbol updated" });
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
  public deleteSymbol = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteSymbolUseCase.execute(id);
      return ok({ message: "Symbol deleted" });
    } catch (error: any) {
      if (error instanceof InvalidParamError) {
        return badRequest(error);
      }
      return serverError(error);
    }
  };
  public deleteImpact = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteImpactUseCase.execute(id);
      return ok({ message: "Impact deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };

  public deleteSynonym = async (req: Request) => {
    try {
      const { id } = req.params;
      await this.deleteSynonymUseCase.execute(id);
      return ok({ message: "Synonym deleted" });
    } catch (error: any) {
      return serverError(error);
    }
  };
}
