import { ChangeRepository } from '@/repositories/change-repository';
import diff from 'deep-diff';
import { ProjectService } from './project-service';
import { IDifference } from '@/models/Change';

const changeRepository = new ChangeRepository();

export class ChangeService {

  public async createChange(oldObj: object | null, newObj: object | null, projectId: String, entityName: string, userId: String) {
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

  private getDifference(oldObj: object | null, newObj: object | null): IDifference[] {
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
    const filteredUserProjectsIds = userProjectsIds.filter(id => id !== null && id !== undefined);
    const allChanges = await changeRepository.getChangesByUserProjects(filteredUserProjectsIds);
    return allChanges;
  }
}
