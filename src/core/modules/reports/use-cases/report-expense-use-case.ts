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
      const { clinicId, ...rest } = input

      const limit = await repository.count({ clinicId })
      const response = await repository.all({ limit, clinicId, ...rest })

      // const formatDate = (date: string) =>
      //   date.split('-').reverse().join('/')

      const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('pt-BR')

      const company = input.expenseId
        ? response.find((item) => item.expenseId === input.expenseId)
            ?.description
        : undefined

      const payload: string[] = [
        ...(input.type ? [`Tipo: ${input.type}`] : []),
        ...(input.dateStart
          ? [`Data Inicial: ${formatDate(input.dateStart)}`]
          : []),
        ...(input.dateEnd ? [`Data Final: ${formatDate(input.dateEnd)}`] : []),
        ...(company ? [`Empresa: ${company}`] : []),
      ]

      return pdfGenerator.generate(response, payload)
    },
  }
}
