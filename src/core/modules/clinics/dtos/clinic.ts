export type Clinic = {
  id: string
  clinicId: string | null
  number: string | null
  title: string
  fantasy: string
  cnpj: string
  ie: string | null
  phone: string | null
  mobilePhone: string | null
  averageService: string | null
  address: string | null
  neighborhood: string | null
  complement: string | null
  reference: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
