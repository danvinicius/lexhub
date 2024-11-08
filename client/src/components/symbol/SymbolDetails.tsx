import { CSSProperties, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ISynonym, IImpact, ISymbol, IUserRole } from '../../shared/interfaces';
import './SymbolDetails.scss';
import KebabVertical from '../../assets/icon/Kebab_Vertical.svg';
import { SymbolActionsOptionsMenu } from './SymbolActionsOptionsMenu';
import { Modal } from '@mui/material';
import UpdateSymbolForm from './UpdateSymbolForm';
import DeleteSymbolForm from './DeleteSymbolForm';
import { UserContext } from '../../context/UserContext';
import { ProjectContext } from '../../context/ProjectContext';

interface SymbolDetailsProps {
  symbol: ISymbol;
  style?: CSSProperties;
}

const SymbolDetails: FC<SymbolDetailsProps> = ({ symbol, style }: SymbolDetailsProps): ReactNode => {
	const { isAuthenticated } = useContext(UserContext) || {};
	const [isCollaborator, setIsCollaborator] = useState(false);
	const { project } = useContext(ProjectContext);

	useEffect(() => {
		const role = isAuthenticated()?.projects.find(
			(someProject) => someProject.project == project?.id
		)?.role;
		setIsCollaborator(
			role == IUserRole.OWNER ||
        role == IUserRole.ADMIN ||
        role == IUserRole.COLLABORATOR
		);
	}, [isAuthenticated, project?.id]);

	const [isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen] =
    useState(false);
	const [isUpdateSymbolModalOpen, setIsUpdateSymbolModalOpen] = useState(false);
	const [isDeleteSymbolModalOpen, setIsDeleteSymbolModalOpen] = useState(false);
	const handleOpenUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(true);
	const handleCloseUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(false);
	const handleOpenDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(true);
	const handleCloseDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(false);
	return (
		<div className="symbol-details" style={style}>
			<div className="symbol-details-notion">
				<div className="symbol-name">
					<h3>{symbol?.name}</h3>
					<div className="classification">
						<p>{symbol?.classification}</p>
					</div>
					{isCollaborator && (
						<>
							<img
								src={KebabVertical}
								alt=""
								className="symbol-options-button"
								onClick={() => setIsSymbolActionsOptionsMenuOpen(true)}
							/>
							<div className="symbol-options">
								{isSymbolActionsOptionsMenuOpen && (
									<SymbolActionsOptionsMenu
										handleOpenUpdateSymbolModal={handleOpenUpdateSymbolModal}
										handleCloseUpdateSymbolModal={handleCloseUpdateSymbolModal}
										setIsSymbolActionsOptionsMenuOpen={
											setIsSymbolActionsOptionsMenuOpen
										}
										isSymbolActionsOptionsMenuOpen={
											isSymbolActionsOptionsMenuOpen
										}
										handleOpenDeleteSymbolModal={handleOpenDeleteSymbolModal}
									/>
								)}
							</div>
						</>
					)}
				</div>
				<p>{symbol?.notion}</p>
			</div>
			<div className="symbol-details-synonyms">
				<h4>Sinônimos</h4>
				{symbol?.synonyms?.length ? (
					<ul>
						{symbol.synonyms?.map((synonym: ISynonym) => {
							return <li key={synonym.name}>{synonym.name}</li>;
						})}
					</ul>
				) : (
					<p>Ainda não há sinônimos cadastrados nesse símbolo</p>
				)}
			</div>
			<div className="symbol-details-impacts">
				<h4>Impactos</h4>
				{symbol?.impacts?.length ? (
					<ul>
						{symbol.impacts?.map((impact: IImpact) => {
							return <li key={impact.description}>{impact.description}</li>;
						})}
					</ul>
				) : (
					<p>Ainda não há impactos cadastrados nesse símbolo</p>
				)}
			</div>
			<Modal
				open={isUpdateSymbolModalOpen}
				onClose={handleCloseUpdateSymbolModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<UpdateSymbolForm
					onClose={handleCloseUpdateSymbolModal}
					symbol={symbol ? symbol : ({} as ISymbol)}
					projectId={symbol.project || ''}
				/>
			</Modal>
			<Modal
				open={isDeleteSymbolModalOpen}
				onClose={handleCloseDeleteSymbolModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<DeleteSymbolForm
					onClose={handleCloseDeleteSymbolModal}
					symbol={symbol ? symbol : ({} as ISymbol)}
					projectId={symbol.project}
				/>
			</Modal>
		</div>
	);
};

export default SymbolDetails;
