import { FC } from 'react';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { ILexiconScenario } from '../../../shared/interfaces';
import { useLexicon } from '../../../hooks/useLexicon';

interface ActorsListProps {
    actors: ILexiconScenario['actors'];
    isColaborador: boolean;
    handleOpenActorsModal: () => void;
}

const ActorsList: FC<ActorsListProps> = ({ actors, isColaborador, handleOpenActorsModal }: ActorsListProps) => {
    const { processContent } = useLexicon();
    return (
        <div className='flex column gap-5 flex-1'>
            <div className='flex gap-1 align-center'>
                <div className='flex gap-5 border-none'>
                    <PeopleAltIcon />
                    <h3>Atores</h3>
                </div>
                <div className='scenario-actors flex column gap-1'>
                    {isColaborador && (
                        <span className='add-actors pointer flex align-center gap-5' onClick={handleOpenActorsModal}>
                            {actors.length > 0 ? <small>Gerenciar atores</small> : <small>Cadastrar atores</small>}
                        </span>
                    )}
                </div>
            </div>
            <div className='scenario-actors flex align-center'>
                {actors?.length ? (
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableBody>
                                {actors?.map((actor) => {
                                    return (
                                        <TableRow key={actor.name.content}>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                sx={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem', border: 'none', fontSize: 16 }}
                                            >
                                                <PersonOutlineOutlinedIcon />
                                                <p>{processContent(actor.name)}</p>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <small className='empty'>Nenhum ator cadastrado</small>
                )}
            </div>
        </div>
    );
};

export default ActorsList;
