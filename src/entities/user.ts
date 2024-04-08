import { IProject } from './project';

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
  OBSERVER = 'OBSERVER',
}

export interface IUser {
  readonly id?: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: IUserProject[];
}

export interface IUserProject {
  readonly id?: number;
  invitedBy: number | string;
  removedBy: number | string;
  role: UserRole;
  user: IUser;
  project: IProject;
  acceptedAt: Date;
}
