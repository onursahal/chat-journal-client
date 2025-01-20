// middleware.ts

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/sign-up']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const accessToken = cookies().get('accessToken')?.value
  const refreshToken = cookies().get('refreshToken')?.value
  const redirectHome = () =>
    NextResponse.redirect(new URL('/dashboard', req.url))
  const redirectSignIn = () =>
    NextResponse.redirect(new URL('/sign-in', req.url))

  if (publicRoutes.includes(pathname) && (accessToken || refreshToken)) {
    return redirectHome()
  }

  if (protectedRoutes.includes(pathname) && !accessToken && !refreshToken) {
    return redirectSignIn()
  }

  // Think about if user has refresh token but no access token case
  // This approach assumes we always try to get user when try to access protected routes

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)',
      missing: [{ type: 'header', key: 'next-action' }],
    },
  ],
}
