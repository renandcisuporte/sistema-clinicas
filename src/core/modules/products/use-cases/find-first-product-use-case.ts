import { OutputProduct } from '../dtos/output-product'
import { ProductsRepository } from '../repositories/product-repository'

type Output = { data: OutputProduct | null }

type Dependences = { repository: ProductsRepository }

export const findFirstProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string): Promise<Output> {
      const result = await repository.first(id)

      return {
        data: result,
      }
    },
  }
}
