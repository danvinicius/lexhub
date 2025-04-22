import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Modal } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AxiosError } from 'axios';

import { AUTH_USER, UPDATE_USER } from '../../../api';
import api from '../../../lib/axios';
import { AuthUserRequestDTO, UserContext } from '../../../context/UserContext';
import useForm from '../../../hooks/useForm';
import { useToast } from '../../../context/ToastContext';
import { ErrorResponse } from '../../../shared/interfaces';

import Button from '../../forms/button/Button';
import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import './UpdateUserForm.scss';
import DeleteUser from '../delete-user/DeleteUser';
import PasswordInput from '../../forms/input/PasswordInput';

interface UpdateUserRequestDTO {
    name: string;
    currentPassword: string | null;
    newPassword: string | null;
}

const UpdateUserForm: FC = () => {
    const { isAuthenticated, refreshUser, user } = useContext(UserContext) || {};

    const nameEdit = useForm('dontValidateName');
    const emailEdit = useForm('dontValidateEmail');

    const currentPassword = useForm('dontValidateCurrentPassword');
    const newPassword = useForm('password');
    const confirmNewPassword = useForm('password');

    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const handleOpenDeleteUserModal = () => {
        setIsDeleteUserModalOpen(true);
    };
    const handleCloseDeleteUserModal = () => setIsDeleteUserModalOpen(false);

    const { success, error } = useToast();

    useEffect(() => {
        nameEdit.setValue(isAuthenticated()?.name || '');
        emailEdit.setValue(isAuthenticated()?.email || '');
    }, []);

    const [loading, setLoading] = useState(false);

    const updateUser = async (body: UpdateUserRequestDTO) => {
        try {
            const { url, options } = UPDATE_USER(isAuthenticated()?.token || '');
            await api[options.method](url, body, options);
            refreshUser();
            success('Usuário atualizado com sucesso');
            currentPassword.setValue('');
            newPassword.setValue('');
            confirmNewPassword.setValue('');
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const authenticate = async (body: AuthUserRequestDTO) => {
        setLoading(true);
        try {
            const { url, options } = AUTH_USER();
            const response = await api[options.method](url, body);

            if (response.data.token) {
                await updateUser({
                    name: nameEdit.value,
                    currentPassword: currentPassword.value,
                    newPassword: newPassword.value || '',
                });
            }
        } catch (err) {
            const typedError = err as AxiosError<ErrorResponse>;
            error(typedError?.response?.data?.error || 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        if (newPassword.value && !currentPassword.value) {
            currentPassword.setError('Preencha sua senha atual');
            return;
        }
        if (currentPassword.value && !newPassword.value) {
            newPassword.setError('Preencha uma senha válida');
            return;
        }
        if (newPassword.value && !newPassword.validate()) {
            return;
        }
        if (newPassword.value !== confirmNewPassword.value) {
            confirmNewPassword.setError('As senhas não coincidem.');
            return;
        }
        e.preventDefault();
        if (nameEdit.validate() && user) {
            await authenticate({
                email: user.email,
                password: currentPassword.value,
            });
        }
    };

    return (
        <section className='update-user-form flex column gap-125'>
            <div className='title'>
                <h1>Informações da conta</h1>
            </div>
            <Form>
                <Input
                    type='name'
                    name='name'
                    placeholder='Seu nome'
                    label='Nome completo'
                    autoFocus
                    {...nameEdit}
                    onInput={() => {
                        nameEdit.setError('');
                    }}
                />
                <Input
                    type='email'
                    name='email'
                    placeholder='seu@email.com'
                    label='E-mail'
                    disabled={true}
                    {...emailEdit}
                    onInput={() => {
                        emailEdit.setError('');
                    }}
                />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                        <h2>Alterar senha</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Form>
                            <PasswordInput
                                placeholder='*********'
                                label='Senha atual'
                                enableForgotPassword={false}
                                {...currentPassword}
                                onInput={() => {
                                    currentPassword.setError('');
                                }}
                                error={currentPassword.error}
                            />
                            <PasswordInput
                                placeholder='*********'
                                label='Nova senha'
                                enableForgotPassword={false}
                                {...newPassword}
                                onInput={() => {
                                    newPassword.setError('');
                                }}
                                error={newPassword.error}
                            />
                            <PasswordInput
                                placeholder='*********'
                                enableForgotPassword={false}
                                label='Confirme sua nova senha'
                                {...confirmNewPassword}
                                onInput={() => {
                                    confirmNewPassword.setError('');
                                }}
                                error={confirmNewPassword.error}
                            />
                        </Form>
                    </AccordionDetails>
                </Accordion>

                <Modal
                    open={isDeleteUserModalOpen}
                    onClose={handleCloseDeleteUserModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <div>
                        <DeleteUser onClose={handleCloseDeleteUserModal} />
                    </div>
                </Modal>

                {loading ? (
                    <Loading />
                ) : (
                    <div className='flex gap-1 justify-end'>
                        <Button theme='danger' className='outline' text='Excluir conta' onClick={handleOpenDeleteUserModal} />
                        <Button theme='primary' text='Atualizar' onClick={handleSubmit} />
                    </div>
                )}
            </Form>
        </section>
    );
};

export default UpdateUserForm;
