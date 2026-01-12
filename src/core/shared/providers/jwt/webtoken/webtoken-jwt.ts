import { sign, verify } from 'jsonwebtoken'
import { JwtToken } from '../jwt'

export const webTokenJwt: JwtToken = {
  hashJwt(input: any, expiresIn = 7200) {
    return sign(input, process.env.NEXT_PUBLIC_SECRET!, { expiresIn })
  },

  verifyJwt(input: any): any {
    return verify(input, process.env.NEXT_PUBLIC_SECRET!)
  },
}
