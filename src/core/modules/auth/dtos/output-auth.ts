export type OutputAuth = {
  id: string
  fullName: string
  email: string
  admin: 'user' | 'admin' | 'root'
  password: string
  coverImage: string | null
}
