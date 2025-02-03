import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface DeleteIconProps {
    onClick?: () => void;
}

const DeleteIcon = ({ onClick }: DeleteIconProps) => {
    return <DeleteOutlineOutlinedIcon color='error' className='pointer' onClick={onClick} />;
};

export default DeleteIcon;
