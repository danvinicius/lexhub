import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
} from './models'

import { UserProject } from './models/UserProject'

const databaseConfig = {
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASS || '123456',
  database: process.env.MYSQL_NAME || 'scenarios_and_lexicons',
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
};

export const AppDataSource = new DataSource({
  type: 'mysql',
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
