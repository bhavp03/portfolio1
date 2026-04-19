import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'blog_admin'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect the editor page
  if (pathname.startsWith('/blog/new')) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    const secret = process.env.ADMIN_SECRET

    if (!secret || token !== secret) {
      const loginUrl = new URL('/blog/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/new', '/blog/new/:path*'],
}
