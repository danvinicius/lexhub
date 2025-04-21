import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps): ReactNode => {
	const { isAuthenticated } = useContext(UserContext) || {};
	return isAuthenticated()?.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
