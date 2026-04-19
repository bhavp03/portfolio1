"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Typography from '@tiptap/extension-typography'
import { useEffect, useState, useCallback } from 'react'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Code2,
  Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon,
  Undo, Redo, Minus, Type, ChevronDown, Unlink, X
} from 'lucide-react'
import '@/styles/editor.css'

/* ─── Toolbar button ──────────────────────────────────────────────── */
function ToolBtn({
  onClick, active = false, disabled = false, title, children
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick() }}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded text-sm transition-all duration-150 ${
        active
          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5 self-center" />
}

/* ─── Inline Dialog ───────────────────────────────────────────────── */
function InlineDialog({
  title, onClose, children
}: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute z-50 top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-sm text-gray-800 dark:text-white">{title}</span>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  )
}

/* ─── Main RichEditor ─────────────────────────────────────────────── */
interface RichEditorProps {
  content?: string
  onChange?: (html: string) => void
  placeholder?: string
}

export function RichEditor({ content = '', onChange, placeholder = 'Start writing your blog post…' }: RichEditorProps) {
  const [dialog, setDialog] = useState<null | 'link' | 'image' | 'youtube'>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: false }),
      Typography,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      LinkExtension.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      ImageExtension.configure({ allowBase64: false, inline: false }),
      Youtube.configure({ width: 640, height: 360, nocookie: true }),
    ],
    content,
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // Sync initial content if it changes (e.g. loading a saved post)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  /* ─── Shortcuts ─────────────────────────────────── */
  const openDialog = useCallback((type: 'link' | 'image' | 'youtube') => {
    if (type === 'link') {
      const { from, to } = editor!.state.selection
      const selectedText = editor!.state.doc.textBetween(from, to)
      setLinkText(selectedText)
      setLinkUrl(editor!.getAttributes('link').href || '')
    }
    setDialog(type)
  }, [editor])

  const closeDialog = useCallback(() => {
    setDialog(null)
    setLinkUrl(''); setLinkText(''); setImageUrl(''); setYoutubeUrl('')
  }, [])

  const applyLink = useCallback(() => {
    if (!editor) return
    if (linkText && !editor.state.selection.empty) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    } else if (linkText) {
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    }
    closeDialog()
  }, [editor, linkUrl, linkText, closeDialog])

  const applyImage = useCallback(() => {
    if (!editor || !imageUrl) return
    editor.chain().focus().setImage({ src: imageUrl }).run()
    closeDialog()
  }, [editor, imageUrl, closeDialog])

  const applyYoutube = useCallback(() => {
    if (!editor || !youtubeUrl) return
    editor.commands.setYoutubeVideo({ src: youtubeUrl })
    closeDialog()
  }, [editor, youtubeUrl, closeDialog])

  if (!editor) return null

  /* ─── Heading select ─────────────────────────────── */
  const getCurrentHeadingLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1'
    if (editor.isActive('heading', { level: 2 })) return 'H2'
    if (editor.isActive('heading', { level: 3 })) return 'H3'
    if (editor.isActive('heading', { level: 4 })) return 'H4'
    return 'Para'
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden flex flex-col">
      {/* ── Toolbar ── */}
      <div className="relative flex flex-wrap gap-0.5 items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">

        {/* Heading style dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1.5 rounded text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-w-[58px]"
          >
            <Type className="w-3.5 h-3.5" />
            {getCurrentHeadingLabel()}
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute z-50 top-full left-0 mt-1 hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-100 dark:border-gray-700 py-1 min-w-[120px] text-sm">
            {(['Para', 'H1', 'H2', 'H3', 'H4'] as const).map((label) => (
              <button
                key={label}
                type="button"
                onMouseDown={e => {
                  e.preventDefault()
                  if (label === 'Para') editor.chain().focus().setParagraph().run()
                  else editor.chain().focus().toggleHeading({ level: parseInt(label[1]) as 1|2|3|4 }).run()
                }}
                className={`px-3 py-1.5 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                  getCurrentHeadingLabel() === label ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {label === 'Para' ? 'Normal' : label}
              </button>
            ))}
          </div>
        </div>

        <Divider />

        {/* Text formatting */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)">
          <UnderlineIcon className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
          <Highlighter className="w-4 h-4" />
        </ToolBtn>

        <Divider />

        {/* Text color */}
        <label className="relative flex items-center cursor-pointer" title="Text color">
          <span className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="block w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-600" style={{ background: editor.getAttributes('textStyle').color || '#1d4ed8' }} />
          </span>
          <input
            type="color"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            defaultValue={editor.getAttributes('textStyle').color || '#1d4ed8'}
            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>

        <Divider />

        {/* Alignment */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
          <AlignLeft className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">
          <AlignCenter className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">
          <AlignRight className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
          <AlignJustify className="w-4 h-4" />
        </ToolBtn>

        <Divider />

        {/* Lists and blocks */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">
          <Code className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
          <Code2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
          <Minus className="w-4 h-4" />
        </ToolBtn>

        <Divider />

        {/* Insert: Link */}
        <div className="relative">
          <ToolBtn onClick={() => openDialog('link')} active={editor.isActive('link')} title="Insert / edit link">
            <LinkIcon className="w-4 h-4" />
          </ToolBtn>
          {dialog === 'link' && (
            <InlineDialog title="Insert Link" onClose={closeDialog}>
              <div className="flex flex-col gap-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Display text (optional)"
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyLink()}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={applyLink} className="flex-1 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Apply
                  </button>
                  {editor.isActive('link') && (
                    <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); closeDialog() }}
                      className="px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg hover:bg-red-100 transition-colors">
                      <Unlink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </InlineDialog>
          )}
        </div>

        {/* Insert: Image */}
        <div className="relative">
          <ToolBtn onClick={() => openDialog('image')} title="Insert image">
            <ImageIcon className="w-4 h-4" />
          </ToolBtn>
          {dialog === 'image' && (
            <InlineDialog title="Insert Image" onClose={closeDialog}>
              <div className="flex flex-col gap-2">
                <input
                  autoFocus
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyImage()}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="preview" className="w-full h-24 object-cover rounded-lg bg-gray-100 dark:bg-gray-700" onError={e => (e.currentTarget.style.display='none')} />
                )}
                <button type="button" onClick={applyImage} className="py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Insert Image
                </button>
              </div>
            </InlineDialog>
          )}
        </div>

        {/* Insert: YouTube */}
        <div className="relative">
          <ToolBtn onClick={() => openDialog('youtube')} title="Embed YouTube video">
            <YoutubeIcon className="w-4 h-4" />
          </ToolBtn>
          {dialog === 'youtube' && (
            <InlineDialog title="Embed YouTube Video" onClose={closeDialog}>
              <div className="flex flex-col gap-2">
                <input
                  autoFocus
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && applyYoutube()}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={applyYoutube} className="py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Embed Video
                </button>
              </div>
            </InlineDialog>
          )}
        </div>

        <Divider />

        {/* History */}
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolBtn>
      </div>

      {/* ── Editor content area ── */}
      <EditorContent
        editor={editor}
        className="flex-1 text-gray-800 dark:text-gray-100 overflow-y-auto"
        style={{ minHeight: '420px' }}
      />
    </div>
  )
}
