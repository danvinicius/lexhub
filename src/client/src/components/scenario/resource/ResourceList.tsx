import { FC } from 'react';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, List, ListItemText, ListItem } from '@mui/material';

import { ILexiconScenario } from '../../../shared/interfaces';
import { useLexicon } from '../../../hooks/useLexicon';
import { StyledTableCell } from '../../../shared/table';

import EditIcon from '../../helper/icons/EditIcon';
import DeleteIcon from '../../helper/icons/DeleteIcon';
import './ResourceList.scss';

interface ResourcesListProps {
    resources: ILexiconScenario['resources'];
    isColaborador: boolean;
    handleOpenResourceModal: (resourceId?: string) => void;
    resetScenarioInfo: () => void;
    scenario: ILexiconScenario;
    handleOpenDeleteResourceModal: (resourceId: string) => void;
}

const ResourcesList: FC<ResourcesListProps> = ({
    resources,
    isColaborador = false,
    handleOpenResourceModal,
    handleOpenDeleteResourceModal,
}: ResourcesListProps) => {
    const { processContent } = useLexicon();

    return (
        <div className='scenario-resources flex column gap-1'>
            <div className='flex gap-1 align-center'>
                <div className='flex gap-5 border-none'>
                    <HomeRepairServiceIcon />
                    <h3>Recursos</h3>
                </div>
                <div className='scenario-resources flex column gap-1'>
                    {isColaborador && (
                        <span className='add-resource pointer flex align-center gap-5' onClick={() => handleOpenResourceModal()}>
                            <small>Cadastrar recurso</small>
                        </span>
                    )}
                </div>
            </div>
            {resources.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ width: '50%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <BuildOutlinedIcon />
                                        Recurso
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '50%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <LockOutlinedIcon />
                                        Restrições
                                    </div>
                                </StyledTableCell>
                                {isColaborador && <StyledTableCell style={{ width: '100px', textAlign: 'center' }}></StyledTableCell>}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {resources?.map((resource) => (
                                <TableRow key={resource.name.content}>
                                    <StyledTableCell>{processContent(resource.name)}</StyledTableCell>
                                    <StyledTableCell>
                                        <div className='flex column'>
                                            {!resource.restrictions?.length ? (
                                                <small className='empty'>Nenhuma restrição cadastrada</small>
                                            ) : (
                                                <List>
                                                    {resource.restrictions?.map((restriction) => (
                                                        <ListItem disablePadding key={restriction.id}>
                                                            <ListItemText primary={processContent(restriction.description)} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            )}
                                        </div>
                                    </StyledTableCell>
                                    {isColaborador && (
                                        <StyledTableCell style={{ width: '10px', textAlign: 'center' }}>
                                            <div className='flex gap-2'>
                                                <EditIcon
                                                    onClick={() => {
                                                        handleOpenResourceModal(resource.id);
                                                    }}
                                                />
                                                <DeleteIcon
                                                    onClick={() => {
                                                        handleOpenDeleteResourceModal(resource.id);
                                                    }}
                                                />
                                            </div>
                                        </StyledTableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ResourcesList;
