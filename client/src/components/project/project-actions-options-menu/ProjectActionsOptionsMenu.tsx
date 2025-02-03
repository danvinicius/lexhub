import './ProjectActionsOptionsMenu.scss';
import { FC, ReactNode, useEffect, useRef } from 'react';
import EditIcon from '../../helper/icons/EditIcon';
import DeleteIcon from '../../helper/icons/DeleteIcon';

interface ProjectActionsOptionsMenuProps {
    isProprietario: boolean;
    isProjectActionsOptionsMenuOpen: boolean;
    handleOpenUpdateProjectModal: () => void;
    handleOpenDeleteProjectModal: () => void;
    handleCloseProjectActionsOptionsMenu: () => void;
}

export const ProjectActionsOptionsMenu: FC<ProjectActionsOptionsMenuProps> = ({
    handleOpenUpdateProjectModal,
    isProprietario,
    isProjectActionsOptionsMenuOpen,
    handleOpenDeleteProjectModal,
    handleCloseProjectActionsOptionsMenu,
}: ProjectActionsOptionsMenuProps): ReactNode => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verifica se o clique foi fora do popup
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                handleCloseProjectActionsOptionsMenu();
            }
        };

        // Adiciona o event listener quando o popup estiver aberto
        if (isProjectActionsOptionsMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Remove o event listener quando o popup fecha
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCloseProjectActionsOptionsMenu, isProjectActionsOptionsMenuOpen]);

    if (!isProjectActionsOptionsMenuOpen) return null;

    return (
        <div className='project-actions-options-menu' ref={popupRef}>
            <ul>
                <li onClick={handleOpenUpdateProjectModal} key='update-project'>
                    <EditIcon />
                    Editar projeto
                </li>
                {isProprietario && (
                    <li className='delete-project-option' onClick={handleOpenDeleteProjectModal}>
                        <DeleteIcon />
                        Excluir projeto
                    </li>
                )}
            </ul>
        </div>
    );
};
