import { UserRole } from "@/models";

export const isCollaborator = (role: UserRole) => {
  return [UserRole.COLLABORATOR, UserRole.ADMIN, UserRole.OWNER].includes(
    role
  );
};

export const isAdmin = (role: UserRole) => {
  return [UserRole.ADMIN, UserRole.OWNER].includes(role);
};

export const isOwner = (role: UserRole) => {
  return role === UserRole.OWNER;
};
