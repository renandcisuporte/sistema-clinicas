import { OutputServiceInProduct } from '~/modules/services-in-products/dtos/output-service-in-product'
import { ServiceInProductsRepository } from '~/modules/services-in-products/repositories/service-in-product-repository'

type Output = {
  data: OutputServiceInProduct | null
}

type Dependences = { repository: ServiceInProductsRepository }

export const findFirstServiceInProductUseCase = ({
  repository,
}: Dependences) => {
  return {
    async execute(id: string): Promise<Output> {
      const result = await repository.first(id)

      return {
        data: result ?? null,
      }
    },
  }
}
