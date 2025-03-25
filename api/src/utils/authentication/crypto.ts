import { createCipheriv, createDecipheriv } from 'crypto';

const base64UrlEncode = (input: Buffer) => {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64UrlDecode = (input: string): any => {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64');
};

export class CryptoUtil {
  private static readonly algorithm: string = 'aes-128-cbc' as any;
  private static readonly iv = Buffer.alloc(16, 0) as any;

  static encrypt(data: string): string {
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY?.slice(0, 16) || 'default_secret_16', 'utf-8') as any;
    const cipher = createCipheriv(this.algorithm, key, this.iv);
    const bufferConcated = [cipher.update(data, 'utf8'), cipher.final()] as any;
    const encrypted = Buffer.concat(bufferConcated);
    return base64UrlEncode(encrypted);
  }

  static decrypt(encryptedText: string): string {
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY?.slice(0, 16) || 'default_secret_16', 'utf-8') as any;
    const decipher = createDecipheriv(this.algorithm, key, this.iv);
    const bufferConcated = [decipher.update(base64UrlDecode(encryptedText)), decipher.final()] as any;
    const decryptedBuffer = Buffer.concat(bufferConcated);
    return decryptedBuffer.toString('utf8');
  }
}
