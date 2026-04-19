import { NextResponse } from 'next/server'

const COOKIE_NAME = 'blog_admin'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
