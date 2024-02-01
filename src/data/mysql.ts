import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./repositories/mysql/entity/Project"
import { Symbol } from "./repositories/mysql/entity/Symbol"
import { Synonym } from "./repositories/mysql/entity/Synonym"
import { Impact } from "./repositories/mysql/entity/Impact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Project, Symbol, Synonym, Impact],
    migrations: [],
    subscribers: [],
})
