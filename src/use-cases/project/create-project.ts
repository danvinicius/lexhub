import { CreateProjectRequestDTO } from '@/infra/http/dtos';
import { ProjectRepository, UserRepository } from '@/infra/db/repositories';
import { IProject } from '@/entities';

export class CreateProjectUseCase {
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository;

  constructor(projectRepository: ProjectRepository, userRepository: UserRepository) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }

  async execute(project: CreateProjectRequestDTO, userId: number): Promise<IProject> {
    const user = await this.userRepository.getUser({id: userId})
    
    return await this.projectRepository.createProject({...project, user});
  }
}
