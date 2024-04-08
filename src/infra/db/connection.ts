import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Project,
  Symbol,
  Synonym,
  Impact,
  Exception,
  Scenario,
  Context,
  Actor,
  Restriction,
  Resource,
  Episode,
  Group,
  User,
  NonSequentialEpisode,
} from "./typeorm/entity";

import { databaseConfig } from "../../config/database";
import { UserProject } from "./typeorm/entity/UserProject";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: databaseConfig.synchronize,
  logging: databaseConfig.logging,
  entities: [
    Project,
    Symbol,
    Synonym,
    Impact,
    Exception,
    Scenario,
    Actor,
    Context,
    Restriction,
    Resource,
    Episode,
    Group,
    NonSequentialEpisode,
    User,
    UserProject,
  ],
  migrations: databaseConfig.migrations,
  subscribers: databaseConfig.subscribers,
});
