import { CreateImpactRequestDTO } from "@/infra/http/dtos";
import { SymbolRepository } from "@/protocols/db";
import { InvalidParamError } from "@/util/errors";

export class CreateImpactUseCase {
  private symbolRepository: SymbolRepository;
  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(impact: CreateImpactRequestDTO): Promise<void> {
    const symbolExists = await this.symbolRepository.getSymbol(impact.symbolId);
    if (!symbolExists) {
      throw new InvalidParamError("scenarioId");
    }
    return await this.symbolRepository.createImpact(impact);
  }
}
