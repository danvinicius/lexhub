import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne, ManyToOne } from "typeorm";
import { IActor, IContext, IEpisode, IException, IGroup, IResource, IScenario } from "../../../../domain/entities/scenario";
import { Exception } from "./Exception";
import { Actor } from "./Actor";
import { Context } from "./Context";
import { Project } from "./Project";
import { Resource } from "./Resource";
import { Episode } from "./Episode";
import { IProject } from "../../../../domain/entities/project";
import { Group } from "./Group";

@Entity()
export class Scenario implements IScenario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    objective: string;

    @Column()
    goal: string;

    @OneToMany(() => Exception, (exception) => exception.scenario)
    exceptions: IException[];

    @ManyToMany(() => Actor)
    @JoinTable()
    actors: IActor[];

    @ManyToMany(() => Resource)
    @JoinTable()
    resources: IResource[];

    @OneToOne(() => Context, (context) => context.scenario)
    context: IContext;

    @OneToMany(() => Episode, (episode) => episode.scenario)
    episodes: IEpisode[];

    @OneToMany(() => Group, group => group.scenario)
    groups: IGroup[];

    @ManyToOne(() => Project, (project) => project.scenarios)
    project: IProject;
}
