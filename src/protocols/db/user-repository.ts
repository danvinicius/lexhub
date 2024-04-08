import {
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
  CreateUserRequestDTO,
} from '@/infra/http/dtos';
import { IUser } from '@/entities';

export interface UserRepository {
  getUser(query: any): Promise<null | IUser>;
  createUser(data: CreateUserRequestDTO): Promise<IUser>;
  deleteUser(id: number | string): Promise<void>;
}
