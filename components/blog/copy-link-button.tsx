"use client"

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.88 }}
      title={copied ? 'Link copied!' : 'Copy link to this post'}
      id="copy-link-btn"
      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        copied
          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="link"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
