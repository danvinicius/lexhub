import { FC, FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import { FORGOT_PASSWORD } from '../../../api';
import api from '../../../lib/axios';
import { ForgotPasswordDTO } from '../../../context/UserContext';
import useForm from '../../../hooks/useForm';
import { ErrorResponse } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Error from '../../helper/Error';
import './ForgotPasswordForm.scss';

interface ForgotPasswordProps {
    setCurrentScreen: (screen: string) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ setCurrentScreen }: ForgotPasswordProps) => {
    const email = useForm('dontValidateEmail');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (body: ForgotPasswordDTO) => {
        setLoading(true);
        try {
            const { url, options } = FORGOT_PASSWORD();
            const { data } = await api[options.method](url, body);
            if (data.success) {
                toast.success('E-mail enviado com sucesso! Verifique sua caixa de entrada.');
                setSuccess(true);
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
        if (email.validate()) {
            forgotPassword({ email: email.value });
        }
    };

    return (
        <section className='forgot-password-form flex column gap-125'>
            <div className='title'>
                <h1>Esqueceu sua senha?</h1>
                <p className='reset-instructions'>
                    Não se preocupe, iremos lhe enviar instruções para recuperação de sua senha.
                    <br />
                    Ou&nbsp;
                    <span onClick={() => setCurrentScreen('login')} className='pointer'>
                        volte para o login.
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
                        setError('');
                    }}
                />
                {loading ? (
                    <Loading />
                ) : success ? (
                    <ToastContainer />
                ) : (
                    <Button theme='primary' text='Enviar e-mail' onClick={handleSubmit} />
                )}

                <Error error={error} />
            </Form>
        </section>
    );
};

export default ForgotPassword;
