import { Hasher, HashComparer } from '@/protocols'

import bcrypt from 'bcryptjs'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (text: string): Promise<string> {
    return bcrypt.hash(text, this.salt)
  }

  async compare (text: string, actual: string): Promise<boolean> {
    return bcrypt.compare(text, actual)
  }
}
