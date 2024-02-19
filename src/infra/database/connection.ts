import "reflect-metadata"
import { DataSource } from "typeorm"
import { Project } from "./mysql/typeorm/entity/Project"
import { Symbol } from "./mysql/typeorm/entity/Symbol"
import { Synonym } from "./mysql/typeorm/entity/Synonym"
import { Impact } from "./mysql/typeorm/entity/Impact"
import { Exception } from "./mysql/typeorm/entity/Exception"
import { Scenario } from "./mysql/typeorm/entity/Scenario"
import { Context } from "./mysql/typeorm/entity/Context"
import { Actor } from "./mysql/typeorm/entity/Actor"
import { Restriction } from "./mysql/typeorm/entity/Restriction"
import { Resource } from "./mysql/typeorm/entity/Resource"
import { Episode } from "./mysql/typeorm/entity/Episode"
import { Group } from "./mysql/typeorm/entity/Group"
import { NonSequentialEpisode } from "./mysql/typeorm/entity/NonSequentialEpisode"
import { databaseConfig } from '../../config/database' 

export const AppDataSource = new DataSource({
    type: "mysql",
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    synchronize: databaseConfig.synchronize,
    logging: databaseConfig.logging,
    entities: [Project, Symbol, Synonym, Impact, Exception, Scenario, Actor, Context, Restriction, Resource, Episode, Group, NonSequentialEpisode],
    migrations: databaseConfig.migrations,
    subscribers: databaseConfig.subscribers,
})
