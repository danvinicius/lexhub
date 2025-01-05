import { CSSProperties, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { IUserRole, ILexiconSymbol } from '../../shared/interfaces';
import './SymbolDetails.scss';
import KebabVertical from '../../assets/icon/Kebab_Vertical.svg';
import { SymbolActionsOptionsMenu } from './SymbolActionsOptionsMenu';
import { Modal } from '@mui/material';
import UpdateSymbolForm from './UpdateSymbolForm';
import DeleteSymbolForm from './DeleteSymbolForm';
import { UserContext } from '../../context/UserContext';
import { ProjectContext } from '../../context/ProjectContext';
import { useLexicon } from '../../hooks/useLexicon';

interface SymbolDetailsProps {
    symbol?: ILexiconSymbol;
    style?: CSSProperties;
	resetProjectInfo?: () => void;
}

const SymbolDetails: FC<SymbolDetailsProps> = ({ symbol, style, resetProjectInfo }: SymbolDetailsProps): ReactNode => {
	const { isAuthenticated } = useContext(UserContext) || {};
	const [isColaborador, setIsColaborador] = useState(false);
	const { project } = useContext(ProjectContext);
	const { processContent } = useLexicon();

	const resetSymbolInfo = () => {
		if (!resetProjectInfo) {
			window.location.href = `/projeto/${project?.id}`;
			return;
		}
		resetProjectInfo();
		closeAllModals();
	};

	const closeAllModals = () => {
		handleCloseDeleteSymbolModal();
		handleCloseUpdateSymbolModal();
	};

	useEffect(() => {
		const role = isAuthenticated()?.projects.find((someProject) => someProject.project == project?.id)?.role;
		setIsColaborador(role == IUserRole.PROPRIETARIO || role == IUserRole.ADMINISTRADOR || role == IUserRole.COLABORADOR);
	}, [isAuthenticated, project?.id]);

	const [isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen] = useState(false);
	const [isUpdateSymbolModalOpen, setIsUpdateSymbolModalOpen] = useState(false);
	const [isDeleteSymbolModalOpen, setIsDeleteSymbolModalOpen] = useState(false);
	const handleOpenUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(true);
	const handleCloseUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(false);
	const handleOpenDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(true);
	const handleCloseDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(false);
	return (
		<>
			{symbol && (
				<div className='symbol-details' style={style}>
					<div className='symbol-details-notion'>
						<div className='symbol-name'>
							<h3>{symbol?.name}</h3>
							<div className='classification'>
								<p>{symbol?.classification}</p>
							</div>
							{isColaborador && (
								<>
									<img
										src={KebabVertical}
										alt=''
										className='symbol-options-button'
										onClick={() => setIsSymbolActionsOptionsMenuOpen(true)}
									/>
									<div className='symbol-options'>
										{isSymbolActionsOptionsMenuOpen && (
											<SymbolActionsOptionsMenu
												handleOpenUpdateSymbolModal={handleOpenUpdateSymbolModal}
												handleCloseUpdateSymbolModal={handleCloseUpdateSymbolModal}
												setIsSymbolActionsOptionsMenuOpen={setIsSymbolActionsOptionsMenuOpen}
												isSymbolActionsOptionsMenuOpen={isSymbolActionsOptionsMenuOpen}
												handleOpenDeleteSymbolModal={handleOpenDeleteSymbolModal}
											/>
										)}
									</div>
								</>
							)}
						</div>
						<p className='notion'>{processContent(symbol?.notion)}</p>
					</div>
					<div className='symbol-details-synonyms'>
						<h4>Sinônimos</h4>
						{symbol?.synonyms?.length ? (
							<ul>
								{symbol.synonyms?.map((synonym) => {
									return <li key={synonym.name.content}>{processContent(synonym.name)}</li>;
								})}
							</ul>
						) : (
							<p>Ainda não há sinônimos cadastrados nesse símbolo</p>
						)}
					</div>
					<div className='symbol-details-impacts'>
						<h4>Impactos</h4>
						{symbol?.impacts?.length ? (
							<ul>
								{symbol.impacts?.map((impact) => {
									return <li key={impact.description.content}>{processContent(impact.description)}</li>;
								})}
							</ul>
						) : (
							<p>Ainda não há impactos cadastrados nesse símbolo</p>
						)}
					</div>
					<Modal
						open={isUpdateSymbolModalOpen}
						onClose={handleCloseUpdateSymbolModal}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'
					>
						<UpdateSymbolForm
							onClose={handleCloseUpdateSymbolModal}
							symbol={symbol ? symbol : ({} as ILexiconSymbol)}
							resetSymbolInfo={resetSymbolInfo}
							projectId={symbol?.projectId || ''}
						/>
					</Modal>
					<Modal
						open={isDeleteSymbolModalOpen}
						onClose={handleCloseDeleteSymbolModal}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'
					>
						<DeleteSymbolForm
							onClose={handleCloseDeleteSymbolModal}
							symbol={symbol ? symbol : ({} as ILexiconSymbol)}
							resetSymbolInfo={resetSymbolInfo}
							projectId={symbol?.projectId || ''}
						/>
					</Modal>
				</div>
			)}
		</>
	);
};

export default SymbolDetails;
