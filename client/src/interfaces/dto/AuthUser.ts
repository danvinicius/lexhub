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
