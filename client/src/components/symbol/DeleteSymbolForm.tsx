import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import Button from '../forms/Button';
import Form from '../forms/Form';
import './DeleteSymbolForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { DELETE_SYMBOL } from '../../api';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, ISymbol } from '../../shared/interfaces';
import Close from '../../assets/icon/Close_Dark.svg';
import { AxiosError } from 'axios';

export interface DeleteSymbolRequestDTO {
  name: string;
  description: string;
}

interface DeleteSymbolFormProps {
  symbol: ISymbol;
  projectId: string;
  onClose: () => void;
}

const DeleteSymbolForm: FC<DeleteSymbolFormProps> = ({ symbol, projectId, onClose }: DeleteSymbolFormProps): ReactNode => {

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const deleteSymbol = async () => {
		if (symbol?.id) {
			setLoading(true);

			try {
				const { url, options } = DELETE_SYMBOL(
					projectId,
					symbol.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, options);
				navigate(0);
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
		deleteSymbol();
	};

	return (
		<section className="delete-symbol-form flex column gap-125">
			<div className="delete-symbol-form-header">
				<h2>Tem certeza que deseja excluir o símbolo &quot;{symbol.name}&quot;?</h2>
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

export default DeleteSymbolForm;
