import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { UPDATE_SCENARIO, GET_SCENARIO } from '../../../api';
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
import { AddRestrictionComboBox } from './AddRestrictionComboBox';
import { UserContext } from '../../../context/UserContext';
import Close from '../../../assets/icon/Close_Dark.svg';
import './CreateRestrictionForm.scss';
import { ProjectContext } from '../../../context/ProjectContext';
import { AxiosError } from 'axios';

export interface EditScenarioRequestDTO {
  title?: string;
  goal?: string;
  context?: IContext;
  actors?: IActor[];
  exceptions?: IException[];
  resources?: IResource[];
  projectId: string;
}

interface CreateRestrictionFormProps {
  onClose: () => void;
  scenarioId: string;
  projectId: string;
  resourceId?: string;
  resetScenarioInfo: () => void;
}

export const CreateRestrictionForm: FC<CreateRestrictionFormProps> = ({
	onClose,
	scenarioId,
	projectId,
	resourceId,
	resetScenarioInfo,
}: CreateRestrictionFormProps): ReactNode => {
	const projectContext = useContext(ProjectContext);
	const [restrictions, setRestrictions] = useState<string[]>([]);
	const { isAuthenticated } = useContext(UserContext || {});
	
	const [currentRestriction, setCurrentRestriction] = useState('');

	useEffect(() => {
		if (projectContext?.project && scenarioId) {
			const scenario = projectContext.project.scenarios?.find(
				(scenario) => scenario.id === scenarioId
			);
			if (scenario) {
				let initialRestrictions;
				if (resourceId) {
					initialRestrictions = [
						...new Set(
							scenario.resources
								.find((resource) => resource.id == resourceId)
								?.restrictions?.map(
									(restriction) => restriction.description.content
								) || []
						),
					];
				} else {
					initialRestrictions = [
						...new Set(
							scenario.context.restrictions?.map(
								(restriction) => restriction.description.content
							) || []
						),
					];
				}
				setRestrictions(initialRestrictions);
			}
		}
	}, [projectContext, resourceId, scenarioId]);

	const [, setError] = useState('');
	const [, setLoading] = useState(false);

	const updateScenarioWithRestriction = async (
		body: EditScenarioRequestDTO
	) => {
		if (projectId && scenarioId) {
			setLoading(true);
			try {
				const { url, options } = UPDATE_SCENARIO(
					projectId,
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

	const handleAddRestrictions = async () => {
		const { url, options } = GET_SCENARIO(
			projectId,
			scenarioId,
			isAuthenticated()?.token || ''
		);
		const response = await api[options.method](url, options);
		const originalScenario: IScenario = response.data;
		if (resourceId) {
			const updatedResources = originalScenario.resources?.map((resource) => {
				if (resource.id == resourceId) {
					return {
						...resource,
						restrictions: [...[...restrictions, currentRestriction.length ? currentRestriction : null].filter(restriction => restriction != null).map((restriction) => ({
							description: restriction,
						}))],
					};
				}
				return resource;
			});

			await updateScenarioWithRestriction({
				...originalScenario,
				resources: updatedResources,
				projectId: originalScenario.project,
			});
			return;
		}
		const updatedContext = {
			...originalScenario.context,
			restrictions: [...restrictions, currentRestriction.length ? currentRestriction : null].filter(restriction => restriction != null).map((restriction) => ({
				description: restriction,
			})),
		};
		await updateScenarioWithRestriction({
			...originalScenario,
			context: updatedContext,
			projectId: originalScenario.project,
		});
	};
	return (
		<section className="create-restriction-form flex column gap-125">
			<div className="create-restriction-form-header">
				<h2>Nova restrição</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			{!resourceId && <p>Adicione uma restrição a este contexto</p>}
			{resourceId && <p>Adicione uma restrição a este recurso</p>}
			<AddRestrictionComboBox
				scenarioId={scenarioId}
				restrictions={restrictions}
				setRestrictions={setRestrictions}
				setCurrentRestriction={setCurrentRestriction}
			/>
			<Button text="Salvar" theme="secondary" onClick={handleAddRestrictions} />
		</section>
	);
};
