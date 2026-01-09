export type OutputPeople = {
  id: string
  number: string | null
  address: string | null
  fullName: string
  document: string | null
  type: 'specialist' | 'user'
  dateOfBirth: Date | null
  phones: string | null
  email: string | null
  neighborhood: string | null
  complement: string | null
  reference: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  clinicId: string | null
}
