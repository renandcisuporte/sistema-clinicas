import { User } from '@prisma/client'

export type AuthInput = Pick<User, 'email' | 'password'> & {
  code: string
}

export type AuthOutput = Pick<
  User,
  'id' | 'fullName' | 'email' | 'password' | 'admin' | 'coverImage'
>

export type AuthUser = Pick<
  User,
  'id' | 'fullName' | 'email' | 'admin' | 'coverImage'
>

export type AuthToken = {
  user: AuthUser
  clinicId: string
  accessToken: string
  refreshToken: string
}
