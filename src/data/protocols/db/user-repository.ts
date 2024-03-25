import { CreateUserRequestDTO } from "@/presentation/http/dtos";
import { IUser } from "@/domain/entities";

export interface UserRepository {
  getUser(id: number | string): Promise<null | IUser>;
  createUser(User: CreateUserRequestDTO): Promise<IUser>;
  deleteUser(id: number | string): Promise<void>;
}
