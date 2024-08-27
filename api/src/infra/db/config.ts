type SQLDatabaseType = 'postgres' | 'mysql'

interface DatabaseConfig {
  type: SQLDatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  migrations: any[];
  subscribers: any[];
}

export const databaseConfig: DatabaseConfig = {
  type: process.env.DB_TYPE as SQLDatabaseType || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'scenarios_and_lexicons',
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
};
