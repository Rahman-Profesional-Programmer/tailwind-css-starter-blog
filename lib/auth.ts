import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { createSupabaseClient } from './supabaseClient'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const supabase = createSupabaseClient()
        // Ambil data user dari Supabase
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single()

        if (error || !user) {
          console.error('Auth Error:', error?.message || 'User not found')
          return null // User tidak ditemukan atau terjadi error
        }

        // Pastikan Anda memiliki kolom 'password' yang di-hash di tabel 'users'
        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password)

        if (passwordsMatch) {
          // Jika password cocok, kembalikan data user (tanpa password)
          return {
            id: user.id,
            name: user.full_name,
            email: user.email,
            image: user.avatar, // Ambil URL avatar dari database
          }
        }

        // Jika password tidak cocok
        console.log('Password does not match for user:', credentials.email)
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login', // Arahkan ke halaman login kustom
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id // Simpan id ke token
        token.picture = user.image // Simpan URL gambar ke token
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string // Ambil id dari token
      session.user.image = token.picture as string // Ambil URL gambar dari token
      return session
    },
  },
})
