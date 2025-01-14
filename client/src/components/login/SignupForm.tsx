import { FC, FormEvent, useContext, useState } from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './LoginForm.scss';
import { CreateUserRequestDTO, UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { CREATE_USER } from '../../api';
import api from '../../lib/axios';
import useForm from '../../hooks/useForm';
import Error from '../helper/Error';
import { ErrorResponse } from '../../shared/interfaces';
import { AxiosError } from 'axios';

interface LoginFormProps {
    setCurrentScreen: (screen: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ setCurrentScreen }: LoginFormProps) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext) || {};

    const name = useForm();
    const email = useForm('email');
    const password = useForm('password');

    const signup = async (body: CreateUserRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = CREATE_USER();
            const response = await api[options.method](url, body);
            if (setUser) setUser(response.data);
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            setError(err?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (email.validate() && password.validate()) {
            signup({ name: name.value, email: email.value, password: password.value });
        }
    };

    return (
        <section className='signup-form flex column gap-125'>
            <div className='flex column gap-5'>
                <h1>Se inscreva</h1>
                <p className='signup'>
                    Já possui uma conta? &nbsp;
                    <span onClick={() => setCurrentScreen('login')} className='action pointer blue'>
                        Faça login
                    </span>
                </p>
            </div>
            <Form>
                <Input
                    type='name'
                    name='name'
                    placeholder='Seu nome'
                    label='Nome completo'
                    autoFocus
                    {...name}
                    onInput={() => {
                        setError('');
                    }}
                />
                <Input
                    type='email'
                    name='email'
                    placeholder='seu@email.com'
                    label='E-mail'
                    {...email}
                    onInput={() => {
                        setError('');
                    }}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='***********'
                    label='Senha'
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

export default LoginForm;
