import EditPen from "../../assets/icon/Edit.svg";
import Bin from "../../assets/icon/Bin_Empty.svg";
import "./SymbolActionsOptionsMenu.scss";
import { useEffect, useRef } from "react";

interface SymbolActionsOptionsMenuProps {
    isSymbolActionsOptionsMenuOpen: boolean;
    setIsSymbolActionsOptionsMenuOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenEditSymbolModal: () => void;
  handleCloseEditSymbolModal: () => void;
  handleOpenDeleteSymbolModal: () => void;
}

export const SymbolActionsOptionsMenu = ({
  handleOpenEditSymbolModal,
  handleCloseEditSymbolModal,
  setIsSymbolActionsOptionsMenuOpen,
  isSymbolActionsOptionsMenuOpen,
  handleOpenDeleteSymbolModal,
}: SymbolActionsOptionsMenuProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Verifica se o clique foi fora do popup
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsSymbolActionsOptionsMenuOpen(false); // Fecha o popup
        }
      };
  
      // Adiciona o event listener quando o popup estiver aberto
      if (isSymbolActionsOptionsMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      // Remove o event listener quando o popup fecha
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleCloseEditSymbolModal, isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen]);
  
    if (!isSymbolActionsOptionsMenuOpen) return null;

  return (
    <div className="symbol-actions-options-menu" ref={popupRef}>
      <ul>
        <li onClick={handleOpenEditSymbolModal} key='edit-symbol'>
          <img src={EditPen} alt="Editar símbolo" />
          Editar símbolo
        </li>
        <li className="delete-symbol" onClick={handleOpenDeleteSymbolModal}>
          <img src={Bin} alt="Excluir símbolo" key='delete-symbol'/>
          Excluir símbolo
        </li>
      </ul>
    </div>
  );
};
