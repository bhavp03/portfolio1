"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: string
  initialLikes: number
}

const STORAGE_KEY = 'bhavya_liked_posts'

function getLikedPosts(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveLikedPost(postId: string) {
  const liked = getLikedPosts()
  if (!liked.includes(postId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...liked, postId]))
  }
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setLiked(getLikedPosts().includes(postId))
  }, [postId])

  const handleLike = async () => {
    if (liked || animating) return

    setAnimating(true)
    setLiked(true)
    setLikes(prev => prev + 1)
    saveLikedPost(postId)

    try {
      const res = await fetch(`/api/blog/${postId}/like`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likes)
      }
    } catch {
      // Keep optimistic update on error
    }

    setTimeout(() => setAnimating(false), 600)
  }

  return (
    <motion.button
      onClick={handleLike}
      disabled={liked}
      id="like-post-btn"
      whileTap={!liked ? { scale: 0.85 } : {}}
      title={liked ? 'You liked this post!' : 'Like this post'}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border ${
        liked
          ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 cursor-default'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800'
      }`}
    >
      <motion.div
        animate={animating ? { scale: [1, 1.5, 0.9, 1.2, 1] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Heart
          className={`w-4 h-4 transition-all duration-200 ${
            liked
              ? 'fill-red-500 text-red-500'
              : 'group-hover:text-red-500'
          }`}
        />
      </motion.div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={likes}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
