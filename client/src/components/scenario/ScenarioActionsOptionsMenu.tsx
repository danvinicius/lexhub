import EditPen from '../../assets/icon/Edit.svg';
import Bin from '../../assets/icon/Bin_Empty.svg';
import './ScenarioActionsOptionsMenu.scss';
import { FC, ReactNode, useEffect, useRef } from 'react';

interface ScenarioActionsOptionsMenuProps {
    isScenarioActionsOptionsMenuOpen: boolean;
    setIsScenarioActionsOptionsMenuOpen:  Dispatch<SetStateAction<boolean>>;
  handleOpenUpdateScenarioModal: () => void;
  handleCloseUpdateScenarioModal: () => void;
  handleOpenDeleteScenarioModal: () => void;
}

export const ScenarioActionsOptionsMenu: FC<ScenarioActionsOptionsMenuProps> = ({
	handleOpenUpdateScenarioModal,
	handleCloseUpdateScenarioModal,
	setIsScenarioActionsOptionsMenuOpen,
	isScenarioActionsOptionsMenuOpen,
	handleOpenDeleteScenarioModal,
}: ScenarioActionsOptionsMenuProps): ReactNode => {
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Verifica se o clique foi fora do popup
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				setIsScenarioActionsOptionsMenuOpen(false); // Fecha o popup
			}
		};
  
		// Adiciona o event listener quando o popup estiver aberto
		if (isScenarioActionsOptionsMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
  
		// Remove o event listener quando o popup fecha
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleCloseUpdateScenarioModal, isScenarioActionsOptionsMenuOpen, setIsScenarioActionsOptionsMenuOpen]);
  
	if (!isScenarioActionsOptionsMenuOpen) return null;

	return (
		<div className="scenario-actions-options-menu" ref={popupRef}>
			<ul>
				<li onClick={handleOpenUpdateScenarioModal} key='update-scenario'>
					<img src={EditPen} alt="Editar cenário" />
          Editar cenário
				</li>
				<li className="delete-scenario" onClick={handleOpenDeleteScenarioModal}>
					<img src={Bin} alt="Excluir cenário" key='delete-scenario'/>
          Excluir cenário
				</li>
			</ul>
		</div>
	);
};
