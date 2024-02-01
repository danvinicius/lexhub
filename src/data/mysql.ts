import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./repositories/mysql/entity/Project"
import { Symbol } from "./repositories/mysql/entity/Symbol"
import { Synonym } from "./repositories/mysql/entity/Synonym"
import { Impact } from "./repositories/mysql/entity/Impact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cenarios_e_lexicos",
    synchronize: true,
    logging: false,
    entities: [Project, Symbol, Synonym, Impact],
    migrations: [],
    subscribers: [],
})
