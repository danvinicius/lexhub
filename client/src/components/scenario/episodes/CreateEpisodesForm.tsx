import { FC, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
	IActor,
	IContext,
	IException,
	IEpisode,
	IScenario,
	IResource,
	ErrorResponse,
} from '../../../shared/interfaces';
import Button from '../../forms/Button';
import Close from '../../../assets/icon/Close_Dark.svg';
import './CreateEpisodesForm.scss';
import EpisodeInputGroup from './EpisodeInputGroup';
import { GET_SCENARIO, UPDATE_SCENARIO } from '../../../api';
import { ProjectContext } from '../../../context/ProjectContext';
import { UserContext } from '../../../context/UserContext';
import api from '../../../lib/axios';
import { AxiosError } from 'axios';

export interface EditScenarioRequestDTO {
  title: string;
  goal: string;
  context: IContext;
  episodes: IEpisode[];
  actors: IActor[];
  exceptions: IException[];
  resources: IResource[];
  projectId: string;
}

interface CreateEpisodesFormProps {
  onClose: () => void;
  scenarioId: string;
  initialEpisodes: IEpisode[];
}

export const CreateEpisodesForm: FC<CreateEpisodesFormProps> = ({ onClose, scenarioId, initialEpisodes }: CreateEpisodesFormProps): ReactNode => {
	const projectContext = useContext(ProjectContext);
	const {isAuthenticated} = useContext(UserContext);

	const [, setError] = useState('');
	const [, setLoading] = useState(false);
	const [episodes, setEpisodes] = useState<IEpisode[]>(() => {
		return initialEpisodes.length > 0
			? initialEpisodes
			: [{
				id: '',
				position: 1,
				description: '',
				type: '',
				restriction: '',
			}];
	});

	const updateScenarioWithEpisodes = async (body: EditScenarioRequestDTO) => {
		setLoading(true);
		if (projectContext.project?.id) {
			try {
				const { url, options } = UPDATE_SCENARIO(
					projectContext.project.id,
					scenarioId,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				window.location.href = `/projeto/${projectContext.project.id}`;
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleAddEpisodes = async () => {
		const { url, options } = GET_SCENARIO(
			projectContext.project?.id || '',
			scenarioId,
			isAuthenticated()?.token || ''
		);
		const response = await api[options.method](url, options);
		const originalScenario: IScenario = response.data;

		await updateScenarioWithEpisodes({
			title: originalScenario.title,
			goal: originalScenario.goal,
			actors: originalScenario.actors || [],
			exceptions: originalScenario.exceptions || [],
			context: originalScenario.context || {},
			projectId: projectContext.project?.id || '',
			resources: originalScenario.resources || [],
			episodes: episodes.map(episode => ({
				...episode,
				id: uuidv4(),
			})),
		});
	};

	return (
		<section className="create-episodes-form flex column gap-125">
			<div className="create-episodes-form-header">
				<h2>Novo episódio</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<p>Adicione episódios a este cenário</p>

			<EpisodeInputGroup episodes={episodes} setEpisodes={setEpisodes} />

			<Button text="Salvar" theme="secondary" onClick={handleAddEpisodes} />
		</section>
	);
};