import { ServiceInProductsRepository } from '~/modules/services-in-products/repositories/service-in-product-repository'
import { PdfProcedimentProps } from '../dtos/procediment'
import { PdfGenerator } from '../providers/pdf-generator'

type Input = {
  clinicId: string
  serviceId?: string
  orderBy: string
}

type Output = Uint8Array

type Dependences = {
  repository: ServiceInProductsRepository
  pdfGenerator: PdfGenerator<PdfProcedimentProps>
}

export const reportProcedimentUseCase = ({
  pdfGenerator,
  repository,
}: Dependences) => {
  return {
    async execute(input: Input): Promise<Output> {
      const { clinicId, ...rest } = input

      const limit = await repository.count({ clinicId })
      const products = await repository.all({ limit, clinicId, ...rest })

      const direction = rest.orderBy === 'nameAsc' ? -1 : 0

      if (direction !== 0) {
        products.sort((a, b) => {
          const serviceCompare =
            a.serviceName.localeCompare(b.serviceName) * direction

          if (serviceCompare !== 0) return serviceCompare

          return a.productName.localeCompare(b.productName) * direction
        })
      }

      const filteredProducts = rest.serviceId
        ? products.filter((p) => p.serviceId === rest.serviceId)
        : products

      return pdfGenerator.generate(filteredProducts)
    },
  }
}
