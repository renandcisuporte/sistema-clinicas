import { priceFormatted } from '~/shared/utils'
import { ServiceInProductsRepository } from '../repositories/service-in-product-repository'

type Input = {
  clinicId: string
  serviceId: string
  productId: string
  rental: string
  rentalPrice: string
}

type Dependences = { repository: ServiceInProductsRepository }

export const createServiceInProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(input: Input[]): Promise<{ data: string }> {
      for (const rows in input) {
        const { serviceId, productId, clinicId, rental, rentalPrice } =
          input[rows]

        if (productId) {
          await repository.upsave({
            clinicId,
            serviceId,
            productId,
            rental: +rental,
            rentalPrice: priceFormatted(`${rentalPrice}`),
          })
        }
      }

      return { data: 'ok' }
    },
  }
}
