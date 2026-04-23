export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${base}-${Date.now()}`
}

export function generateExcerpt(html: string, length = 160): string {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  return text.length > length ? text.slice(0, length).trim() + '…' : text
}

export function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
