import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { generateSlug, generateExcerpt, calculateReadTime } from '@/lib/blog-utils'

export const dynamic = 'force-dynamic'

function isAdmin(): boolean {
  const cookieStore = cookies()
  return cookieStore.get('blog_admin')?.value === process.env.ADMIN_SECRET
}

export async function GET() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, keywords, tags, body: content, status } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const slug = generateSlug(title)
  const excerpt = generateExcerpt(content || '')
  const read_time = calculateReadTime(content || '')

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ title, slug, keywords, tags, body: content, excerpt, status, read_time }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
