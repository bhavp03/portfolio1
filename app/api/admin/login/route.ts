import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'blog_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const secret = process.env.ADMIN_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (password !== secret) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, secret, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
