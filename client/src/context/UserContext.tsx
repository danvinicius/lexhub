import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import { AUTH_USER, CREATE_USER } from "../api";
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
  const { data, error, loading, request, setData } = useFetch<User>();
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

  React.useEffect(() => {
    if (data) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setData(null);
      navigate("/");
      return;
    }
    const storedUser = localStorage.getItem("user") || null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [data, setUser, logged, navigate, setData]);

  return (
    <UserContext.Provider
      value={{ user, logged, login, signup, logout, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
