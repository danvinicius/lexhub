import { CSSProperties, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';

import { useLexicon } from '../../../hooks/useLexicon';
import { UserContext } from '../../../context/UserContext';
import { ProjectContext } from '../../../context/ProjectContext';
import { IUserRole, ILexiconSymbol } from '../../../shared/interfaces';

import KebabVertical from '../../../assets/icon/Kebab_Vertical.svg';
import { SymbolActionsOptionsMenu } from '../symbol-actions-options-menu/SymbolActionsOptionsMenu';
import DeleteSymbolForm from '../delete-symbol/DeleteSymbol';
import SymbolForm from '../symbol-form/SymbolForm';
import './SymbolDetails.scss';

interface SymbolDetailsProps {
    symbol?: ILexiconSymbol;
    style?: CSSProperties;
    resetProjectInfo?: () => void;
    withOptions?: boolean;
}

const SymbolDetails: FC<SymbolDetailsProps> = ({ symbol, style, resetProjectInfo, withOptions = true }: SymbolDetailsProps): ReactNode => {
    const { isAuthenticated } = useContext(UserContext) || {};
    const [isColaborador, setIsColaborador] = useState(false);
    const { project } = useContext(ProjectContext);
    const { processContent } = useLexicon();

    const resetSymbolInfo = () => {
        if (!resetProjectInfo) {
            window.location.href = `/projeto/${project?.id}`;
            return;
        }
        resetProjectInfo();
        closeAllModals();
    };

    const closeAllModals = () => {
        handleCloseDeleteSymbolModal();
        handleCloseUpdateSymbolModal();
    };

    useEffect(() => {
        const role = isAuthenticated()?.projects.find((someProject) => someProject.project == project?.id)?.role;
        setIsColaborador(role == IUserRole.PROPRIETARIO || role == IUserRole.ADMINISTRADOR || role == IUserRole.COLABORADOR);
    }, [isAuthenticated, project?.id]);

    const [isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen] = useState(false);
    const [isUpdateSymbolModalOpen, setIsUpdateSymbolModalOpen] = useState(false);
    const [isDeleteSymbolModalOpen, setIsDeleteSymbolModalOpen] = useState(false);
    const handleOpenUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(true);
    const handleCloseUpdateSymbolModal = () => setIsUpdateSymbolModalOpen(false);
    const handleOpenDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(true);
    const handleCloseDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(false);
    return (
        <>
            {symbol && (
                <div className='symbol-details' style={style}>
                    <div className='symbol-details-notion'>
                        <div className='classification'>
                            <p>{symbol?.classification}</p>
                        </div>
                        <div className='symbol-name'>
                            <h3>{symbol?.name}</h3>
                            {isColaborador && withOptions && (
                                <>
                                    <img
                                        src={KebabVertical}
                                        alt=''
                                        className='symbol-options-button'
                                        onClick={() => setIsSymbolActionsOptionsMenuOpen(true)}
                                    />
                                    <div className='symbol-options'>
                                        {isSymbolActionsOptionsMenuOpen && (
                                            <SymbolActionsOptionsMenu
                                                handleOpenUpdateSymbolModal={handleOpenUpdateSymbolModal}
                                                handleCloseUpdateSymbolModal={handleCloseUpdateSymbolModal}
                                                setIsSymbolActionsOptionsMenuOpen={setIsSymbolActionsOptionsMenuOpen}
                                                isSymbolActionsOptionsMenuOpen={isSymbolActionsOptionsMenuOpen}
                                                handleOpenDeleteSymbolModal={handleOpenDeleteSymbolModal}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <p className='notion'>{processContent(symbol?.notion)}</p>
                    </div>
                    <div className='symbol-details-synonyms'>
                        <h4>Sinônimos</h4>
                        {symbol?.synonyms?.length ? (
                            <ul>
                                {symbol.synonyms?.map((synonym) => {
                                    return <li key={synonym.name.content}>{processContent(synonym.name)}</li>;
                                })}
                            </ul>
                        ) : (
                            <small className='empty'>Ainda não há sinônimos cadastrados nesse símbolo</small>
                        )}
                    </div>
                    <div className='symbol-details-impacts'>
                        <h4>Impactos</h4>
                        {symbol?.impacts?.length ? (
                            <ul>
                                {symbol.impacts?.map((impact) => {
                                    return <li key={impact.description.content}>{processContent(impact.description)}</li>;
                                })}
                            </ul>
                        ) : (
                            <small className='empty'>Ainda não há impactos cadastrados nesse símbolo</small>
                        )}
                    </div>
                    <Modal
                        open={isUpdateSymbolModalOpen}
                        onClose={handleCloseUpdateSymbolModal}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <SymbolForm
                            onClose={handleCloseUpdateSymbolModal}
                            symbol={symbol ? symbol : ({} as ILexiconSymbol)}
                            resetInfo={resetSymbolInfo}
                        />
                    </Modal>
                    <Modal
                        open={isDeleteSymbolModalOpen}
                        onClose={handleCloseDeleteSymbolModal}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <DeleteSymbolForm
                            onClose={handleCloseDeleteSymbolModal}
                            symbol={symbol ? symbol : ({} as ILexiconSymbol)}
                            resetSymbolInfo={resetSymbolInfo}
                            projectId={symbol?.projectId || ''}
                        />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default SymbolDetails;
