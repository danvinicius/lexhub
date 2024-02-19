interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize?: boolean
    logging?: boolean
    migrations?: any[]
    subscribers?: any[]
}

const databaseConfig: DatabaseConfig = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'cenarios_e_lexicos',
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: []
};

export { databaseConfig };