import { IProject } from './Project';
import { model, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  COLLABORATOR = 'COLLABORATOR',
  OBSERVER = 'OBSERVER',
}

export interface IUserProject {
  role: UserRole;
  user: IUser;
  project: IProject;
}

export interface IUser {
  readonly id?: string;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  projects?: IUserProject[];
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    projects: [
      {
        role: {
          type: String,
          enum: UserRole,
          default: UserRole.OBSERVER
        },
        project: {
          type: Schema.Types.ObjectId,
          ref: 'Project',
          required: true,
        },
      },
    ],
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        if (ret.projects) {
          ret.projects.forEach((project: any) => {
            delete project._id;
          });
        }
      },
    },
    timestamps: true,
  }
);

export default model('User', userSchema);
