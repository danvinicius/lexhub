import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import api from '../../../lib/axios';
import { DELETE_SCENARIO } from '../../../api';
import { UserContext } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import { ErrorResponse, ILexiconScenario } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Close from '../../../assets/icon/Close_Dark.svg';
import './DeleteScenario.scss';

export interface DeleteScenarioRequestDTO {
  name: string;
  description: string;
}

interface DeleteScenarioProps {
  scenario: ILexiconScenario;
  projectId: string;
  onClose: () => void;
  resetScenarioInfo: () => void;
}

const DeleteScenario: FC<DeleteScenarioProps> = ({ scenario, projectId, onClose, resetScenarioInfo }: DeleteScenarioProps): ReactNode => {

	const { isAuthenticated } = useContext(UserContext) || {};
	const { success, error } = useToast()

	const [loading, setLoading] = useState(false);

	const deleteScenario = async () => {
		if (scenario?.id) {
			setLoading(true);

			try {
				const { url, options } = DELETE_SCENARIO(
					projectId,
					scenario.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, options);
				resetScenarioInfo();
				success('Cenário excluído com sucesso')
			} catch (err) {
				const typedError = err as AxiosError<ErrorResponse>;
				error(typedError?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		deleteScenario();
	};

	return (
		<section className="delete-scenario flex column gap-125">
			<div className="delete-scenario-header">
				<h2>Tem certeza que deseja excluir o cenário &quot;{scenario.title.content}&quot;?</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<br />
			<Form style={{gap: '.5rem', userSelect: 'none'}}>
				{loading ? (
					<Loading />
				) : (
					<Button theme="danger" text="Excluir" onClick={handleSubmit} />
				)}
			</Form>
		</section>
	);
};

export default DeleteScenario;
