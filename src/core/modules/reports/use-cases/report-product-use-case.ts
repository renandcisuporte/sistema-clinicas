import { ProductsRepository } from '~/modules/products/repositories/product-repository'
import { PdfProductProps } from '../dtos/product'
import { PdfGenerator } from '../providers/pdf-generator'

type Input = {
  clinicId: string
  orderBy: string
}

type Output = Uint8Array

type Dependences = {
  repository: ProductsRepository
  pdfGenerator: PdfGenerator<PdfProductProps>
}

export const reportProductUseCase = ({
  pdfGenerator,
  repository,
}: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const { clinicId, ...rest } = input

      const limit = await repository.count({ clinicId })
      const products = await repository.all({ limit, clinicId, ...rest })

      return pdfGenerator.generate(products)
    },
  }
}
