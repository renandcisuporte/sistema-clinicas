import { InputAuth } from '~/modules/auth/dtos/input-auth'
import { OutputAuthToken } from '~/modules/auth/dtos/output-token'
import { AuthRepository } from '~/modules/auth/repositories/auth-repository'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { hashJwt, verifyPass } from '~/shared/utils'

type Output = { data: OutputAuthToken }

type Input = InputAuth

type Dependencies = {
  authRepo: AuthRepository
  clinicRepo: ClinicRepository
}

export const authUseCase = ({ authRepo, clinicRepo }: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const result = await authRepo.findByEmail(input.email)
      if (!result) throw new Error('Usuário não autorizado!')

      if (!verifyPass(input.password, result.password))
        throw new Error('Usuário não autorizado!!')

      const clinic = await clinicRepo.findByCode(input.code)
      if (!clinic && input.code !== '000-000')
        throw new Error('Clínica não encontrada!!!')

      if (clinic && input.code !== '000-000') input.code = clinic

      const { password, ...user } = result

      return {
        data: {
          user,
          clinicId: input.code,
          accessToken: hashJwt({ clinicId: input.code, user }, 1200),
          refreshToken: hashJwt({ clinicId: input.code, user }, 7200),
        },
      }
    },
  }
}
