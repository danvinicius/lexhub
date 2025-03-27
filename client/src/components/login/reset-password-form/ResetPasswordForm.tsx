import { FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { RESET_PASSWORD } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import useForm from '../../../hooks/useForm';
import { useCrypto } from '../../../hooks/useCrypto';
import { ResetPasswordRequestDTO } from '../../../context/UserContext';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import PasswordInput from '../../forms/input/PasswordInput';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import './ResetPasswordForm.scss';

const ResetPasswordForm: FC = () => {
    const email = useForm('dontValidateEmail');
    const password = useForm('dontValidatePassword');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { decrypt } = useCrypto();
	
    const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

    const resetPassword = async (body: ResetPasswordRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = RESET_PASSWORD();
            const { data } = await api[options.method](url, body);
            if (data.success) {
				window.location.href = '/login'
			}
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password.validate() && token) {
            resetPassword({ password: password.value, token });
        }
    };

    useEffect(() => {
        const fetchDecryptedToken = async () => {
			if (!token) return window.location.href = '/login'
            if (token) {
                try {
                    const decrypted = await decrypt(token);
                    if (decrypted) {
                        const [userEmail] = decrypted.split(':');
                        email.setValue(userEmail);
                    }
                } catch (error) {
                    console.error('Erro ao descriptografar o token:', error);
					window.location.href = '/login'
                }
            }
        };

        fetchDecryptedToken();
    }, [searchParams, email]);

    return (
        <section className='reset-password-form flex column gap-125'>
            <div className='title flex column gap-5'>
                <h1>Redefina sua senha</h1>
            </div>
            <Form>
                <Input
                    type='email'
                    name='email'
                    placeholder='seu@email.com'
                    label='E-mail'
                    disabled
                    autoFocus
                    {...email}
                    onInput={() => {
                        setError('');
                    }}
                />
                <PasswordInput
                    placeholder='*********'
                    label='Senha'
                    enableForgotPassword={false}
                    {...password}
                    onInput={() => {
                        setError('');
                    }}
                />
                {loading ? <Loading /> : <Button theme='primary' text='Entrar' onClick={handleSubmit} />}
                <Error error={error} />
            </Form>
        </section>
    );
};

export default ResetPasswordForm;
