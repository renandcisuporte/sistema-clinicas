import { CreateServiceInProduct } from '../dtos/create-service-in-product'
import { OutputServiceInProduct } from '../dtos/output-service-in-product'
import { UpdateServiceInProduct } from '../dtos/update-service-in-product'

export interface ServiceInProductsRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<OutputServiceInProduct[]>
  allService(
    clinicId: string,
    serviceId: string,
  ): Promise<OutputServiceInProduct[] | null>
  first(id: string): Promise<OutputServiceInProduct | null>
  upsave(input: CreateServiceInProduct): Promise<void>
  create(input: CreateServiceInProduct): Promise<OutputServiceInProduct>
  update(
    id: string,
    input: UpdateServiceInProduct,
  ): Promise<OutputServiceInProduct>
  delete(id: string): Promise<void>
}
