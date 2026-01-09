import { ServiceInProductsRepository } from '~/modules/services-in-products/repositories/service-in-product-repository'
import { OutputService } from '../dtos/output-service'
import { PaginatedService } from '../dtos/paginated-service'
import { ServicesRepository } from '../repositories/service-repository'

type Output = PaginatedService

type Dependences = {
  repository: ServicesRepository
  serviceInProduct: ServiceInProductsRepository
}

export const findAllServiceUseCase = ({
  repository,
  serviceInProduct,
}: Dependences) => {
  return {
    async execute(args: any): Promise<Output> {
      const { clinicId, name = '', limit, page } = args

      const common = {
        clinicId,
        name,
        limit,
        page,
      }

      const [total, data] = await Promise.all([
        repository.count({ clinicId, name }),
        repository.all(common),
      ])

      const dataOutup: OutputService[] = []
      for (const item of data) {
        const total = await serviceInProduct.count({
          clinicId: item.clinicId,
          serviceId: item.id,
        })
        dataOutup.push({
          ...item,
          total: total,
        })
      }

      return {
        total,
        data: dataOutup,
      }
    },
  }
}
