import { UserRepository } from '~/modules/users/repositories/user-repository'
import { hashPass } from '~/shared/utils'
import { UserInput, UserOutput } from '../repositories/prisma/entity/user'

type Dependences = { repository: UserRepository }

export const createUserUseCase = ({ repository }: Dependences) => {
  return {
    async execute(
      input: UserInput & { confirmPassword: string },
    ): Promise<UserOutput> {
      const { password, confirmPassword, ...rest } = input
      const userIsExists = await repository.findByEmail(input.email)
      if (userIsExists) throw new Error(`Usuário ${input.email} já cadastrado!`)

      const passwordHash = hashPass(password)

      const user = await repository.create({
        ...rest,
        password: passwordHash,
      })
      return user
    },
  }
}
