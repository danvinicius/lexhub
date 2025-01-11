import { ServerError } from '@/utils/errors';
import Change, { IDifference, IChange } from '@/models/Change';
import { Logger } from '@/utils/logger/logger';

export namespace ChangeRepository {
  export interface CreateChangeParams {
    differences: IDifference[];
    userId: String;
    entityName: string;
    projectId: String;
  }
}

export class ChangeRepository {
  async getChange(id: String): Promise<null | IChange> {
    try {
      const change = await Change.findById(id)
      .populate('project')  
      .populate({
          path: 'responsible',
          select: 'name',
        });

      if (!change) return null;
      return change?.toJSON();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getChangesByProject(projectId: String): Promise<IChange[]> {
    try {
      const changes = await Change.find({
        'project': projectId,
      })
      .populate('project')
      .populate({
        path: 'responsible',
        select: 'name',
      })
      .sort({ createdAt: -1 });
        
      return changes.map(change => change.toJSON());
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }


  async getChangesByUserProjects(projectsIds: (string | undefined)[]): Promise<IChange[]> {
    try {
      const changes = await Change.find({
        'project': { $in: projectsIds },
      })
      .populate({
        path: 'project',
        select: 'name',
      })
      .populate({
        path: 'responsible',
        select: 'name',
      })
      .sort({ createdAt: -1 });
      
      return changes.map(change => change.toJSON());
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }

  async createChange(
    data: ChangeRepository.CreateChangeParams
  ): Promise<IChange> {
    
    try {
      const change = new Change({
        differences: data.differences,
        responsible: data.userId,
        entityName: data.entityName,
        project: data.projectId,
      });

      await change.save();

      return change.toJSON();
    } catch (error: any) {
      Logger.error(error);
      throw new ServerError(error.message);
    }
  }
}
