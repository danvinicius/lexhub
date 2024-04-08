import { Encrypter, Decrypter } from '@/protocols';

import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(text: string): Promise<string> {
    return jwt.sign({ id: text }, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
