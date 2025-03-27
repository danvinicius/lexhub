import { FC } from 'react';

import { Navbar } from '../components/navbar/Navbar';
import ResetPasswordForm from '../components/login/reset-password-form/ResetPasswordForm';
import './css/ResetPasswordView.scss';

const ResetPasswordView: FC = () => {
    return (
        <>
            <Navbar/>
            <div className="reset-password flex align-center justify-center">
                <ResetPasswordForm  />
            </div>
        </>
    );
};

export default ResetPasswordView;
