import {
	FC,
	FormEvent,
	KeyboardEvent,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './UpdateScenarioForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { UPDATE_SCENARIO } from '../../api';
import useForm from '../../hooks/useForm';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { ErrorResponse, IActor, IException, ILexiconScenario } from '../../shared/interfaces';
import Close from '../../assets/icon/Close_Dark.svg';
import Textarea from '../forms/Textarea';
import { AddActorComboBox } from './actor/AddActorComboBox';
import { AddExceptionComboBox } from './exception/AddExceptionComboBox';
import { AxiosError } from 'axios';

export interface UpdateScenarioRequestDTO {
  title: string;
  goal: string;
  context: {
    geographicLocation: string;
    temporalLocation: string;
    preCondition: string;
  };
  actors: IActor[];
  exceptions: IException[];
  projectId: string;
}

interface UpdateScenarioFormProps {
  scenario: ILexiconScenario;
  onClose: () => void;
  resetScenarioInfo: () => void;
  projectId: string;
}

const UpdateScenarioForm: FC<UpdateScenarioFormProps> = ({ scenario, onClose, projectId, resetScenarioInfo }: UpdateScenarioFormProps): ReactNode => {
	const titleEdit = useForm('dontValidateTitle');
	const goalEdit = useForm('dontValidateGoal');
	const geographicLocationEdit = useForm('dontValidateGeographicLocation');
	const temporalLocationEdit = useForm('dontValidateTemporalLocation');
	const preConditionEdit = useForm('dontValidatePreCondition');
	const [actorsEdit, setActorsEdit] = useState<string[]>([]);
	const [exceptionsEdit, setExceptionsEdit] = useState<string[]>([]);

	const [currentActor, setCurrentActor] = useState('');
	const [currentException, setCurrentException] = useState('');

	useEffect(() => {
		titleEdit.setValue(scenario.title.content);
		goalEdit.setValue(scenario.goal.content);
		geographicLocationEdit.setValue(scenario.context?.geographicLocation.content || '');
		temporalLocationEdit.setValue(scenario.context?.temporalLocation.content || '');
		preConditionEdit.setValue(scenario.context?.preCondition.content || '');
		setActorsEdit(scenario?.actors?.map((actor) => actor.name.content) || []);
		setExceptionsEdit(
			scenario?.exceptions?.map((exception) => exception.description.content) || []
		);
	}, []);

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const updateScenario = async (body: UpdateScenarioRequestDTO) => {
		if (projectId && scenario?.id) {
			setLoading(true);

			try {
				const { url, options } = UPDATE_SCENARIO(
					projectId,
					scenario.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				resetScenarioInfo();
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (titleEdit.validate() && goalEdit.validate()) {
			updateScenario({
				title: titleEdit.value,
				goal: goalEdit.value,
				context: {
					geographicLocation: geographicLocationEdit.value,
					temporalLocation: temporalLocationEdit.value,
					preCondition: preConditionEdit.value,
				},
				exceptions: [...exceptionsEdit, currentException.length ? currentException : null].filter(exception => exception != null).map((exception: string) => ({
					description: exception,
				})),
				actors: [...actorsEdit, currentActor.length ? currentActor : null].filter(actor => actor != null).map((actor: string) => ({
					name: actor,
				})),
				projectId,
			});
		}
	};

	return (
		<section className="update-scenario-form flex column gap-125">
			<div className="update-scenario-form-header">
				<h2>Editar cenário</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<br />
			<div className="flex gap-2">
				<Form>
					<Input
						type="text"
						name="title"
						placeholder="Logar no sistema"
						label="Título"
						autoFocus
						{...titleEdit}
						onInput={() => setError('')}
						onKeyDown={(e: KeyboardEvent) => {
							e.key === 'Enter' && e.preventDefault();
						}}
					/>
					<Textarea
						name="goal"
						placeholder="Permitir ao usuário se identificar"
						label="Objetivo"
						onInput={() => setError('')}
						rows={5}
						onKeyDown={(e) => {
							e.key === 'Enter' && e.preventDefault();
						}}
						{...goalEdit}
					/>
					<AddActorComboBox actors={actorsEdit} setActors={setActorsEdit} setCurrentActor={setCurrentActor} scenarioId={scenario.id}/>
					<AddExceptionComboBox
						exceptions={exceptionsEdit}
						setExceptions={setExceptionsEdit}
						setCurrentException={setCurrentException}
						scenarioId={scenario.id}
					/>
				</Form>
				<Form>
					<h3>Contexto</h3>
					<Input
						type="text"
						name="geographicLocation"
						placeholder="Um lugar qualquer"
						label="Localização geográfica"
						{...geographicLocationEdit}
						onInput={() => setError('')}
						onKeyDown={(e: KeyboardEvent) => {
							e.key === 'Enter' && e.preventDefault();
						}}
					/>
					<Input
						type="text"
						name="temporalLocation"
						placeholder="Um dia qualquer"
						label="Localização temporal"
						{...temporalLocationEdit}
						onInput={() => setError('')}
						onKeyDown={(e) => {
							e.key === 'Enter' && e.preventDefault();
						}}
					/>
					<Textarea
						name="preCondition"
						placeholder="Para isso deve-se..."
						label="Pré-condição"
						onInput={() => setError('')}
						rows={5}
						onKeyDown={(e) => {
							e.key === 'Enter' && e.preventDefault();
						}}
						{...preConditionEdit}
					/>
				</Form>
			</div>
			{loading ? (
				<Loading />
			) : (
				<Button theme="primary" text="Salvar" onClick={handleSubmit} />
			)}
			<Error error={error} />
		</section>
	);
};

export default UpdateScenarioForm;
