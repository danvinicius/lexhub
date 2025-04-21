import { ISynonym, IImpact, ISymbol } from '@/models';
import Project from '@/models/Project';
import Symbol from '@/models/Symbol';
import { ServerError } from '@/utils/errors';

export namespace SymbolRepository {
  export interface CreateSymbolParams {
    name: string;
    classification: string;
    notion: string;
    synonyms: ISynonym[];
    impacts: IImpact[];
    projectId: String;
  }

  export interface UpdateSymbolParams {
    name: string;
    classification: string;
    notion: string;
  }
}

export class SymbolRepository {
  async getSymbol(id: String): Promise<ISymbol | null> {
    try {
      const symbol = await Symbol.findOne({ _id: id }).exec();
      if (!symbol) return null;
      return symbol?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getAllSymbols(projectId: String): Promise<ISymbol[]> {
    try {
      const symbols = await Symbol.find({
        project: projectId,
      }).exec();
      return symbols.map((symbol) => symbol.toJSON());
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createSymbol(
    data: SymbolRepository.CreateSymbolParams
  ): Promise<ISymbol | null> {
    try {
      const project = await Project.findById(data.projectId);
      if (!project) throw new ServerError('Projeto não encontrado');

      const symbol = new Symbol({
        name: data.name,
        classification: data.classification,
        notion: data.notion,
        impacts: data.impacts,
        synonyms: data.synonyms,
        project: project._id,
      });

      await symbol.save();

      await Project.findByIdAndUpdate(
        project.id,
        {
          $push: {
            symbols: symbol,
          },
        },
        { new: true }
      );

      const createdSymbol = await this.getSymbol(symbol.id);
      if (!createdSymbol) return null;
      return createdSymbol;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async updateSymbol(
    id: String,
    data: SymbolRepository.UpdateSymbolParams
  ): Promise<ISymbol | null> {
    try {
      await Symbol.findByIdAndUpdate(id, data);
      const updatedSymbol = await this.getSymbol(id);
      if (!updatedSymbol) return null;
      return updatedSymbol;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteSymbol(id: String): Promise<void> {
    try {
      await Symbol.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}
