import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { Password } from '../password'

export const bcryptPassword: Password = {
  hashPass(password: string): string {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
  },
  verifyPass(password: string, hashPass: string): boolean {
    return compareSync(password, hashPass)
  },
}
