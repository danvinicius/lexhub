interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize?: boolean;
  logging?: boolean;
  migrations?: any[];
  subscribers?: any[];
}

const databaseConfig: DatabaseConfig = {
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

export { databaseConfig };
