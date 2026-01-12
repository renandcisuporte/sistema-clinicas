export interface Password {
  hashPass(password: string): string
  verifyPass(password: string, hashPass: string): boolean
}
