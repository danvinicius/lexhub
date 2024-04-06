import { AuthenticateUserResponseDTO, CreateUserRequestDTO } from "@/presentation/http/dtos";
import { UserRepository } from "@/data/protocols/db";
import { CreateUser } from "@/domain/use-cases/user";
import { Encrypter, Decrypter, Hasher, HashComparer } from "@/data/protocols";

export class DbCreateUser implements CreateUser {
  private userRepository: UserRepository;
  private encrypter: Encrypter & Decrypter;
  private hasher: Hasher & HashComparer;

  constructor(
    userRepository: UserRepository,
    encrypter: Encrypter & Decrypter,
    hasher: Hasher & HashComparer
  ) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.hasher = hasher;
  }

  async execute(data: CreateUserRequestDTO): Promise<null | AuthenticateUserResponseDTO> {
    const hash = await this.hasher.hash(data.password);
    const alreadyExists = await this.userRepository.getUser({email: data.email});
    if (alreadyExists) {
      throw new Error('E-mail already registered')
    }
    const { email } = await this.userRepository.createUser({...data, password: hash});
    if (!email) {
      throw new Error('Something went wrong')
    }
    const user = await this.userRepository.getUser({email});
    if (user) {
      const { name, email, projects } = user;
      const token = await this.encrypter.encrypt(String(user.id));
      return new AuthenticateUserResponseDTO({
        name,
        email,
        token,
        projects
      });
    }
    return null;
  }
}
