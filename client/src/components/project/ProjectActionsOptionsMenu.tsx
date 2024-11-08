import EditPen from '../../assets/icon/Edit.svg';
import Bin from '../../assets/icon/Bin_Empty.svg';
import './ProjectActionsOptionsMenu.scss';
import { FC, ReactNode, useEffect, useRef } from 'react';

interface ProjectActionsOptionsMenuProps {
  isOwner: boolean;
  isProjectActionsOptionsMenu: boolean;
  handleOpenUpdateProjectModal: () => void;
  handleOpenDeleteProjectModal: () => void;
  handleCloseProjectActionsOptionsMenu: () => void;
}

export const ProjectActionsOptionsMenu: FC<ProjectActionsOptionsMenuProps> = ({
	handleOpenUpdateProjectModal,
	isOwner,
	isProjectActionsOptionsMenu,
	handleOpenDeleteProjectModal,
	handleCloseProjectActionsOptionsMenu,
}: ProjectActionsOptionsMenuProps): ReactNode => {
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Verifica se o clique foi fora do popup
			if (
				popupRef.current &&
        !popupRef.current.contains(event.target as Node)
			) {
				handleCloseProjectActionsOptionsMenu();
			}
		};

		// Adiciona o event listener quando o popup estiver aberto
		if (isProjectActionsOptionsMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		// Remove o event listener quando o popup fecha
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleCloseProjectActionsOptionsMenu, isProjectActionsOptionsMenu]);

	if (!isProjectActionsOptionsMenu) return null;

	return (
		<div className="project-actions-options-menu" ref={popupRef}>
			<ul>
				<li onClick={handleOpenUpdateProjectModal} key="update-project">
					<img src={EditPen} alt="Editar projeto" />
          Editar projeto
				</li>
				{isOwner && (
					<li className="delete-project" onClick={handleOpenDeleteProjectModal}>
						<img src={Bin} alt="Excluir projeto" key="delete-project" />
            Excluir projeto
					</li>
				)}
			</ul>
		</div>
	);
};
