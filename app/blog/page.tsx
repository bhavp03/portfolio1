"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PenSquare, Tag, Search, Loader2, BookOpen } from 'lucide-react'
import { BlogCard } from '@/components/blog/blog-card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import type { BlogPost } from '@/lib/supabase'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Fetch posts
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

    // Check admin status
    fetch('/api/admin/check')
      .then(r => r.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(() => setIsAdmin(false))
  }, [])

  // Collect all unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])))

  const filtered = posts.filter(p => {
    const q = search.toLowerCase()
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q)
    const matchesTag = !activeTag || (p.tags || []).includes(activeTag)
    return matchesSearch && matchesTag
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900" />
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />

          <div className="relative container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            >
              <BookOpen className="w-4 h-4" />
              Articles & Insights
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight"
            >
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300">
                Blog
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Thoughts on embedded systems, AI/ML, vehicle controls, and everything in between.
            </motion.p>

            {/* Write new post CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/blog/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/40 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <PenSquare className="w-4 h-4" />
                Write New Post
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Search & Filters ──────────────────────── */}
        <section className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Tag filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    !activeTag
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeTag === tag
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Posts grid ─────────────────────────── */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <PenSquare className="w-9 h-9 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {search || activeTag ? 'No matching posts' : 'No posts yet'}
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mb-6">
                {search || activeTag ? 'Try a different search or tag.' : 'Be the first to write something!'}
              </p>
              <Link
                href="/blog/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-colors"
              >
                <PenSquare className="w-4 h-4" />
                Write a Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} isAdmin={isAdmin} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
