import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { ILexiconScenario } from '../../../shared/interfaces';
import { FC } from 'react';
import { useLexicon } from '../../../hooks/useLexicon';
import ErrorIcon from '@mui/icons-material/Error';

interface ExceptionsListProps {
    exceptions: ILexiconScenario['exceptions'];
    isColaborador: boolean;
    handleOpenExceptionsModal: () => void;
}

const ExceptionsList: FC<ExceptionsListProps> = ({ exceptions, isColaborador, handleOpenExceptionsModal }: ExceptionsListProps) => {
    const { processContent } = useLexicon();
    return (
        <div className='flex column gap-5 flex-1'>
            <div className='flex gap-1 align-center'>
                <div className='flex gap-5 border-none'>
                    <ErrorIcon />
                    <h3>Exceções</h3>
                </div>
                <div className='scenario-exceptions flex column gap-1'>
                    {isColaborador && (
                        <span className='add-exceptions pointer flex align-center gap-5' onClick={handleOpenExceptionsModal}>
                            {exceptions.length > 0 ? <small>Gerenciar exceções</small> : <small>Cadastrar exceções</small>}
                        </span>
                    )}
                </div>
            </div>
            <div className='scenario-exceptions flex align-center'>
                {exceptions?.length ? (
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableBody>
                                {exceptions?.map((exception) => {
                                    return (
                                        <TableRow key={exception.description.content}>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                sx={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem', border: 'none', fontSize: 16 }}
                                            >
                                                <ErrorOutlineOutlinedIcon />
                                                <p>{processContent(exception.description)}</p>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <small className='empty'>Nenhuma exceção cadastrada</small>
                )}
            </div>
        </div>
    );
};

export default ExceptionsList;
