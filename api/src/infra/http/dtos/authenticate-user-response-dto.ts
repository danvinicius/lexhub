export class AuthenticateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  token: string;
  projects: object;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.token = data.token;
    this.projects = data.projects;
  }
}
