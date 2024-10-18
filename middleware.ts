// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const locales = ['tr', 'en']
const defaultLocale = 'tr'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(pathname)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale || pathname.includes('api')) return

  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
