import { IUserRole } from "@/models";

export const isColaborador = (role: IUserRole) => {
  return [IUserRole.COLABORADOR, IUserRole.ADMINISTRADOR, IUserRole.PROPRIETARIO].includes(
    role
  );
};

export const isAdministrador = (role: IUserRole) => {
  return [IUserRole.ADMINISTRADOR, IUserRole.PROPRIETARIO].includes(role);
};

export const isProprietario = (role: IUserRole) => {
  return role === IUserRole.PROPRIETARIO;
};
