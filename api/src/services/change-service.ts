import { ChangeRepository } from '@/repositories/change-repository';
import { NotFoundError } from '@/utils/errors';
import diff from 'deep-diff';
import { ProjectService } from './project-service';
import { IDifference } from '@/models/Change';

const changeRepository = new ChangeRepository();

export class ChangeService {

  public async getChange(id: String) {
    const change = await changeRepository.getChange(id);

    if (!change) {
      throw new NotFoundError('This change does not exist');
    }

    return change;
  }

  public async createChange(oldObj: object, newObj: object, projectId: String, entityName: string, userId: String) {
    let differences = this.getDifference(oldObj, newObj);
    differences = differences.filter(difference => !difference.path.includes('updatedAt'));
    const change = await changeRepository.createChange({
      differences,
      projectId,
      entityName,
      userId,
    })
    return change;
  }

  private getDifference(oldObj: object, newObj: object): IDifference[] {
    return diff(oldObj, newObj);
  }

  public async getChangesByProject(projectId: String) {
    const changes = await changeRepository.getChangesByProject(projectId);
    return changes;
  }

  public async getChangesByUserProjects(userId: String) {
    const projectService = new ProjectService();
    const userProjects = await projectService.getAllProjects(userId);
    const userProjectsIds = userProjects.map(userProject => userProject.id);
    const allChanges = await changeRepository.getChangesByUserProjects(userProjectsIds);
    return allChanges;
  }
}
