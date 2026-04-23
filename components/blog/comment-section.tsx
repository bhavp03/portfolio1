"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Trash2, CornerDownRight, Loader2, User, ShieldCheck, CheckCircle } from 'lucide-react'

interface Comment {
  id: string
  post_id: string
  parent_id: string | null
  author_name: string
  content: string
  is_admin_reply: boolean
  created_at: string
  replies?: Comment[]
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function Avatar({ name, isAdmin }: { name: string; isAdmin: boolean }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
      isAdmin
        ? 'bg-blue-700 text-white ring-2 ring-blue-400'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
    }`}>
      {isAdmin ? <ShieldCheck className="w-4 h-4" /> : initials}
    </div>
  )
}

export function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const loadComments = useCallback(async () => {
    const [commentsRes, adminRes] = await Promise.all([
      fetch(`/api/comments/${postId}`),
      fetch('/api/admin/check'),
    ])
    if (commentsRes.ok) setComments(await commentsRes.json())
    if (adminRes.ok) {
      const { isAdmin: admin } = await adminRes.json()
      setIsAdmin(admin)
    }
    setLoading(false)
  }, [postId])

  useEffect(() => { loadComments() }, [loadComments])

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setSubmitting(true)
    setError('')
    const res = await fetch(`/api/comments/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author_name: name, author_email: email, content }),
    })
    if (res.ok) {
      const newComment = await res.json()
      setComments(prev => [...prev, newComment])
      setContent('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    } else {
      setError('Failed to post comment. Please try again.')
    }
    setSubmitting(false)
  }

  const submitReply = async (commentId: string) => {
    if (!replyContent.trim()) return
    setSubmitting(true)
    const res = await fetch(`/api/comments/${postId}/${commentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: replyContent }),
    })
    if (res.ok) {
      const newReply = await res.json()
      setComments(prev =>
        prev.map(c =>
          c.id === commentId
            ? { ...c, replies: [...(c.replies || []), newReply] }
            : c
        )
      )
      setReplyContent('')
      setReplyingTo(null)
    }
    setSubmitting(false)
  }

  const deleteComment = async (commentId: string, parentId?: string) => {
    if (!confirm('Delete this comment?')) return
    const res = await fetch(`/api/comments/${postId}/${commentId}`, { method: 'DELETE' })
    if (res.ok) {
      if (parentId) {
        setComments(prev =>
          prev.map(c =>
            c.id === parentId
              ? { ...c, replies: c.replies?.filter(r => r.id !== commentId) }
              : c
          )
        )
      } else {
        setComments(prev => prev.filter(c => c.id !== commentId))
      }
    }
  }

  return (
    <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-5 h-5 text-blue-700 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h2>
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-10">
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              {/* Comment card */}
              <div className={`flex gap-3 p-4 rounded-2xl border ${
                comment.is_admin_reply
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700'
              }`}>
                <Avatar name={comment.author_name} isAdmin={comment.is_admin_reply} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {comment.author_name}
                      </span>
                      {comment.is_admin_reply && (
                        <span className="text-xs px-2 py-0.5 bg-blue-700 text-white rounded-full font-medium">
                          Author
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                        {timeAgo(comment.created_at)}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                  {/* Reply button — admin only */}
                  {isAdmin && !comment.is_admin_reply && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      <CornerDownRight className="w-3 h-3" />
                      Reply
                    </button>
                  )}
                </div>
              </div>

              {/* Replies */}
              {(comment.replies?.length ?? 0) > 0 && (
                <div className="ml-10 mt-2 flex flex-col gap-2">
                  {comment.replies!.map(reply => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group/reply flex gap-3 p-3.5 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
                    >
                      <Avatar name={reply.author_name} isAdmin={reply.is_admin_reply} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-gray-900 dark:text-white">
                              {reply.author_name}
                            </span>
                            {reply.is_admin_reply && (
                              <span className="text-xs px-1.5 py-0.5 bg-blue-700 text-white rounded-full font-medium text-[10px]">
                                Author
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{timeAgo(reply.created_at)}</span>
                            {isAdmin && (
                              <button
                                onClick={() => deleteComment(reply.id, comment.id)}
                                className="opacity-0 group-hover/reply:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                          {reply.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Inline reply form */}
              <AnimatePresence>
                {replyingTo === comment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-10 mt-2 overflow-hidden"
                  >
                    <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                      <textarea
                        autoFocus
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Write your reply…"
                        rows={2}
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      <button
                        onClick={() => submitReply(comment.id)}
                        disabled={submitting || !replyContent.trim()}
                        className="flex-shrink-0 self-end px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-1"
                      >
                        {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* New comment form */}
      <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          Leave a Comment
        </h3>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 py-6 justify-center text-green-600 dark:text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Thanks for your comment!</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={submitComment}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Email <span className="text-gray-400 font-normal">(optional, not shown)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Share your thoughts…"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !name.trim() || !content.trim()}
                className="self-end inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-200 dark:shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Post Comment
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
