import { CreateSynonymRequestDTO } from "@/infra/http/dtos";
import { SymbolRepository } from "@/protocols/db";
import { InvalidParamError } from "@/util/errors";

export class CreateSynonymUseCase {
  private symbolRepository: SymbolRepository;
  constructor(symbolRepository: SymbolRepository) {
    this.symbolRepository = symbolRepository;
  }
  async execute(synonym: CreateSynonymRequestDTO): Promise<void> {
    const symbolExists = await this.symbolRepository.getSymbol(
      synonym.symbolId
    );
    if (!symbolExists) {
      throw new InvalidParamError("scenarioId");
    }
    return await this.symbolRepository.createSynonym(synonym);
  }
}
