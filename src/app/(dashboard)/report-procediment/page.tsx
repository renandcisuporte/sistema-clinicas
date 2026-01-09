import { getUser } from '@/libs/session'
import { notFound } from 'next/navigation'
import { prismaServiceInProductRepository } from '~/modules/services-in-products/repositories/prisma/repository/service-in-product-repository'
import { prismaServiceRepository } from '~/modules/services/repositories/prisma/repository/service-repository'
import { findAllServiceUseCase } from '~/modules/services/use-cases/find-all-service-use-case'
import { PageClient } from './page-client'

export type Service = {
  id: string
  name: string
}

export default async function Page() {
  const session = await getUser()
  if (!session) notFound()

  const useCase = findAllServiceUseCase({
    repository: prismaServiceRepository,
    serviceInProduct: prismaServiceInProductRepository,
  })

  const result = await useCase.execute({
    clinicId: session.clinicId,
    limit: '1000',
  })

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Relatório de Procedimentos</h1>
      <PageClient data={result.data} />
    </div>
  )
}
