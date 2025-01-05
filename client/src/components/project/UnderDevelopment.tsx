import { ReactNode } from 'react';
import './UnderDevelopment.scss';
import { Navbar } from '../navbar/Navbar';

export const UnderDevelopment = (): ReactNode => {
    return (
        <>
            <Navbar />
            <div className='under-development'>
                <span>&#9888;</span>
                <p>
                    Esta página está em desenvolvimento. <br />
                    Aguarde mais um pouco.
                </p>
            </div>
        </>
    );
};
