import { CreateProduct } from '../dtos/create-product'
import { OutputProduct } from '../dtos/output-product'
import { UpdateProduct } from '../dtos/update-product'

export interface ProductsRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<OutputProduct[]>
  first(id: string): Promise<OutputProduct | null>
  create(input: CreateProduct): Promise<OutputProduct>
  update(id: string, input: UpdateProduct): Promise<OutputProduct>
  delete(id: string): Promise<void>
}
