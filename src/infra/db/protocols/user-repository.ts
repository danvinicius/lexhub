import { IUser } from '@/entities';

export interface UserRepository {
  getUser(query: any): Promise<null | IUser>;
  createUser(data: UserRepository.CreateUserParams): Promise<IUser>;
  deleteUser(id: number | string): Promise<void>;
}

export namespace UserRepository {
  export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }
}
