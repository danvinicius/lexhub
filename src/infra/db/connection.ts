import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { databaseConfig } from './config';
import {
  Project,
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
  Symbol,
} from '@/models';

const appDataSource = new DataSource({
  type: databaseConfig.type,
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

export const initializeDataSource = async () => {
  if (!appDataSource.isInitialized) {
    await appDataSource.initialize();
  }
  return appDataSource;
};

export default appDataSource;
