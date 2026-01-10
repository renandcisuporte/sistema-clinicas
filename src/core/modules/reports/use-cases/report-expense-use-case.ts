import { RealeseRepository } from '~/modules/realeses/repositories/realese-repository'
import { PdfExpenseProps } from '../dtos/expense'
import { PdfGenerator } from '../providers/pdf-generator'

type Input = {
  type: 'fixed' | 'variable' | ''
  clinicId: string
  orderBy: string
  expenseId?: string
  dateStart?: string
  dateEnd?: string
}

type Output = Uint8Array

type Dependences = {
  repository: RealeseRepository
  pdfGenerator: PdfGenerator<PdfExpenseProps>
}

export const reportExpenseUseCase = ({
  repository,
  pdfGenerator,
}: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const { clinicId, expenseId, ...rest } = input

      const limit = await repository.count({
        ...rest,
        clinicId,
        expenseId,
      })
      const response = await repository.all({
        ...rest,
        limit,
        clinicId,
        expenseId,
      })

      // const formatDate = (date: string) =>
      //   date.split('-').reverse().join('/')

      const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('pt-BR')

      const company = expenseId
        ? response.find((item) => item.expenseId === expenseId)?.description
        : undefined

      const payload: string[] = [
        ...(rest.type ? [`Tipo: ${rest.type}`] : []),
        ...(rest.dateStart
          ? [`Data Inicial: ${formatDate(rest.dateStart)}`]
          : []),
        ...(rest.dateEnd ? [`Data Final: ${formatDate(rest.dateEnd)}`] : []),
        ...(company ? [`Empresa: ${company}`] : []),
      ]

      return pdfGenerator.generate(response, payload)
    },
  }
}
