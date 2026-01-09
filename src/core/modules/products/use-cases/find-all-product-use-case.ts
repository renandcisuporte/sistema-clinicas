import { OutputProduct } from '../dtos/output-product'
import { ProductsRepository } from '../repositories/product-repository'

type Output = {
  total: number
  data: OutputProduct[]
}

type Dependences = {
  repository: ProductsRepository
}

export const findAllProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(args: any): Promise<Output> {
      const { clinicId, name = '', nameAsc, limit, page } = args

      const common = {
        clinicId,
        name,
        nameAsc,
        limit,
        page,
      }

      const [total, data] = await Promise.all([
        repository.count({ clinicId, name }),
        repository.all(common),
      ])

      return {
        total,
        data,
      }
    },
  }
}
