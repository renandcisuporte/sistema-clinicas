import { priceFormatted } from '~/shared/utils'
import { OutputProduct } from '../dtos/output-product'
import { UpdateProduct } from '../dtos/update-product'
import { ProductsRepository } from '../repositories/product-repository'

type Input = UpdateProduct

type Output = { data: OutputProduct }

type Dependences = { repository: ProductsRepository }

export const updateProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(id: string, input: Input): Promise<Output> {
      const { price, ...rest } = input

      const result = await repository.update(id, {
        ...rest,
        price: priceFormatted(price),
      })

      return { data: result }
    },
  }
}
