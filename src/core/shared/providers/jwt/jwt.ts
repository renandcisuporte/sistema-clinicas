export interface JwtToken {
  hashJwt(input: string | object, expiresIn: number): string
  verifyJwt(input: string): string | object
}
