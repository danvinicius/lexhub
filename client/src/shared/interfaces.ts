export interface IScenario {
  readonly id?: number;
  title: string;
  goal: string;
  project: IProject;
}

export interface IUser {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: IUserProject[];
}

export enum IUserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
  OBSERVER = "OBSERVER",
}

export interface IUserProject {
  readonly id?: number;
  removedBy: number;
  role: IUserRole;
  user: IUser;
  project: IProject;
}

export interface IProject {
  readonly id?: number;
  name: string;
  description: string;
  scenarios?: IScenario[];
  users: IUserProject[];
}
