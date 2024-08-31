import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserProject } from "../shared/interfaces";
import api from "../lib/axios";
import { GET_ME } from "../api";
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
  projects: any;
}

type User = {
  name: string;
  email: string;
  token: string;
  projects: IUserProject[];
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  isAuthenticated: () => any;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserStorageProps = {
  children: ReactNode;
};

export const UserStorage = ({ children }: UserStorageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  const isAuthenticated = useCallback(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      return {}
    }
    return JSON.parse(user);
  }, []);

  const location = useLocation();

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const autoLogin = useCallback(async () => {
    if (!isAuthenticated) {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        try {
          const token = JSON.parse(storedData)?.token || "";
          const { url, options } = GET_ME(token);
          const response = await api[options.method](url, options);
          setUser(response.data);
        } catch (error: any) {
          console.log(error?.response.data.error)
        }
      } else {
        logout();
      }
    }
  }, [isAuthenticated, logout]);


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (location.pathname == '/login') navigate("/");
      return;
    }
  }, [navigate, user, location]);

  useEffect(() => {
    if (!isAuthenticated) {
      autoLogin();
    } else {
      setUser(isAuthenticated())
    }
  }, [autoLogin, isAuthenticated, user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, isAuthenticated}}
    >
      {children}
    </UserContext.Provider>
  );
};
