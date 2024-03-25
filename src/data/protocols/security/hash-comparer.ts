export interface HashComparer {
  compare: (hash: string, current: string) => Promise<boolean>
}
