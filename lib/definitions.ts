export type Article = {
  id: number
  date: string
  author: string | null
  judul: string | null
  type: string | null
  artikel: string | null
  tags: string | null
  is_draft: boolean | null // Menggantikan 'draf - publish'
  summary: string | null
  images: string | null
  lastmod: string | null
  delete_at: string | null
}
