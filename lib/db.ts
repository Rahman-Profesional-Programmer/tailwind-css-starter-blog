import { createSupabaseClient } from './supabaseClient' // Pastikan path sesuai dengan lokasi file Anda

export async function getArticles() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('articles') // Nama tabel di Supabase
    .select('*') // Pilih semua kolom

  if (error) {
    console.error('Error fetching articles:', error)
    return null
  }

  return data // Mengembalikan semua artikel
}

export async function getProducts(search: string = '', offset: number = 0) {
  // Implementasikan logika untuk mengambil data produk dari Supabase
  // ... (kode untuk query Supabase ke tabel produk) ...
  // Contoh (perlu disesuaikan dengan skema tabel produk Anda):
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${search}%`)
    .range(offset, offset + 9) // Sesuaikan nama tabel dan kolom
  return { products: data ?? [], newOffset: offset + 10, totalProducts: 100 } // Sesuaikan dengan hasil query Anda
}
