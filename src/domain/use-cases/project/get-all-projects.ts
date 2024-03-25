import { IProject } from '@/domain/entities';
import { UseCase } from '@/domain/use-cases/base-use-case'

export interface GetAllProjects extends UseCase<void, IProject[]> {}