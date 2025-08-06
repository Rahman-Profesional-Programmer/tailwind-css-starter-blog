'use server'

import { auth } from '@/lib/auth'
import { createSupabaseClient } from '@/lib/supabaseClient'
import { revalidatePath } from 'next/cache'

export async function deleteArticle(formData: FormData) {
  const id = Number(formData.get('id'))
  if (!id) {
    return { success: false, message: 'Article ID is missing.' }
  }

  const supabase = createSupabaseClient()

  // Opsi 1: Hard Delete (hapus permanen)
  // const { error } = await supabase.from('articles').delete().match({ id });

  // Opsi 2: Soft Delete (lebih aman, hanya menandai sebagai terhapus)
  const { error } = await supabase
    .from('articles')
    .update({ delete_at: new Date().toISOString() })
    .match({ id })

  revalidatePath('/dashboard') // Memuat ulang data di halaman dashboard
  return { success: !error, message: error ? error.message : 'Article deleted.' }
}

export type ArticleFormState = {
  success: boolean
  message: string
}

export async function createArticle(
  prevState: ArticleFormState | null,
  formData: FormData
): Promise<ArticleFormState> {
  const session = await auth()
  if (!session?.user?.name) {
    return { success: false, message: 'Authentication failed. Please log in again.' }
  }

  const validatedData = {
    judul: formData.get('judul') as string,
    type: formData.get('type') as string,
    artikel: formData.get('artikel') as string,
    tags: formData.get('tags') as string,
    is_draft: formData.get('is_draft') === 'on', // Nilai checkbox adalah 'on' saat dicentang
    summary: formData.get('summary') as string,
    images: formData.get('images') as string,
  }

  // Validasi dasar
  if (!validatedData.judul || !validatedData.artikel) {
    return { success: false, message: 'Title and Article content are required.' }
  }

  const supabase = createSupabaseClient()
  const { error } = await supabase.from('articles').insert([
    {
      ...validatedData,
      author: session.user.name, // Atur penulis secara otomatis
      date: new Date().toISOString(), // Atur tanggal secara otomatis
    },
  ])

  if (error) {
    return { success: false, message: `Failed to create article: ${error.message}` }
  }

  revalidatePath('/dashboard')
  return { success: true, message: 'Article created successfully.' }
}
