import EditPen from "../../assets/icon/Edit.svg";
import Bin from "../../assets/icon/Bin_Empty.svg";
import "./ProjectActionsOptionsMenu.scss";
import { useEffect, useRef } from "react";

interface ProjectActionsOptionsMenuProps {
    isProjectActionsOptionsMenu: boolean;
    setIsProjectActionsOptionsMenu:  React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenEditProjectModal: () => void;
  handleCloseEditProjectModal: () => void;
  handleOpenDeleteProjectModal: () => void;
}

export const ProjectActionsOptionsMenu = ({
  handleOpenEditProjectModal,
  handleCloseEditProjectModal,
  setIsProjectActionsOptionsMenu,
  isProjectActionsOptionsMenu,
  handleOpenDeleteProjectModal,
}: ProjectActionsOptionsMenuProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Verifica se o clique foi fora do popup
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsProjectActionsOptionsMenu(false); // Fecha o popup
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
    }, [handleCloseEditProjectModal, isProjectActionsOptionsMenu, setIsProjectActionsOptionsMenu]);
  
    if (!isProjectActionsOptionsMenu) return null;

  return (
    <div className="project-actions-options-menu" ref={popupRef}>
      <ul>
        <li onClick={handleOpenEditProjectModal} key='edit-project'>
          <img src={EditPen} alt="Editar projeto" />
          Editar projeto
        </li>
        <li className="delete-project" onClick={handleOpenDeleteProjectModal}>
          <img src={Bin} alt="Excluir projeto" key='delete-project'/>
          Excluir projeto
        </li>
      </ul>
    </div>
  );
};
