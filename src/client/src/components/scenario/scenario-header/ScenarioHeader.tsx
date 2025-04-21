import { Dispatch, SetStateAction } from 'react';

import { useLexicon } from '../../../hooks/useLexicon';
import { ILexiconScenario } from '../../../shared/interfaces';

import { ScenarioActionsOptionsMenu } from '../scenario-actions-options-menu/ScenarioActionsOptionsMenu';
import KebabVertical from '../../../assets/icon/Kebab_Vertical.svg';

interface ScenarioHeaderProps {
    title: ILexiconScenario['title'];
    isColaborador: boolean;
    handleOpenActionsOptionsMenu: () => void;
    isActionsOptionsMenuOpen: boolean;
    handleOpenScenarioModal: () => void;
    handleCloseScenarioModal: () => void;
    setIsActionsOptionsMenuOpen: Dispatch<SetStateAction<boolean>>;
    handleOpenDeleteScenarioModal: () => void;
}

const ScenarioHeader = ({
    title,
    isColaborador,
    handleOpenActionsOptionsMenu,
    isActionsOptionsMenuOpen,
    setIsActionsOptionsMenuOpen,
    handleOpenScenarioModal,
    handleOpenDeleteScenarioModal,
    handleCloseScenarioModal,
}: ScenarioHeaderProps) => {
    const { processContent } = useLexicon();
    return (
        <div className='scenario-header'>
            <h2>{processContent(title)}</h2>
            {isColaborador && (
                <>
                    <img
                        src={KebabVertical}
                        alt=''
                        className='scenario-options-button absolute pointer'
                        onClick={handleOpenActionsOptionsMenu}
                    />
                    <div className='scenario-options'>
                        {isActionsOptionsMenuOpen && (
                            <ScenarioActionsOptionsMenu
                                handleOpenScenarioModal={handleOpenScenarioModal}
                                handleCloseScenarioModal={handleCloseScenarioModal}
                                setIsActionsOptionsMenuOpen={setIsActionsOptionsMenuOpen}
                                isActionsOptionsMenuOpen={isActionsOptionsMenuOpen}
                                handleOpenDeleteScenarioModal={handleOpenDeleteScenarioModal}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ScenarioHeader;
