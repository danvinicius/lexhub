import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import { ScenarioRequestDTO } from '../../../shared/dto';
import { ProjectContext } from '../../../context/ProjectContext';
import { UserContext } from '../../../context/UserContext';
import {
	ErrorResponse,
} from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Close from '../../../assets/icon/Close_Dark.svg';
import { AddActorComboBox } from './ActorComboBox';
import './ActorForm.scss';

interface ActorsFormProps {
  onClose: () => void;
  scenarioId: string;
  resetScenarioInfo: () => void;
}

export const ActorsForm: FC<ActorsFormProps> = ({
	onClose,
	scenarioId,
	resetScenarioInfo,
}: ActorsFormProps): ReactNode => {
	const projectContext = useContext(ProjectContext);
	const [actors, setActors] = useState<string[]>([]);

	const [currentActor, setCurrentActor] = useState('');

	useEffect(() => {
		if (projectContext?.project && scenarioId) {
			const scenario = projectContext.project.scenarios?.find(
				(scenario) => scenario.id === scenarioId
			);
			if (scenario) {
				const initialActors = scenario.actors.map(
					(actor) => actor.name.content
				);
				setActors(initialActors);
			}
		}
	}, [projectContext, scenarioId]);

	const { isAuthenticated } = useContext(UserContext || {});

	const [, setError] = useState('');
	const [, setLoading] = useState(false);

	const updateScenarioWithActors = async (body: ScenarioRequestDTO) => {
		setLoading(true);
		if (projectContext.project?.id) {
			try {
				const { url, options } = UPDATE_SCENARIO(
					projectContext.project.id,
					scenarioId,
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

	const handleAddActors = async () => {
		await updateScenarioWithActors({
			projectId: projectContext.project?.id || '',
			actors: [...actors, currentActor.length ? currentActor : null].filter(actor => actor != null).map((actor) => ({
				id:  uuidv4(),
				name: actor,
			})),
		});
	};
	return (
		<section className="create-actors-form flex column gap-125">
			<div className="create-actors-form-header">
				<h2>Gerenciar atores</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<AddActorComboBox
				actors={actors}
				setActors={setActors}
				scenarioId={scenarioId}
				setCurrentActor={setCurrentActor}
			/>
			<Button
				text="Salvar"
				theme="primary"
				onClick={handleAddActors}
			/>
		</section>
	);
};
