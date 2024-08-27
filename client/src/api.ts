import { AuthUserRequestDTO } from "./interfaces/dto/AuthUser";
import { CreateUserRequestDTO } from "./interfaces/dto/CreateUser";

export const API_URL = "http://localhost:3000/api";

export const CREATE_USER = (body: CreateUserRequestDTO) => {
  return {
    url: `${API_URL}/user/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const AUTH_USER = (body: AuthUserRequestDTO) => {
  return {
    url: `${API_URL}/user/auth`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const GET_ME = (token: string) => {
  return {
    url: `${API_URL}/user/me`,
    options: {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  };
};
