import { UserRepository } from '@/protocols';
import { UserController } from '@/controllers';
import { AuthenticateUserUseCase, CreateUserUseCase } from '@/use-cases/user';
import { BcryptAdapter, JwtAdapter } from '@/infra/security';

export class UserControllerFactory {
  static makeUserController(userRepository: UserRepository) {
    const bcryptAdapter = new BcryptAdapter(10);
    const jwtAdapter = new JwtAdapter('secret');
    return new UserController(
      new AuthenticateUserUseCase(userRepository, jwtAdapter, bcryptAdapter),
      new CreateUserUseCase(userRepository, jwtAdapter, bcryptAdapter)
    );
  }
}
