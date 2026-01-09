import { getUser } from '@/libs/session'
import { getParam } from '@/libs/utils'
import { NextRequest } from 'next/server'
import { jspdfProcediment } from '~/modules/reports/providers/jspdf/jspdf-procediment'
import { reportProcedimentUseCase } from '~/modules/reports/use-cases/report-precediment-use-case'
import { prismaServiceInProductRepository } from '~/modules/services-in-products/repositories/prisma/repository/service-in-product-repository'

export async function GET(request: NextRequest) {
  try {
    const session = await getUser()
    if (!session) throw new Error('Não autorizado')

    const query = request.nextUrl.searchParams

    const orderBy = getParam(query, 'orderBy') ?? 'nameDesc'
    const serviceId = getParam(query, 'serviceId')

    const useCase = reportProcedimentUseCase({
      pdfGenerator: jspdfProcediment,
      repository: prismaServiceInProductRepository,
    })

    const response = await useCase.execute({
      clinicId: session.clinicId,
      serviceId,
      orderBy,
    })

    return new Response(new Uint8Array(response), {
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ message: (err as Error)?.message }, null, 2),
      { status: 500 },
    )
  }
}
