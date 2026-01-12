'use server'

import { destroySession, saveSession } from '@/libs/session'
import { InputAuth } from '~/modules/auth/dtos/input-auth'
import { prismaAuthRepository } from '~/modules/auth/repositories/prisma/repository/prisma-auth-repository'
import { authUseCase } from '~/modules/auth/use-cases/auth-use-case'
import { prismaClinicRepository } from '~/modules/clinics/repositories/prisma/repository/prisma-clinic-repository'
import { webTokenJwt } from '~/shared/providers/jwt/webtoken/webtoken-jwt'
import { bcryptPassword } from '~/shared/providers/password/bcrypt/bcrypt-password'

export async function authAction(input: InputAuth) {
  try {
    const useCase = authUseCase({
      authRepo: prismaAuthRepository,
      clinicRepo: prismaClinicRepository,
      providerJwt: webTokenJwt,
      providerPass: bcryptPassword,
    })
    const { data } = await useCase.execute({
      email: input.email,
      password: input.password,
      code: input.code,
    })

    await saveSession(data.accessToken)
  } catch (error) {
    console.log('[AUTH ACTION] Error: ', error)
    throw error
  }
}

export async function logoutAction() {
  await destroySession()
}
