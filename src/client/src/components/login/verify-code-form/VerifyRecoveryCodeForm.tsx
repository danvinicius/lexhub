import { FC, FormEvent, useState, useRef, KeyboardEvent, useEffect } from 'react';
import { AxiosError } from 'axios';

import { VERIFY_RECOVERY_CODE } from '../../../api';
import api from '../../../lib/axios';
import { VerifyRecoveryCodeDTO } from '../../../context/UserContext';
import { ErrorResponse } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import './VerifyRecoveryCodeForm.scss';
import { useToast } from '../../../context/ToastContext';

interface RecoveryCodeProps {
    email: string;
    setCurrentScreen: (screen: string) => void;
    setVerifyToken: (token: string) => void;
}

const VerifyRecoveryCodeForm: FC<RecoveryCodeProps> = ({ email, setCurrentScreen, setVerifyToken }: RecoveryCodeProps) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const { success, error } = useToast();
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const verifyCode = async (body: VerifyRecoveryCodeDTO) => {
        setLoading(true);
        try {
            const { url, options } = VERIFY_RECOVERY_CODE();
            const { data } = await api[options.method](url, body);
            if (data?.verifyToken) {
                success('Código verificado com sucesso!');
                setVerifyToken(data.verifyToken);
                setCurrentScreen('reset-password');
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
        const completeCode = code.join('');
        if (completeCode.length === 6) {
            verifyCode({ email, recoveryCode: completeCode });
        } else {
            error('Por favor, preencha todos os dígitos do código');
        }
    };

    const handleInputChange = (index: number, value: string) => {
        if (/^[A-Za-z0-9]$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value.toUpperCase();
            setCode(newCode);

            if (value && index === 5) {
                const allFilled = newCode.every((digit) => digit !== '');
                if (allFilled) {
                    const completeCode = newCode.join('');
                    verifyCode({ email, recoveryCode: completeCode });
                }
            }
            else if (value && index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim().substring(0, 6);

        if (/^[A-Za-z0-9]{1,6}$/.test(pastedData)) {
            const newCode = [...code];
            for (let i = 0; i < pastedData.length; i++) {
                newCode[i] = pastedData[i].toUpperCase();
            }
            setCode(newCode);

            if (pastedData.length === 6) {
                verifyCode({ email, recoveryCode: newCode.join('') });
            }
            else {
                const focusIndex = Math.min(pastedData.length, 5);
                inputRefs.current[focusIndex]?.focus();
            }
        }
    };

    return (
        <section className='verify-recovery-code-form flex column gap-125'>
            <div className='title'>
                <h1>Verificação de código</h1>
                <p className='reset-instructions'>
                    Insira o código de 6 dígitos que enviamos para seu e-mail.
                    <br />
                    Ou&nbsp;
                    <span onClick={() => setCurrentScreen('forgot-password')} className='action pointer'>
                        solicite um novo código.
                    </span>
                </p>
            </div>
            <Form>
                <div className='code-input-container'>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type='text'
                            maxLength={1}
                            className='code-input'
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            autoComplete='off'
                            aria-label={`Dígito ${index + 1} do código de recuperação`}
                            disabled={loading}
                        />
                    ))}
                </div>

                {loading ? <Loading /> : <Button theme='primary' text='Verificar código' onClick={handleSubmit} />}
            </Form>
        </section>
    );
};

export default VerifyRecoveryCodeForm;
