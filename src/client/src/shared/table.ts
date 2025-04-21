import { styled, TableCell, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 16,
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[200],
        color: 'var(--primary-text-color)',
        fontWeight: 'bold',
    },
}));
