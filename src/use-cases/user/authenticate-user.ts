import { UserRepository } from '@/protocols/db';
import { Decrypter, Encrypter, HashComparer, Hasher } from '@/protocols';
import {
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
} from '@/infra/http/dtos';
import {
  AccessDeniedError,
  InvalidParamError,
  UnauthorizedError,
} from '@/util/errors';

export class AuthenticateUserUseCase {
  private userRepository: UserRepository;
  private encrypter: Encrypter & Decrypter;
  hasher: Hasher & HashComparer;

  constructor(
    userRepository: UserRepository,
    encrypter: Encrypter & Decrypter,
    hasher: Hasher & HashComparer
  ) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.hasher = hasher;
  }

  async execute(
    data: AuthenticateUserRequestDTO
  ): Promise<null | AuthenticateUserResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.getUser({ email });
    if (!user) {
      throw new InvalidParamError('email');
    }
    const isPasswordCorrect = await this.hasher.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Invalid password');
    }
    const token = await this.encrypter.encrypt(String(user.id));
    return new AuthenticateUserResponseDTO({
      name: user.name,
      email: user.email,
      token,
      projects: user.projects,
    });
  }
}
