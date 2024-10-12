import Symbol, { ISynonym, IImpact, ISymbol } from "@/models/Symbol";
import Project from "@/models/Project";
import { ServerError } from "@/utils/errors";

export namespace SymbolRepository {
  export interface CreateSymbolParams {
    name: string;
    classification: string;
    notion: string;
    synonyms: ISynonym[];
    impacts: IImpact[];
    projectId: string;
  }

  export interface UpdateSymbolParams {
    name: string;
    classification: string;
    notion: string;
  }
}

export class SymbolRepository {
  async getSymbol(id: string): Promise<ISymbol | null> {
    try {
      const symbol = await Symbol.findById(id)
        .populate('synonyms')
        .populate('impacts')
        .populate({
          path: 'project',
          select: '_id'
        })
        .exec();
      return symbol?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getAllSymbols(projectId: string): Promise<ISymbol[]> {
    try {
      const symbols = await Symbol.find({ project: projectId })
        .populate('synonyms')
        .populate('impacts')
        .populate('project')
        .exec();
      return symbols.map(symbol => symbol.toJSON());
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async createSymbol(data: SymbolRepository.CreateSymbolParams): Promise<ISymbol> {
    try {
      const project = await Project.findById(data.projectId);
      if (!project) throw new ServerError('Project not found');

      const symbol = new Symbol({
        name: data.name,
        classification: data.classification,
        notion: data.notion,
        project: project._id,
        impacts: data.impacts,
        synonyms: data.synonyms,
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

      return await this.getSymbol(symbol.id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async updateSymbol(id: string, data: SymbolRepository.UpdateSymbolParams): Promise<ISymbol> {
    try {
      await Symbol.findByIdAndUpdate(id, data);
      return await this.getSymbol(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async deleteSymbol(id: string): Promise<void> {
    try {
      await Symbol.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}