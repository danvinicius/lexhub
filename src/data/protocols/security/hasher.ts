export interface Hasher {
  hash: (text: string) => Promise<string>
}
