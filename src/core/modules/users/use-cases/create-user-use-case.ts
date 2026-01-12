import { UserRepository } from '~/modules/users/repositories/user-repository'
import { Password } from '~/shared/providers/password/password'
import { UserInput, UserOutput } from '../repositories/prisma/entity/user'

type Dependences = { repository: UserRepository; provider: Password }

export const createUserUseCase = ({ repository, provider }: Dependences) => {
  return {
    async execute(
      input: UserInput & { confirmPassword: string },
    ): Promise<UserOutput> {
      const { password, confirmPassword, ...rest } = input
      const userIsExists = await repository.findByEmail(input.email)
      if (userIsExists) throw new Error(`Usuário ${input.email} já cadastrado!`)

      const passwordHash = provider.hashPass(password)

      const user = await repository.create({
        ...rest,
        password: passwordHash,
      })
      return user
    },
  }
}
