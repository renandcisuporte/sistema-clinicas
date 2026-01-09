import { ProductsRepository } from '../repositories/product-repository'

export const deleteProductUseCase = ({
  repository,
}: {
  repository: ProductsRepository
}) => {
  return {
    async execute(id: string): Promise<void> {
      await repository.delete(id)
    },
  }
}
