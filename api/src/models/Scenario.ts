import { IProject } from './Project';
import { model, Schema } from 'mongoose';

export interface IGroup {
  readonly id?: string;
  position: number;
  nonSequentialEpisodes: INonSequentialEpisode[];
}

export interface INonSequentialEpisode extends IEpisode {
  readonly id?: string;
  group: IGroup;
}

export interface IException {
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
  position: number;
  description: string;
  type: string;
  restriction?: IRestriction;
}

export interface IRestriction {
  readonly id?: string;
  description: string;
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
  groups?: IGroup[];
  project: IProject;
}

const restrictionSchema = new Schema<IRestriction>(
  {
    description: String,
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

const resourceSchema = new Schema<IResource>(
  {
    name: String,
    restrictions: [{ type: Schema.Types.ObjectId, ref: 'Restriction' }],
    scenarios: [{ type: Schema.Types.ObjectId, ref: 'Scenario' }],
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

const scenarioSchema = new Schema<IScenario>(
  {
    title: String,
    goal: String,
    exceptions: [] as IException[],
    actors: [] as IActor[],
    resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    context: {
      geographicLocation: String,
      temporalLocation: String,
      preCondition: String,
      restrictions: [{ type: Schema.Types.ObjectId, ref: 'Restriction' }],
    },
    episodes: [
      {
        position: Number,
        description: String,
        type: String,
        restriction: { type: Schema.Types.ObjectId, ref: 'Restriction' },
      },
    ],
    groups: [{
      position: Number,
      nonSequentialEpisodes: [] as IEpisode[],
    }],
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

const Resource = model('Resource', resourceSchema);

const Restriction = model('Restriction', restrictionSchema);

export { Resource, Restriction };

export default model('Scenario', scenarioSchema);
