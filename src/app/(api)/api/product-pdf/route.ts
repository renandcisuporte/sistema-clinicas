import { getUser } from '@/libs/session'
import { getParam } from '@/libs/utils'
import { NextRequest } from 'next/server'
import { prismaProductRepository } from '~/modules/products/repositories/prisma/repository/product-repository'
import { jspdfProduct } from '~/modules/reports/providers/jspdf/jspdf-product'
import { reportProductUseCase } from '~/modules/reports/use-cases/report-product-use-case'

export async function GET(request: NextRequest) {
  try {
    const session = await getUser()
    if (!session) throw new Error('Não autorizado')

    const query = request.nextUrl.searchParams

    const orderBy = getParam(query, 'orderBy') ?? 'nameDesc'

    const useCase = reportProductUseCase({
      pdfGenerator: jspdfProduct,
      repository: prismaProductRepository,
    })

    const response = await useCase.execute({
      clinicId: session.clinicId,
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
