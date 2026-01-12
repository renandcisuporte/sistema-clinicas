import { InputAuth } from '~/modules/auth/dtos/input-auth'
import { OutputAuthToken } from '~/modules/auth/dtos/output-token'
import { AuthRepository } from '~/modules/auth/repositories/auth-repository'
import { ClinicRepository } from '~/modules/clinics/repositories/clinic-repository'
import { JwtToken } from '~/shared/providers/jwt/jwt'
import { Password } from '~/shared/providers/password/password'

type Output = { data: OutputAuthToken }

type Input = InputAuth

type Dependencies = {
  authRepo: AuthRepository
  clinicRepo: ClinicRepository
  providerPass: Password
  providerJwt: JwtToken
}

export const authUseCase = ({
  authRepo,
  clinicRepo,
  providerJwt,
  providerPass,
}: Dependencies) => {
  return {
    async execute(input: Input): Promise<Output> {
      const result = await authRepo.findByEmail(input.email)
      if (!result) throw new Error('Usuário não autorizado!')

      const verifyPass = providerPass.verifyPass(
        input.password,
        result.password,
      )
      if (!verifyPass) throw new Error('Usuário não autorizado!!')

      const clinic = await clinicRepo.findByCode(input.code)
      if (!clinic && input.code !== '000-000')
        throw new Error('Clínica não encontrada!!!')

      if (clinic && input.code !== '000-000') input.code = clinic

      const { password, ...user } = result

      const accessToken = providerJwt.hashJwt(
        { clinicId: input.code, user },
        1200,
      )
      const refreshToken = providerJwt.hashJwt(
        { clinicId: input.code, user },
        7200,
      )

      return {
        data: {
          user,
          clinicId: input.code,
          accessToken,
          refreshToken,
        },
      }
    },
  }
}
