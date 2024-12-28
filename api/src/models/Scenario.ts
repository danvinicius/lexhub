import { IProject } from './Project';
import { model, Schema } from 'mongoose';

export interface IException {
  description: string;
}

export interface IRestriction {
  description: string;
}

export interface IActor {
  name: string;
}

export interface IContext {
  geographicLocation: string;
  temporalLocation: string;
  preCondition: string;
  restrictions?: IRestriction[];
}

export interface IEpisode {
  readonly id?: string;
  position: number;
  description?: string;
  type?: string;
  restriction?: string;
  nonSequentialEpisodes?: {
      id: string;
      type: string;
      description: string;
      restriction: string;
  }[];
}

export interface IResource {
  readonly id?: string;
  name: string;
  restrictions?: IRestriction[];
  scenarios: IScenario[];
}

export interface IScenario {
  readonly id?: string;
  title: string;
  goal: string;
  exceptions?: IException[];
  resources?: IResource[];
  actors?: IActor[];
  context?: IContext;
  episodes?: IEpisode[];
  project: IProject;
  deletedAt: Date;
}

const scenarioSchema = new Schema<IScenario>(
  {
    title: String,
    goal: String,
    exceptions: [] as IException[],
    actors: [] as IActor[],
    resources: [] as IResource[],
    context: {} as IContext,
    episodes: [] as IEpisode[],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export default model('Scenario', scenarioSchema);
