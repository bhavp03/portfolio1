import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const isAdmin = cookieStore.get('blog_admin')?.value === process.env.ADMIN_SECRET
  return NextResponse.json({ isAdmin })
}
