import { priceFormatted } from '~/shared/utils'
import { CreateProduct } from '../dtos/create-product'
import { OutputProduct } from '../dtos/output-product'
import { ProductsRepository } from '../repositories/product-repository'

type Input = CreateProduct

type Output = { data: OutputProduct }

type Dependences = { repository: ProductsRepository }

export const createProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const { price, ...rest } = input

      const result = await repository.create({
        ...rest,
        price: priceFormatted(price),
      })

      return { data: result }
    },
  }
}
