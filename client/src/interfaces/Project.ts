export interface IScenario {
  readonly id?: number;
  title: string;
  goal: string;
  project: Project;
}

export interface User {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: UserProject[];
}

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
  OBSERVER = "OBSERVER",
}

export interface UserProject {
  readonly id?: number;
  removedBy: number;
  role: UserRole;
  user: User;
  project: Project;
}

export interface Project {
  readonly id?: number;
  name: string;
  description: string;
  scenarios?: IScenario[];
  users: UserProject[];
}
