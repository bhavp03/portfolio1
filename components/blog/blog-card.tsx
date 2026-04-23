import Link from 'next/link'
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/blog-utils'
import { DeletePostButton } from './delete-post-button'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/supabase'

interface BlogCardProps {
  post: BlogPost
  index: number
  isAdmin?: boolean
}

export function BlogCard({ post, index, isAdmin = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-1 p-6">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              post.status === 'published'
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
            {post.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock className="w-3 h-3" />
            {post.read_time} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
          {post.excerpt || 'No excerpt available.'}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-full">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(post.created_at)}
            </span>
            {isAdmin && (
              <DeletePostButton postId={post.id} className="mt-1 -ml-3 scale-90" showText={false} />
            )}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:gap-2.5 transition-all duration-200"
          >
            Read
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
