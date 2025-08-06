'use server'

import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // Panggil signIn dengan kredensial dan arahkan ke dashboard setelah sukses
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return 'Email atau password yang Anda masukkan salah.'
    }
    // Lemparkan error lain agar bisa di-debug
    throw error
  }
}
