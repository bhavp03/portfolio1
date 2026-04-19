import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  const { data: post, error: fetchErr } = await supabase
    .from('blog_posts')
    .select('likes')
    .eq('id', params.id)
    .single()

  if (fetchErr || !post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ likes: (post.likes ?? 0) + 1 })
    .eq('id', params.id)
    .select('likes')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ likes: data.likes })
}
