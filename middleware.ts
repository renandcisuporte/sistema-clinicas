import { getUser } from '@/libs/session'
import { NextRequest, NextResponse } from 'next/server'

export const PUBLIC_ROUTES: readonly string[] = ['/', '/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (!isPublicRoute) {
    return NextResponse.next()
  }

  const session = await getUser()

  if (!session?.clinicId) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      Ignora arquivos estáticos e API routes
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
