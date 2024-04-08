export interface HashComparer {
  compare: (hash: string, actual: string) => Promise<boolean>
}
