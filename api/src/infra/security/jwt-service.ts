import jwt from 'jsonwebtoken';

export class JwtService {
  constructor(private readonly secret: string) {}

  async encrypt(text: string): Promise<string> {
    return jwt.sign({ id: text }, this.secret);
  }

  async decrypt(ciphertext: string): Promise<object> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
