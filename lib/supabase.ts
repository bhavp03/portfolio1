import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // We don't throw here to avoid crashing the whole module at import time,
  // instead we'll handle the missing client in the API routes.
  console.error('Missing Supabase environment variables.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

export type BlogPost = {
  id: string
  title: string
  slug: string
  keywords: string
  tags: string[]
  body: string
  excerpt: string
  status: 'draft' | 'published'
  read_time: number
  created_at: string
  updated_at: string
}
