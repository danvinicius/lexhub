import { FC } from 'react';
import { List, ListItem, ListItemText, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { ILexiconRestriction, ILexiconScenario } from '../../../shared/interfaces';
import { useLexicon } from '../../../hooks/useLexicon';
import { StyledTableCell } from '../../../shared/table';

interface ContextProps {
    context: ILexiconScenario['context'];
    isColaborador: boolean;
    handleOpenContextModal: () => void;
}

const Context: FC<ContextProps> = ({ context, isColaborador, handleOpenContextModal }: ContextProps) => {
    const { processContent } = useLexicon();

    return (
        <div className='flex column gap-1'>
            <div className='flex gap-1 align-center'>
                <div className='flex gap-5 border-none'>
                    <LanguageIcon />
                    <h3>Contexto</h3>
                </div>
                <div className='scenario-context flex column gap-1'>
                    {isColaborador && (
                        <span className='add-context pointer flex align-center gap-5' onClick={handleOpenContextModal}>
                            <small>Gerenciar contexto</small>
                        </span>
                    )}
                </div>
            </div>
            <div className='scenario-context'>
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ width: '25%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <CheckBoxOutlinedIcon />
                                        Pré-condição
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '25%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <LocationOnOutlinedIcon />
                                        Localização geográfica
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '25%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <AccessTimeOutlinedIcon />
                                        Localização temporal
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{ width: '25%' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem' }}>
                                        <LockOutlinedIcon />
                                        Restrições
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell>
                                    {context?.preCondition.content ? (
                                        processContent(context?.preCondition)
                                    ) : (
                                        <small className='empty'>Nenhuma pré-condição cadastrada</small>
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {context?.geographicLocation?.content ? (
                                        processContent(context?.geographicLocation)
                                    ) : (
                                        <small className='empty'>Nenhuma localização geográfica cadastrada</small>
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {context?.temporalLocation?.content ? (
                                        processContent(context?.temporalLocation)
                                    ) : (
                                        <small className='empty'>Nenhuma localização temporal cadastrada</small>
                                    )}
                                </StyledTableCell>
                                <StyledTableCell className='restrictions'>
                                    {context.restrictions.length > 0 ? (
                                        <List>
                                            {context?.restrictions?.map((restriction: ILexiconRestriction) => {
                                                return (
                                                    <ListItem disablePadding>
                                                        <ListItemText primary={processContent(restriction.description)} />
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    ) : <small className='empty'>Nenhuma restrição cadastrada</small> }
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Context;
