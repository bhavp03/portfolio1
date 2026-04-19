import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { postId: string } }) {
  // Fetch top-level comments
  const { data: comments, error } = await supabase
    .from('blog_comments')
    .select('*')
    .eq('post_id', params.postId)
    .is('parent_id', null)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Attach replies to each comment
  const withReplies = await Promise.all(
    (comments || []).map(async (comment) => {
      const { data: replies } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('parent_id', comment.id)
        .order('created_at', { ascending: true })
      return { ...comment, replies: replies || [] }
    })
  )

  return NextResponse.json(withReplies)
}

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const { author_name, author_email, content } = await request.json()

  if (!author_name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Name and content are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('blog_comments')
    .insert({ post_id: params.postId, author_name: author_name.trim(), author_email: author_email?.trim() || null, content: content.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ...data, replies: [] }, { status: 201 })
}
