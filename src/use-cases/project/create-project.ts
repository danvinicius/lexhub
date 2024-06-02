import { CreateProjectRequestDTO } from '@/infra/http/dtos';
import { ProjectRepository, UserRepository } from '@/infra/db/protocols';
import { IProject } from '@/entities';

export class CreateProjectUseCase {
  private projectRepository: ProjectRepository;
  private userRepository: UserRepository;

  constructor(projectRepository: ProjectRepository, userRepository: UserRepository) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }

  async execute(project: CreateProjectRequestDTO, userId: number | string): Promise<IProject> {
    const user = await this.userRepository.getUser({id: userId})
    
    return await this.projectRepository.createProject({...project, user});
  }
}
