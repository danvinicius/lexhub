import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import { AUTH_USER, CREATE_USER, GET_ME } from "../api";
import { AuthUserRequestDTO } from "../interfaces/dto/AuthUser";
import { useNavigate } from "react-router-dom";
import { UserProject } from "../interfaces/Project";
import { CreateUserRequestDTO } from "../interfaces/dto/CreateUser";

type User = {
  name: string;
  email: string;
  token: string;
  projects: UserProject[];
};

type UserContextType = {
  user: User | null;
  logged: boolean;
  login: (formData: AuthUserRequestDTO) => void;
  signup: (formData: CreateUserRequestDTO) => void;
  logout: () => void;
  error: any;
  loading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserStorageProps = {
  children: ReactNode;
};

export const UserStorage = ({ children }: UserStorageProps) => {
  const { data, error, loading, request, setData, setError } = useFetch<User>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logged = useMemo(() => !!user?.token, [user]);

  const login = useCallback(
    (formData: AuthUserRequestDTO) => {
      const { url, options } = AUTH_USER(formData);
      request(url, options);
    },
    [request]
  );

  const signup = useCallback(
    (formData: CreateUserRequestDTO) => {
      const { url, options } = CREATE_USER(formData);
      request(url, options);
    },
    [request]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const autoLogin = useCallback(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const token = JSON.parse(storedData)?.token || "";
      const { url, options } = GET_ME(token);
      request(url, options);
    } else {
      logout();
    }
    setError(null)
  }, [logout, request, setError]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setData(null);
      navigate("/");
      return;
    }
  }, [data, setUser, logged, navigate, setData, request, logout, autoLogin]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <UserContext.Provider
      value={{ user, logged, login, signup, logout, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
