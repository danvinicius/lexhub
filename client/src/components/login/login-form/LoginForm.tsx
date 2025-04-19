import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { AUTH_USER, VALIDATE_USER } from '../../../api';
import api from '../../../lib/axios';
import { ErrorResponse } from '../../../shared/interfaces';
import useForm from '../../../hooks/useForm';
import { useToast } from '../../../context/ToastContext';
import { AuthUserRequestDTO, UserContext, ValidateUserRequestDTO } from '../../../context/UserContext';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import PasswordInput from '../../forms/input/PasswordInput';
import Loading from '../../helper/Loading';
import './LoginForm.scss';
interface LoginFormProps {
    setCurrentScreen: (screen: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ setCurrentScreen }: LoginFormProps) => {
    const email = useForm('email');
    const password = useForm('dontValidatePassword');

    const { success, error } = useToast();

    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext) || {};

    const login = async (body: AuthUserRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = AUTH_USER();
            const response = await api[options.method](url, body);
            if (setUser) setUser(response.data);
            success('Usuário logado com sucesso');
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const validateUser = async (body: ValidateUserRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = VALIDATE_USER();
            const response = await api[options.method](url, body);
            if (response.data?.success) {
                success('Usuário validado com sucesso. Faça login.');
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
        if (email.validate() && password.validate()) {
            login({ email: email.value, password: password.value });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const verifyToken = params.get('verifyToken');
    
        if (verifyToken) {
            validateUser({ verifyToken });
        }
    }, [])

    return (
        <section className='login-form flex column gap-125'>
            <div className='title flex column gap-5'>
                <h1>Login</h1>
                <p className='signup'>
                    Ainda não possui uma conta? &nbsp;
                    <span onClick={() => setCurrentScreen('signup')} className='action pointer'>
                        Se inscreva.
                    </span>
                </p>
            </div>
            <Form>
                <Input
                    type='email'
                    name='email'
                    placeholder='seu@email.com'
                    label='E-mail'
                    autoFocus
                    {...email}
                    onInput={() => {
                        email.setError('');
                    }}
                />
                <PasswordInput
                    placeholder='*********'
                    label='Senha'
                    setCurrentScreen={setCurrentScreen}
                    enableForgotPassword={true}
                    {...password}
                    onInput={() => {
                        password.setError('');
                    }}
                />
                {loading ? <Loading /> : <Button theme='primary' text='Entrar' onClick={handleSubmit} />}
            </Form>
        </section>
    );
};

export default LoginForm;
