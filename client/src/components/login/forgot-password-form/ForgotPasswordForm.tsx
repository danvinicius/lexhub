import { FC, FormEvent, useState } from 'react';
import { AxiosError } from 'axios';

import { FORGOT_PASSWORD } from '../../../api';
import api from '../../../lib/axios';
import { ForgotPasswordDTO } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import useForm from '../../../hooks/useForm';
import { ErrorResponse } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import './ForgotPasswordForm.scss';

interface ForgotPasswordProps {
    setCurrentScreen: (screen: string) => void;
    setEmail: (token: string) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ setCurrentScreen, setEmail }: ForgotPasswordProps) => {
    const email = useForm('email');

    const { success, error } = useToast();
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (body: ForgotPasswordDTO) => {
        setLoading(true);
        try {
            const { url, options } = FORGOT_PASSWORD();
            const { data } = await api[options.method](url, body);
            if (data?.success) {
                success('E-mail enviado com sucesso! Verifique sua caixa de entrada.');
                setEmail(email.value);
                setCurrentScreen('verify-recovery-code');
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
                    <span onClick={() => setCurrentScreen('login')} className='action pointer'>
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
                        email.setError('');
                    }}
                />
                {loading ? <Loading /> : <Button theme='primary' text='Enviar e-mail' onClick={handleSubmit} />}
            </Form>
        </section>
    );
};

export default ForgotPassword;
