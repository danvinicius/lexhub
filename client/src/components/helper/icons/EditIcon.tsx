import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

interface EditIconProps {
    onClick?: () => void;
}

const EditIcon = ({ onClick }: EditIconProps) => {
    return <ModeEditOutlinedIcon color='primary' className='pointer' onClick={onClick} />;
};

export default EditIcon;
