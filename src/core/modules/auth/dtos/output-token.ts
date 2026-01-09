import { OutputAuthUser } from './output-auth-user'

export type OutputAuthToken = {
  user: OutputAuthUser
  clinicId: string
  accessToken: string
  refreshToken: string
}
