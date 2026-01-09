import { ServiceInProductsRepository } from '~/modules/services-in-products/repositories/service-in-product-repository'
import { UpdateServiceInProduct } from '../dtos/update-service-in-product'

type Dependences = { repository: ServiceInProductsRepository }

export const updateServiceInProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(
      id: string,
      input: UpdateServiceInProduct,
    ): Promise<{ data: string }> {
      await repository.update(id, input)

      return { data: 'ok' }
    },
  }
}
