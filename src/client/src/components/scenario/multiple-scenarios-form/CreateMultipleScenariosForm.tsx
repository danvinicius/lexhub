import { FC, ReactNode, useContext, useState } from "react";
import { AxiosError } from "axios";

import api from "../../../lib/axios";
import { CREATE_MULTIPLE_SCENARIOS } from "../../../api";
import { ProjectContext } from "../../../context/ProjectContext";
import { UserContext } from "../../../context/UserContext";
import { IScenario, ErrorResponse } from "../../../shared/interfaces";

import ScenarioInputGroup from "./scenario-input-group/ScenarioInputGroup";
import Close from '../../../assets/icon/Close_Dark.svg';
import Button from "../../forms/button/Button";
import Error from "../../helper/Error";
import './CreateMultipleScenariosForm.scss'

export interface CreateMultipleScenariosRequestDTO {
    scenarios: {
        title: string;
    }[];
  projectId: string;
}

interface CreateMultipleScenariosFormProps {
  onClose: () => void;
  resetProjectInfo: () => void;
}

export const CreateMultipleScenariosForm: FC<CreateMultipleScenariosFormProps> = ({
	onClose,
	resetProjectInfo
}: CreateMultipleScenariosFormProps): ReactNode => {
	const projectContext = useContext(ProjectContext);
	const {isAuthenticated} = useContext(UserContext);

	const [error, setError] = useState('');
	const [, setLoading] = useState(false);
	const [scenarios, setScenarios] = useState<Omit<IScenario, 'project'>[]>([{
        title: '',
    }]);

	const createMultipleScenarios = async (body: CreateMultipleScenariosRequestDTO) => {
		setLoading(true);
		if (projectContext.project?.id) {
			try {
				const { url, options } = CREATE_MULTIPLE_SCENARIOS(
					projectContext.project.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				resetProjectInfo();
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

    const handleCreateMultipleScenarios = async () => {
		if (!scenarios.every(scenario => scenario.title.trim().length)) {
			setError('Todos os cenários adicionados devem ser preenchidos com título e objetivo.')
			return;
		}
        if (projectContext.project?.id) {
            await createMultipleScenarios({
                scenarios,
                projectId: projectContext.project?.id
            })
        }
    }

	return (
		<section className="create-scenarios-form flex column gap-125">
			<div className="create-scenarios-form-header">
				<h2>Novos cenários</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<p>Crie múltiplos cenários simultaneamente</p>

			<ScenarioInputGroup scenarios={scenarios} setScenarios={setScenarios} />

			<Error error={error}/>

			<Button text="Salvar" theme="secondary" onClick={handleCreateMultipleScenarios} />
		</section>
	);
};