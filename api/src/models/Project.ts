import Symbol, { ISymbol } from './Symbol';
import Scenario, { IScenario } from './Scenario';
import { IUserProject } from './User';
import { model, Schema } from 'mongoose';
import { UserRole } from './User';

export interface IProject {
  readonly id?: string;
  name: string;
  description: string;
  private: boolean;
  scenarios?: IScenario[];
  symbols?: ISymbol[];
  users: IUserProject[];
  deletedAt: Date,
}

const projectSchema = new Schema<IProject>(
  {
    name: String,
    description: String,
    private: {
      type: Boolean,
      default: true
    },
    scenarios: [
      { type: Schema.Types.ObjectId, ref: 'Scenario', required: true },
    ],
    symbols: [{ type: Schema.Types.ObjectId, ref: 'Symbol', required: true }],
    users: [
      {
        role: {
          type: String,
          enum: UserRole,
          default: UserRole.OBSERVER
        },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      },
    ],
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

projectSchema.pre('deleteOne', async function (next) {
  try {
    // Obter o projeto que está sendo removido
    const project = await this.model.findOne(this.getFilter());

    if (!project) {
      return next(new Error('Projeto não encontrado'));
    }

    // Remover todos os cenários associados
    await Scenario.deleteMany({ _id: { $in: project.scenarios } });

    // Remover todos os símbolos associados
    await Symbol.deleteMany({ _id: { $in: project.symbols } });

    next(); // Continuar com a remoção do projeto
  } catch (error) {
    next(error);
  }
});



export default model('Project', projectSchema)