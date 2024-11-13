import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import Button from '../forms/Button';
import Form from '../forms/Form';
import './DeleteScenarioForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { DELETE_SCENARIO } from '../../api';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, ILexiconScenario } from '../../shared/interfaces';
import Close from '../../assets/icon/Close_Dark.svg';
import { AxiosError } from 'axios';

export interface DeleteScenarioRequestDTO {
  name: string;
  description: string;
}

interface DeleteScenarioFormProps {
  scenario: ILexiconScenario;
  projectId: string;
  onClose: () => void;
}

const DeleteScenarioForm: FC<DeleteScenarioFormProps> = ({ scenario, projectId, onClose }: DeleteScenarioFormProps): ReactNode => {

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

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
				window.location.href = '/home';
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
		deleteScenario();
	};

	return (
		<section className="delete-scenario-form flex column gap-125">
			<div className="delete-scenario-form-header">
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
				<Error error={error} />
			</Form>
		</section>
	);
};

export default DeleteScenarioForm;
