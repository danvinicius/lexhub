import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import { DELETE_SYMBOL } from '../../../api';
import api from '../../../lib/axios';
import { UserContext } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import { ErrorResponse, ILexiconSymbol } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Close from '../../../assets/icon/Close_Dark.svg';
import './DeleteSymbol.scss';

interface DeleteSymbolProps {
  symbol: ILexiconSymbol;
  resetSymbolInfo: () => void;
  projectId: string;
  onClose: () => void;
}

const DeleteSymbol: FC<DeleteSymbolProps> = ({ symbol, projectId, onClose, resetSymbolInfo }: DeleteSymbolProps): ReactNode => {

	const { isAuthenticated } = useContext(UserContext) || {};
	const { success, error } = useToast()

	const [loading, setLoading] = useState(false);

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
				resetSymbolInfo();
				success('Símbolo excluído com sucesso')
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
		deleteSymbol();
	};

	return (
		<section className="delete-symbol flex column gap-125">
			<div className="delete-symbol-header">
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
			</Form>
		</section>
	);
};

export default DeleteSymbol;
