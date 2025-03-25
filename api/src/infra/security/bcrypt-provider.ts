import bcrypt from 'bcryptjs';

export class BcryptProvider {
  constructor(private readonly salt: number) {}

  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.salt);
  }

  async compare(text: string, actual: string): Promise<boolean> {
    return bcrypt.compare(text, actual);
  }
}
