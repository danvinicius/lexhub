export interface Decrypter {
  decrypt: (text: string) => Promise<string>
}
