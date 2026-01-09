import { getUser } from '@/libs/session'
import { getParam } from '@/libs/utils'
import { NextRequest } from 'next/server'
import { prismaRealeseRepository } from '~/modules/realeses/repositories/prisma/repository/prisma-realese-repository'
import { jspdfExpense } from '~/modules/reports/providers/jspdf/jspdf-expense'
import { reportExpenseUseCase } from '~/modules/reports/use-cases/report-expense-use-case'

export async function GET(request: NextRequest) {
  try {
    const session = await getUser()
    if (!session) throw new Error('Não autorizado')

    const query = request.nextUrl.searchParams

    const orderBy = getParam(query, 'orderBy') ?? 'nameDesc'
    const type = getParam(query, 'type') as 'fixed' | 'variable' | ''
    const expenseId = getParam(query, 'expenseId')
    const dateStart = getParam(query, 'dateStart')
    const dateEnd = getParam(query, 'dateEnd')

    const useCase = reportExpenseUseCase({
      repository: prismaRealeseRepository,
      pdfGenerator: jspdfExpense,
    })

    const response = await useCase.execute({
      clinicId: session.clinicId,
      type,
      expenseId,
      dateStart,
      dateEnd,
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
