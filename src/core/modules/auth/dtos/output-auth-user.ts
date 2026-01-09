export type OutputAuthUser = {
  id: string
  fullName: string
  email: string
  admin: 'user' | 'admin' | 'root'
  coverImage: string | null
}
