import { FC, FormEvent, ReactNode, useContext, useState } from 'react';
import { AxiosError } from 'axios';

import { AUTH_USER, DELETE_USER } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import { useToast } from '../../../context/ToastContext';
import { AuthUserRequestDTO, UserContext } from '../../../context/UserContext';
import useForm from '../../../hooks/useForm';

import Button from '../../forms/button/Button';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Close from '../../../assets/icon/Close_Dark.svg';
import PasswordInput from '../../forms/input/PasswordInput';
import './DeleteUser.scss';

interface DeleteUserProps {
    onClose: () => void;
}

const DeleteUser: FC<DeleteUserProps> = ({ onClose }: DeleteUserProps): ReactNode => {
    const password = useForm('dontValidatePassword');

    const { isAuthenticated, user } = useContext(UserContext) || {};
    const { error } = useToast();

    const [loading, setLoading] = useState(false);

    const deleteUser = async () => {
        if (user?.id) {
            setLoading(true);
            try {
                const { url, options } = DELETE_USER(isAuthenticated()?.token || '');
                await api[options.method](url, options);
                window.location.href = '/login'
            } catch (err) {
                const typedError = err as AxiosError<ErrorResponse>;
                error(typedError?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const authenticate = async (body: AuthUserRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = AUTH_USER();
            const response = await api[options.method](url, body);

            if (response.data.token) {
                await deleteUser();
            }
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password.validate() && user) {
            await authenticate({
                email: user.email,
                password: password.value,
            });
        }
    };

    return (
        <section className='delete-user flex column gap-125'>
            <div className='delete-scenario-header'>
                <h2>Tem certeza que deseja excluir sua conta?</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form style={{ gap: '.5rem' }}>
                <p>Por motivos de segurança, para excluir sua conta insira sua senha:</p>
                <PasswordInput
                    placeholder='*********'
                    enableForgotPassword={false}
                    {...password}
                    onInput={() => {
                        password.setError('');
                    }}
                    error={password.error}
                />
                {loading ? <Loading /> : <Button theme='danger' text='Excluir' onClick={handleSubmit} />}
            </Form>
        </section>
    );
};

export default DeleteUser;
