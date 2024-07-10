import { IUser } from '@/entities';
import { UserRepository } from '@/infra/db/repositories';
import { NotFoundError } from '@/util/errors';

export class GetUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(id: number): Promise<null | IUser> {
    const user = await this.userRepository.getUser({id});
    if (!user) {
      throw new NotFoundError('This user does not exist');
    }
    return user;
  }
}
