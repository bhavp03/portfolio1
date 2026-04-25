"use client"

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Save, Send, Linkedin, Twitter, ArrowLeft, CheckCircle, LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'
import { TagInput } from '@/components/blog/tag-input'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// TipTap must be client-only (no SSR)
const RichEditor = dynamic(() => import('@/components/blog/rich-editor').then(m => m.RichEditor), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 flex items-center justify-center min-h-[420px]">
      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
    </div>
  ),
})

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function BlogEditorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [postId, setPostId] = useState<string | null>(null)
  const [postSlug, setPostSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!editId)
  const [isUploading, setIsUploading] = useState(false)

  // Load existing post if editing
  useEffect(() => {
    if (editId) {
      fetch(`/api/blog/${editId}`)
        .then(r => r.json())
        .then(data => {
          setTitle(data.title || '')
          setKeywords(data.keywords || '')
          setTags(data.tags || [])
          setBody(data.body || '')
          setStatus(data.status || 'draft')
          setPostId(data.id)
          setPostSlug(data.slug)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [editId])

  const buildPayload = useCallback(() => ({
    title: title.trim(),
    keywords,
    tags,
    body,
    status,
  }), [title, keywords, tags, body, status])

  const save = useCallback(async (publishStatus: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Please enter a title before saving.')
      return null
    }

    setSaveStatus('saving')
    setStatus(publishStatus)

    try {
      let res: Response
      if (postId) {
        res = await fetch(`/api/blog/${postId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...buildPayload(), status: publishStatus }),
        })
      } else {
        res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...buildPayload(), status: publishStatus }),
        })
      }

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Save failed')
      }

      const saved = result
      setPostId(saved.id)
      setPostSlug(saved.slug)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
      return saved
    } catch (e) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
      return null
    }
  }, [title, buildPayload, postId])

  const handleDraft = async () => {
    await save('draft')
  }

  const handlePublish = async () => {
    const saved = await save('published')
    if (saved) {
      router.push(`/blog/${saved.slug}`)
    }
  }

  const shareUrl = postSlug ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bhavyapuri.netlify.app'}/blog/${postSlug}` : ''

  const shareLinkedIn = () => {
    if (!postSlug) { alert('Save or publish the post first!'); return }
    // Opens LinkedIn post composer with blog URL pre-filled in the body
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=700,height=600')
  }

  const shareX = () => {
    if (!postSlug) { alert('Save or publish the post first!'); return }
    const text = `${title} ${shareUrl}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/blog')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-10">

          {/* ── Back link ─────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <button
              onClick={() => router.push('/blog')}
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/* ── Page header ─────────────────────── */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editId ? 'Edit Post' : 'New Blog Post'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Fill in the details and write your content below.</p>
                </div>
                <div className="flex items-center gap-2">
                  {postId && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-medium">
                      {status === 'published' ? '● Published' : '○ Draft'}
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isUploading}
                    title="Logout"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </div>

              {/* ── Metadata card ────────────────────── */}
              <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col gap-5 shadow-sm">

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Post Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="blog-title"
                    type="text"
                    placeholder="Enter a compelling title…"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Keywords
                    <span className="ml-2 font-normal text-gray-400 text-xs">(comma-separated, used for SEO)</span>
                  </label>
                  <input
                    id="blog-keywords"
                    type="text"
                    placeholder="embedded systems, signal processing, AI, vehicles…"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Tags
                  </label>
                  <TagInput tags={tags} onChange={setTags} />
                </div>
              </div>

              {/* ── Editor ───────────────────────────── */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <RichEditor
                  content={body}
                  onChange={setBody}
                  onUploading={setIsUploading}
                  placeholder="Start writing your blog post…"
                />
              </div>

              {/* ── Action bar (sticky bottom) ────────── */}
              <div className="sticky bottom-6 z-40">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl px-5 py-4 flex flex-wrap gap-3 items-center justify-between">
                  {/* Save status indicator */}
                  <div className="flex items-center gap-2 text-sm">
                    {(saveStatus === 'saving' || isUploading) && (
                      <><Loader2 className="w-4 h-4 text-blue-500 animate-spin" /><span className="text-gray-500">{isUploading ? 'Uploading media…' : 'Saving…'}</span></>
                    )}
                    {saveStatus === 'saved' && (
                      <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600 dark:text-green-400">Saved!</span></>
                    )}
                    {saveStatus === 'error' && (
                      <span className="text-red-500">Save failed. Try again.</span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2 ml-auto">
                    {/* Save Draft */}
                    <button
                      id="btn-save-draft"
                      onClick={handleDraft}
                      disabled={saveStatus === 'saving' || isUploading}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-500 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      Save Draft
                    </button>

                    {/* Publish */}
                    <button
                      id="btn-publish"
                      onClick={handlePublish}
                      disabled={saveStatus === 'saving' || isUploading}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-200 dark:shadow-blue-900/40 transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      Publish
                    </button>

                    {/* LinkedIn share */}
                    <button
                      id="btn-share-linkedin"
                      onClick={shareLinkedIn}
                      title={postSlug ? 'Share on LinkedIn' : 'Save first to share'}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        postSlug
                          ? 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </button>

                    {/* X share */}
                    <button
                      id="btn-share-x"
                      onClick={shareX}
                      title={postSlug ? 'Share on X' : 'Save first to share'}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        postSlug
                          ? 'bg-black hover:bg-gray-900 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                      Post on X
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function NewBlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    }>
      <BlogEditorInner />
    </Suspense>
  )
}
