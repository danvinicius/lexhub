import { useContext, useState, useEffect, useRef } from 'react';

import { UserContext } from '../../../context/UserContext';
import { IUser } from '../../../shared/interfaces';

import { ProfilePicture } from '../../user/profile-picture/ProfilePicture';
import { LogoutButton } from '../../login/buttons/LogoutButton';
import './AuthMenu.scss';

export const AuthMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useContext(UserContext);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="auth-menu" ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="pointer">
                <ProfilePicture user={isAuthenticated() as unknown as IUser} />
            </div>
            {isOpen && (
                <section className="flex column">
                    <div className="flex gap-75 user-info">
                        <ProfilePicture user={isAuthenticated() as unknown as IUser} />
                        <div className="flex column gap-25">
                            <b>{isAuthenticated()?.name}</b>
                            <p className='email'>{isAuthenticated()?.email}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <LogoutButton />
                    </div>
                </section>
            )}
        </div>
    );
};
