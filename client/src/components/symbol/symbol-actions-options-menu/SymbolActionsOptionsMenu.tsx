import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef } from 'react';

import EditIcon from '../../helper/icons/EditIcon';
import DeleteIcon from '../../helper/icons/DeleteIcon';
import './SymbolActionsOptionsMenu.scss';

interface SymbolActionsOptionsMenuProps {
    isSymbolActionsOptionsMenuOpen: boolean;
    setIsSymbolActionsOptionsMenuOpen: Dispatch<SetStateAction<boolean>>;
    handleOpenUpdateSymbolModal: () => void;
    handleCloseUpdateSymbolModal: () => void;
    handleOpenDeleteSymbolModal: () => void;
}

export const SymbolActionsOptionsMenu: FC<SymbolActionsOptionsMenuProps> = ({
    handleOpenUpdateSymbolModal,
    handleCloseUpdateSymbolModal,
    setIsSymbolActionsOptionsMenuOpen,
    isSymbolActionsOptionsMenuOpen,
    handleOpenDeleteSymbolModal,
}: SymbolActionsOptionsMenuProps): ReactNode => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsSymbolActionsOptionsMenuOpen(false);
            }
        };

        if (isSymbolActionsOptionsMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCloseUpdateSymbolModal, isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen]);

    if (!isSymbolActionsOptionsMenuOpen) return null;

    return (
        <div className='symbol-actions-options-menu' ref={popupRef}>
            <ul>
                <li onClick={handleOpenUpdateSymbolModal} key='update-symbol'>
                    <EditIcon />
                    Editar símbolo
                </li>
                <li className='delete-symbol-option' onClick={handleOpenDeleteSymbolModal}>
                    <DeleteIcon />
                    Excluir símbolo
                </li>
            </ul>
        </div>
    );
};
