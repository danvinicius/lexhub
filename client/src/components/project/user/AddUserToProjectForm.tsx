import { FC, FormEvent, ReactNode, SyntheticEvent, useContext, useState } from 'react';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/button/Button';
import Error from '../../helper/Error';
import api from '../../../lib/axios';
import { ADD_USER_TO_PROJECT, CHANGE_USER_ROLE, REMOVE_USER } from '../../../api';
import { UserContext } from '../../../context/UserContext';
import './AddUserToProjectForm.scss';
import Select from '../../forms/select/Select';
import Close from '../../../assets/icon/Close_Dark.svg';
import { ProjectContext } from '../../../context/ProjectContext';
import { AddUserEmailComboBox } from './AddUserEmailComboBox';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import { ErrorResponse, IUserProject, IUserRole } from '../../../shared/interfaces';
import { AxiosError } from 'axios';
import { ProfilePicture } from '../../user/profile-picture/ProfilePicture';
import CloseIcon from '@mui/icons-material/Close';
import { AddUserRequestDTO, UserRoleRequestDTO, RemoveUserRequestDTO } from '../../../shared/dto';

interface AddUserToProjectFormProps {
    onClose: () => void;
    resetProjectInfo: () => void;
}

const AddUserToProjectForm: FC<AddUserToProjectFormProps> = ({ onClose, resetProjectInfo }: AddUserToProjectFormProps): ReactNode => {
    const { isAuthenticated } = useContext(UserContext || {});

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [currentEmail, setCurrentEmail] = useState('');
    const [usersToRemove, setUsersToRemove] = useState<string[]>([]);


    const handleCloseSnackbar = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const [emails, setEmails] = useState<string[]>([]);
    const [roles, setRoles] = useState<Record<string, string>>({});

    const projectContext = useContext(ProjectContext);

    const addUserToProject = async (body: AddUserRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id) {
            try {
                const { url, options } = ADD_USER_TO_PROJECT(projectContext.project.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetProjectInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const changeUserRole = async (body: UserRoleRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id) {
            try {
                const { url, options } = CHANGE_USER_ROLE(projectContext.project.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetProjectInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    const removeUser = async (body: RemoveUserRequestDTO) => {
        setLoading(true);
        if (projectContext.project?.id) {
            try {
                const { url, options } = REMOVE_USER(projectContext.project.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetProjectInfo();
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>;
                setError(err?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    function copyCurrentUrlToClipboard() {
        const currentUrl = window.location.href;

        // Verifica se a API Clipboard está disponível
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(currentUrl)
                .then(() => {
                    setOpenSnackbar(true);
                })
                .catch((err) => {
                    console.error('Falha ao copiar a URL:', err);
                });
        } else {
            // Método de fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            textArea.style.position = 'fixed'; // Evita que o textarea afete o layout da página
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setOpenSnackbar(true);
            } catch (err) {
                console.error('Falha ao copiar a URL:', err);
            }
            document.body.removeChild(textArea);
        }
    }

    const handleRemoveUser = (userId: string) => {
        setUsersToRemove((prev) => [...prev, userId]);
        if (projectContext.project) {
            const updatedUsers = projectContext.project.users.filter((user) => user.user.id !== userId);
            projectContext.project = { ...projectContext.project, users: updatedUsers };
        }
    };
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (projectContext.project?.id) {
            if (emails.length) {
                for (const email of [...emails, currentEmail.trim().length ? currentEmail : null].filter((email) => email != null)) {
                    addUserToProject({
                        email,
                        role: roles[email],
                        projectId: projectContext.project.id,
                    });
                }
            }
            for (const changedRoleEmail of Object.keys(roles)) {
                const currentUser = projectContext.project.users.find((user) => user.user.email == changedRoleEmail);
                if (roles[changedRoleEmail] !== currentUser?.role) {
                    if (currentUser?.user.id) {
                        changeUserRole({
                            userId: currentUser?.user.id,
                            projectId: projectContext.project.id,
                            newRole: roles[changedRoleEmail],
                        });
                    }
                }
            }
            for (const userId of usersToRemove) {
                await removeUser({
                    userId,
                    projectId: projectContext.project.id,
                });
            }
        }
    };

    return (
        <section className='add-user-form flex column gap-125'>
            <div className='add-user-form-header'>
                <h2>Compartilhe &quot;{projectContext.project?.name}&quot; com outros usuários</h2>
                <img src={Close} alt="Ícone 'X' popup" title="Ícone 'X' popup" onClick={onClose} />
            </div>
            <Form>
                <AddUserEmailComboBox emails={emails} setEmails={setEmails} setCurrentEmail={setCurrentEmail} />

                {[...emails, currentEmail.trim().length ? currentEmail : null].filter((email) => email != null).length > 0 && (
                    <div className='pessoas-convidadas'>
                        <h3>Compartilhar com:</h3>
                        <br />
                        <ul className='flex column gap-5' style={{ maxHeight: '10rem', overflow: 'auto' }}>
                            {[...emails, currentEmail.trim().length ? currentEmail : null]
                                .filter((email) => email != null)
                                .map((email) => {
                                    return (
                                        <li key={email} className='flex space-between align-center'>
                                            <span>{email}</span>
                                            <Select
                                                style={{ padding: '0.5rem' }}
                                                defaultOption='Selecione uma função'
                                                name='role'
                                                options={[
                                                    {
                                                        value: 'Observador',
                                                        label: 'Observador',
                                                    },
                                                    {
                                                        value: 'Colaborador',
                                                        label: 'Colaborador',
                                                    },
                                                    {
                                                        value: 'Administrador',
                                                        label: 'Administrador',
                                                    },
                                                ]}
                                                value={roles[email] || ''}
                                                onChange={(e) => setRoles({ ...roles, [email]: e.target.value })}
                                            ></Select>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}

                {emails.length > 0 && <hr />}

                <div className='pessoas-com-acesso'>
                    <h3>Pessoas com acesso:</h3>
                    <br />
                    <ul className='flex column gap-15' style={{ maxHeight: '10rem'}}>
                        {projectContext.project?.users.map((user: IUserProject) => {
                            return (
                                <li key={user.id} className='flex align-center gap-1'>
                                    <ProfilePicture user={user.user} />
                                    <div className='flex column' style={{ marginRight: 'auto' }}>
                                        <span>
                                            {user.user.name} {user.user.email == isAuthenticated()?.email && '(você)'}
                                        </span>
                                        <small>{user.user.email}</small>
                                    </div>
                                    {user.role !== IUserRole.PROPRIETARIO && user.user.email !== isAuthenticated()?.email && (
                                        <div>
                                            <Select
                                                style={{ padding: '0.5rem' }}
                                                defaultOption={user.role}
                                                name='role'
                                                options={[
                                                    {
                                                        value: 'Observador',
                                                        label: 'Observador',
                                                    },
                                                    {
                                                        value: 'Colaborador',
                                                        label: 'Colaborador',
                                                    },
                                                    {
                                                        value: 'Administrador',
                                                        label: 'Administrador',
                                                    },
                                                ]}
                                                value={roles[user.user.email] || ''}
                                                onChange={(e) => setRoles({ ...roles, [user.user.email]: e.target.value })}
                                            ></Select>
                                        </div>
                                    )}
                                    {user.role !== IUserRole.PROPRIETARIO && user.user.email !== isAuthenticated()?.email && user.user.id && (
                                        <CloseIcon className='pointer' onClick={() => handleRemoveUser(user.user.id)}/>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <br />

                {loading ? (
                    <Loading />
                ) : (
                    <div className='flex space-between'>
                        <Button theme='helper' text='Copiar link' onClick={copyCurrentUrlToClipboard} />
                        <Button theme='primary' text='Salvar e compartilhar' onClick={handleSubmit} />
                    </div>
                )}
                <Error error={error} />
            </Form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleCloseSnackbar}
                message='Link copiado para a área de transferência'
            />
        </section>
    );
};

export default AddUserToProjectForm;
