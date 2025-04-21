import { FC, ReactNode, useEffect, useRef } from 'react';

import EditIcon from '../../helper/icons/EditIcon';
import DeleteIcon from '../../helper/icons/DeleteIcon';
import './ProjectActionsOptionsMenu.scss';

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
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                handleCloseProjectActionsOptionsMenu();
            }
        };

        if (isProjectActionsOptionsMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

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
