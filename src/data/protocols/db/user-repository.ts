import { AuthenticateUserRequestDTO, AuthenticateUserResponseDTO, CreateUserRequestDTO } from "@/presentation/http/dtos";
import { IUser } from "@/domain/entities";

export interface UserRepository {
  getUser(query: any): Promise<null | IUser>;
  createUser(data: CreateUserRequestDTO): Promise<IUser>;
  deleteUser(id: number | string): Promise<void>;
}
