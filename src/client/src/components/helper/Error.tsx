import { FC, ReactNode } from 'react';
interface ErrorProps {
    error?: string | null;
}

const Error: FC<ErrorProps> = ({ error }: ErrorProps): ReactNode => {
	return error && <p className="error">{error}</p>;
};


export default Error;