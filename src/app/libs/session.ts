import 'server-only'

import jwt from 'jsonwebtoken'

import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

type Session = {
  user: {
    id: string
    admin: string
    email: string
    fullName: string
    coverImage?: string
  }
  clinicId: string
}

type SessionData = {
  token?: string
}

const sessionOptions: SessionOptions = {
  ttl: process.env.NEXT_PUBLIC_TTL,
  password: process.env.NEXT_PUBLIC_SECRET!,
  cookieName: '@dclinicas',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: process.env.NEXT_PUBLIC_TTL! - 60,
    path: '/',
  },
}

export async function getSession() {
  return await getIronSession<SessionData>(cookies(), sessionOptions)
}

export async function saveSession(token: string) {
  const session = await getSession()
  session.token = token
  await session.save()
}

export async function destroySession() {
  const session = await getSession()
  if (session) session.destroy()
}

export async function getUser(): Promise<Session | null> {
  const session = await getSession()

  if (session.token) return jwt.decode(session.token) as any
  return null
}
