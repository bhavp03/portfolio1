import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

function isAdmin(): boolean {
  const cookieStore = cookies()
  return cookieStore.get('blog_admin')?.value === process.env.ADMIN_SECRET
}

// Admin reply to a comment
export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content } = await request.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content is required' }, { status: 400 })

  const { data, error } = await supabase
    .from('blog_comments')
    .insert({
      post_id: params.postId,
      parent_id: params.commentId,
      author_name: 'Bhavya (Author)',
      content: content.trim(),
      is_admin_reply: true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

// Admin delete a comment or reply
export async function DELETE(
  _: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('blog_comments')
    .delete()
    .eq('id', params.commentId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
