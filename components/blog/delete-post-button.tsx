"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

interface DeletePostButtonProps {
  postId: string
  className?: string
  showText?: boolean
}

export function DeletePostButton({ postId, className = "", showText = true }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete post')
      }

      // Success!
      router.refresh() // Refresh the current page or list
      if (window.location.pathname.includes('/blog/')) {
        // If we are on the single post page, redirect to the blog list
        if (!window.location.pathname.endsWith('/blog')) {
            router.push('/blog')
        }
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete post. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${className}`}
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      {showText && (isDeleting ? 'Deleting...' : 'Delete')}
    </button>
  )
}
