import { IProject } from './Project';
import { IUser } from './User';
import { model, Schema } from 'mongoose';

export type DifferenceKind = 'N' | 'D' | 'E' | 'A';

export interface IDifference {
    kind: DifferenceKind;
    path: string[];
    lhs?: any;
    rhs?: any;
    index?: number;
    item?: IDifference;
}

export interface IChange {
  readonly id?: string;
  differences: IDifference[];
  responsible: IUser;
  entityName: string;
  project: IProject;
}

const changeSchema = new Schema<IChange>(
  {
    differences: {
        type: [] as IDifference[],
        required: true,
    },
    entityName: {
      type: String,
      required: true,
    },
    responsible: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        if (ret.users) {
          ret.users.forEach((user: any) => {
            delete user._id;
          });
        }
      },
    },
    timestamps: true,
  }
);


export default model('Change', changeSchema)