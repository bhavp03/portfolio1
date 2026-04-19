import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/blog-utils'
import { Navbar } from '@/components/navbar'
import { Clock, Calendar, Tag, ArrowLeft, Edit3, Linkedin, Share2, Heart } from 'lucide-react'
import '@/styles/editor.css'
import type { Metadata } from 'next'
import { CopyLinkButton } from '@/components/blog/copy-link-button'
import { LikeButton } from '@/components/blog/like-button'
import { CommentSection } from '@/components/blog/comment-section'
import { DeletePostButton } from '@/components/blog/delete-post-button'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase.from('blog_posts').select('title, keywords, excerpt').eq('slug', params.slug).single()
  if (!data) return { title: 'Post Not Found' }
  return {
    title: `${data.title} | Bhavya Puri`,
    description: data.excerpt || '',
    keywords: data.keywords || '',
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: Props) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !post) notFound()

  const cookieStore = cookies()
  const isAdmin = cookieStore.get('blog_admin')?.value === process.env.ADMIN_SECRET

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bhavyapuri.netlify.app'
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postUrl)}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* ── Top navigation ───────────────────── */}
        <div className="container mx-auto max-w-3xl px-4 pt-8 pb-0">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <DeletePostButton postId={post.id} />
              )}
              <Link
                href={`/blog/new?id=${post.id}`}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* ── Article ──────────────────────────── */}
        <article className="container mx-auto max-w-3xl px-4 py-10">

          {/* Status */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              post.status === 'published'
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
              {post.status === 'published' ? 'Published' : 'Draft'}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3 h-3" />
              {post.read_time} min read
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(post.created_at)}
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            <CopyLinkButton url={postUrl} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full font-medium border border-blue-100 dark:border-blue-800"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Keywords */}
          {post.keywords && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">
              <span className="font-semibold uppercase tracking-wider">Keywords: </span>
              {post.keywords}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent dark:from-blue-800 dark:via-blue-900 mb-10" />

          {/* Body */}
          <div
            className="prose-view text-gray-800 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.body || '<p>This post has no content yet.</p>' }}
          />

          {/* ── Share section ─────────────────── */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                <Share2 className="w-4 h-4" />
                Share this article:
              </div>
              <div className="flex flex-wrap gap-3">
                <LikeButton postId={post.id} initialLikes={post.likes || 0} />
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
                  id="share-linkedin-btn"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
                  id="share-x-btn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post on X
                </a>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <CommentSection postId={post.id} />
        </article>
      </main>
    </>
  )
}
