import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorResponse, IUserRole } from '../shared/interfaces';
import api from '../lib/axios';
import { GET_ME } from '../api';
import { AxiosError } from 'axios';
export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthUserRequestDTO {
  email: string;
  password: string;
}

export interface AuthUserResponseDTO {
  name: string;
  email: string;
  token: string;
  projects: {
    project: string;
    role: IUserRole
  }[];
}

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  projects: {
    project: string;
    role: IUserRole
  }[];
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  isAuthenticated: () => User | null;
  refreshUser: () => Promise<void | null>
};

export const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => null,
	logout: () => null,
	isAuthenticated: () => null,
	refreshUser: async () => null
});

type UserStorageProps = {
  children: ReactNode;
};

export const UserStorage: FC<UserStorageProps> = ({ children }: UserStorageProps): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
  
	const isAuthenticated = useCallback(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			return null;
		}
		return JSON.parse(user) as User;
	}, []);

	const location = useLocation();

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('user');
		navigate('/login');
	}, [navigate]);

	const autoLogin = useCallback(async () => {
		
		if (!isAuthenticated()?.token) {
			const storedData = localStorage.getItem('user');
			if (storedData) {
				try {
					const token = JSON.parse(storedData)?.token || '';
					const { url, options } = GET_ME(token);
					const response = await api[options.method](url, options);
					setUser(response.data);
				} catch (error) {
					const err = error as AxiosError<ErrorResponse>;
					console.log(err?.response?.data?.error || 'Erro inesperado');
				}
			}
		}
	}, [isAuthenticated, logout]);

	const refreshUser = useCallback(async () => {
		const token = isAuthenticated()?.token;
		if (token) {
			try {
				const { url, options } = GET_ME(token);
				const response = await api[options.method](url, options);
				setUser(response.data);
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				console.log(err?.response?.data?.error || 'Erro inesperado');
				logout();
			}
		}
	}, [isAuthenticated]);


	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			if (location.pathname == '/login') navigate('/');
			return;
		}
	}, [navigate, user, location]);

	useEffect(() => {
		if (!isAuthenticated()?.token) {
			autoLogin();
		}
	}, [autoLogin, isAuthenticated]);

	return (
		<UserContext.Provider
			value={{ user, setUser, logout, isAuthenticated, refreshUser}}
		>
			{children}
		</UserContext.Provider>
	);
};
