import './ScenarioActionsOptionsMenu.scss';
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import EditIcon from '../../helper/icons/EditIcon';
import DeleteIcon from '../../helper/icons/DeleteIcon';

interface ScenarioActionsOptionsMenuProps {
    isActionsOptionsMenuOpen: boolean;
    setIsActionsOptionsMenuOpen: Dispatch<SetStateAction<boolean>>;
    handleOpenScenarioModal: () => void;
    handleCloseScenarioModal: () => void;
    handleOpenDeleteScenarioModal: () => void;
}

export const ScenarioActionsOptionsMenu: FC<ScenarioActionsOptionsMenuProps> = ({
    handleOpenScenarioModal,
    handleCloseScenarioModal,
    setIsActionsOptionsMenuOpen,
    isActionsOptionsMenuOpen,
    handleOpenDeleteScenarioModal,
}: ScenarioActionsOptionsMenuProps): ReactNode => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verifica se o clique foi fora do popup
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsActionsOptionsMenuOpen(false); // Fecha o popup
            }
        };

        // Adiciona o event listener quando o popup estiver aberto
        if (isActionsOptionsMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Remove o event listener quando o popup fecha
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCloseScenarioModal, isActionsOptionsMenuOpen, setIsActionsOptionsMenuOpen]);

    if (!isActionsOptionsMenuOpen) return null;

    return (
        <div className='actions-options-menu' ref={popupRef}>
            <ul>
                <li onClick={handleOpenScenarioModal} key='update-scenario'>
                    <EditIcon />
                    Editar cenário
                </li>
                <li className='delete-scenario-option' onClick={handleOpenDeleteScenarioModal}>
					<DeleteIcon/>
                    Excluir cenário
                </li>
            </ul>
        </div>
    );
};
