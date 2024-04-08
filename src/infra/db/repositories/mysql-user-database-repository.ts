import { CreateUserRequestDTO } from "@/infra/http/dtos";
import { UserRepository } from "@/protocols/db";
import { User } from "@/infra/db/typeorm/entity/User";
import { DataSource } from "typeorm";
import { ServerError } from "@/util/errors";

export class MySQLUserRepository implements UserRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getUser(query: any): Promise<null | User> {
    try {
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
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async createUser(data: CreateUserRequestDTO): Promise<User> {
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = data.password;
      await this.dataSource.manager.save(User, { ...user, validated: false });
      return user;
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await this.dataSource.manager.softDelete(User, id);
    } catch (error: any) {
      throw new ServerError(error?.message);
    }
  }
}
