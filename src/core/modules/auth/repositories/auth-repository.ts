import { OutputAuth } from '~/modules/auth/dtos/output-auth'
import { OutputAuthUser } from '~/modules/auth/dtos/output-auth-user'

export interface AuthRepository {
  findById(id: string): Promise<OutputAuthUser | null>
  findByEmail(email: string): Promise<OutputAuth | null>
}
