import { FC, FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { RESET_PASSWORD } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import useForm from '../../../hooks/useForm';
import { ResetPasswordRequestDTO } from '../../../context/UserContext';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import PasswordInput from '../../forms/input/PasswordInput';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import './ResetPasswordForm.scss';

interface ResetPasswordFormProps {
    verifyToken: string;
    email: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ verifyToken, email }: ResetPasswordFormProps) => {
    const formEmail = useForm('dontValidateEmail');
    const password = useForm('password');
    const confirmPassword = useForm('password');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const resetPassword = async (body: ResetPasswordRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = RESET_PASSWORD();
            const { data } = await api[options.method](url, body);
            if (data.success) {
                window.location.href = '/login';
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
        if (password.value !== confirmPassword.value) {
            confirmPassword.setError('As senhas não coincidem.');
            return;
        }
        if (password.validate()  && verifyToken) {
            resetPassword({ password: password.value, verifyToken });
        }
    };

    useEffect(() => {
        if (email) formEmail.setValue(email);
    }, []);

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
                    {...formEmail}
                    onInput={() => {
                        setError('');
                    }}
                />
                <PasswordInput
                    placeholder='*********'
                    label='Nova senha'
                    enableForgotPassword={false}
                    {...password}
                    onInput={() => {
                        setError('');
                    }}
                />
                <PasswordInput
                    placeholder='*********'
                    label='Confirme sua nova senha'
                    enableForgotPassword={false}
                    {...confirmPassword}
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
