import {
  CreateUserRequestDTO,
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
} from "@/presentation/http/dtos";
import { UserRepository } from "@/data/protocols/db";
import { User } from "@/infra/db/mysql/typeorm/entity/User";
import { DataSource } from "typeorm";

export class MySQLUserRepository implements UserRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getUser(query: any): Promise<null | User> {
    const [user] = await this.dataSource.manager.find(User, {
      where: query,
      select: {
        id: true,
        name: true,
        email: true,
        projects: true,
        password: true,
      },
      relations: {
        projects: true,
      },
    });
    delete user?.deletedAt;
    return user;
  }
  async createUser(data: CreateUserRequestDTO): Promise<User> {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    await this.dataSource.manager.save(User, { ...user, validated: false });
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    await this.dataSource.manager.softDelete(User, id);
  }
}
