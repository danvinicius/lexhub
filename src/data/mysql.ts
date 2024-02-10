import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./repositories/mysql/entity/Project"
import { Symbol } from "./repositories/mysql/entity/Symbol"
import { Synonym } from "./repositories/mysql/entity/Synonym"
import { Impact } from "./repositories/mysql/entity/Impact"
import { Exception } from "./repositories/mysql/entity/Exception"
import { Scenario } from "./repositories/mysql/entity/Scenario"
import { Context } from "./repositories/mysql/entity/Context"
import { Actor } from "./repositories/mysql/entity/Actor"
import { Restriction } from "./repositories/mysql/entity/Restriction"
import { Resource } from "./repositories/mysql/entity/Resource"
import { Episode } from "./repositories/mysql/entity/Episode"
import { Group } from "./repositories/mysql/entity/Group"
import { NonSequentialEpisode } from "./repositories/mysql/entity/NonSequentialEpisode"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Project, Symbol, Synonym, Impact, Exception, Scenario, Actor, Context, Restriction, Resource, Episode, Group, NonSequentialEpisode],
    migrations: [],
    subscribers: [],
})
