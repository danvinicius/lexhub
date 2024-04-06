import { UserRepository } from "@/data/protocols/db";
import { AuthenticateUser } from "@/domain/use-cases/user";
import { Decrypter, Encrypter, HashComparer, Hasher } from "@/data/protocols";
import { AuthenticateUserRequestDTO, AuthenticateUserResponseDTO } from "@/presentation/http/dtos";

export class DbAuthenticateUser implements AuthenticateUser {
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
    if (user) {
      const isPasswordCorrect = await this.hasher.compare(
        password,
        user.password
      );
      if (isPasswordCorrect) {
        const token = await this.encrypter.encrypt(String(user.id));
        return new AuthenticateUserResponseDTO({
          name: user.name,
          email: user.email,
          token,
          projects: user.projects
        });
      }
      throw new Error('Incorrect password')
    }
    throw new Error('User doesn\'t exist')
  }
}
