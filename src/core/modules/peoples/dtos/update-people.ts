export type UpdatePeople = {
  id: string
  fullName: string
  document: string | null
  email: string | null
  type: 'specialist' | 'user'
  number: string | null
  address: string | null
  dateOfBirth: Date | null
  phones: string | null
  neighborhood: string | null
  complement: string | null
  reference: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  clinicId: string | null
}
