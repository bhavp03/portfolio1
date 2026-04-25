import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { generateSlug, generateExcerpt, calculateReadTime } from '@/lib/blog-utils'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

function isAdmin(): boolean {
  const cookieStore = cookies()
  return cookieStore.get('blog_admin')?.value === process.env.ADMIN_SECRET
}

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ 
        error: 'Supabase environment variables are missing on the server.',
        env_keys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
      }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Critical API error:', err)
    return NextResponse.json({ error: err.message || 'Unknown error occurred', stack: err.stack }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    // Purge cache for blog list and the new post page
    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)

    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error occurred' }, { status: 500 })
  }
}
