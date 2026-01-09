import { ServiceInProductsRepository } from '~/modules/services-in-products/repositories/service-in-product-repository'

type Dependences = { repository: ServiceInProductsRepository }

export const deleteServiceInProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute({ id }: { id: string }): Promise<void> {
      await repository.delete(id)
    },
  }
}
