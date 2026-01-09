import { ServiceInProductsRepository } from '../repositories/service-in-product-repository'

type Output = {
  data: any[]
}

type Dependences = { repository: ServiceInProductsRepository }

export const findAllServiceInProductUseCase = ({ repository }: Dependences) => {
  return {
    async execute(args: any): Promise<Output> {
      const { clinicId, serviceId } = args
      const result = await repository.allService(clinicId, serviceId)

      if (!result) return { data: [] }

      return { data: result }
    },
  }
}
