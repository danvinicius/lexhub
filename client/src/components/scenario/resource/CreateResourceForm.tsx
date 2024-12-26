import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GET_SCENARIO, UPDATE_SCENARIO } from '../../../api';
import api from '../../../lib/axios';
import {
	ErrorResponse,
	IActor,
	IContext,
	IException,
	IResource,
	IScenario,
} from '../../../shared/interfaces';
import Button from '../../forms/Button';
import { AddResourceComboBox } from './AddResourceComboBox';
import { ProjectContext } from '../../../context/ProjectContext';
import { UserContext } from '../../../context/UserContext';
import Close from '../../../assets/icon/Close_Dark.svg';
import './CreateResourceForm.scss';
import { AxiosError } from 'axios';

export interface EditScenarioRequestDTO {
  title: string;
  goal: string;
  context: IContext;
  resources: IResource[];
  actors: IActor[];
  exceptions: IException[];
  projectId: string;
}

interface CreateResourceFormProps {
  onClose: () => void;
  scenarioId: string;
}

export const CreateResourceForm: FC<CreateResourceFormProps> = ({
	onClose,
	scenarioId,
}: CreateResourceFormProps): ReactNode => {
	const projectContext = useContext(ProjectContext);
	const [resources, setResources] = useState<string[]>([]);

	const [currentResource, setCurrentResource] = useState('');

	useEffect(() => {
		if (projectContext?.project && scenarioId) {
			const scenario = projectContext.project.scenarios?.find(
				(scenario) => scenario.id === scenarioId
			);
			if (scenario) {
				const initialResources = scenario.resources.map(
					(resource) => resource.name.content
				);
				setResources(initialResources);
			}
		}
	}, [projectContext, scenarioId]);

	const { isAuthenticated } = useContext(UserContext || {});

	const [, setError] = useState('');
	const [, setLoading] = useState(false);

	const updateScenarioWithResources = async (body: EditScenarioRequestDTO) => {
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

	const handleAddResources = async () => {
		const { url, options } = GET_SCENARIO(
			projectContext.project?.id || '',
			scenarioId,
			isAuthenticated()?.token || ''
		);
		const response = await api[options.method](url, options);
		const originalScenario: IScenario = response.data;

		await updateScenarioWithResources({
			title: originalScenario.title,
			goal: originalScenario.goal,
			actors: originalScenario.actors || [],
			exceptions: originalScenario.exceptions || [],
			context: originalScenario.context || {},
			projectId: projectContext.project?.id || '',
			resources: [...resources, currentResource.length ? currentResource : null].filter(resource => resource != null).map((resource) => ({
				id:  uuidv4(),
				name: resource,
				restrictions: originalScenario.resources?.find(r => r.name == resource)?.restrictions
			})),
		});
	};
	return (
		<section className="create-resource-form flex column gap-125">
			<div className="create-resource-form-header">
				<h2>Novo recurso</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<p>Adicione um recurso a este cenário</p>
			<AddResourceComboBox
				resources={resources}
				setResources={setResources}
				scenarioId={scenarioId}
				setCurrentResource={setCurrentResource}
			/>
			<Button
				text="Salvar"
				theme="secondary"
				onClick={handleAddResources}
			/>
		</section>
	);
};
