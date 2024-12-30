import { model, Schema } from 'mongoose';

export interface IImpact {
  readonly id?: string;
  description: string;
}

export interface ISynonym {
  readonly id?: string;
  name: string;
}

export interface ISymbol {
  readonly id?: string;
  name: string;
  classification: string;
  notion?: string;
  synonyms?: ISynonym[];
  impacts?: IImpact[];
  project: String;
  deletedAt: Date;
}

const symbolSchema = new Schema<ISymbol>(
  {
    name: String,
    classification: String,
    notion: String,
    synonyms: [] as ISynonym[],
    impacts: [] as IImpact[],
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
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

export default model('Symbol', symbolSchema)