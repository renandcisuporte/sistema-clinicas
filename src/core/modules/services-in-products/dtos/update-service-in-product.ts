export type UpdateServiceInProduct = {
  id: string
  clinicId: string | null
  productId: string | null
  serviceId: string | null
  rental: number
  rentalPrice: number
}
