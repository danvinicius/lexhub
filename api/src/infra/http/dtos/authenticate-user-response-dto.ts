export class AuthenticateUserResponseDTO {
  name: string;
  email: string;
  token: string;
  projects: object;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.token = data.token;
    this.projects = data.projects;
  }
}
