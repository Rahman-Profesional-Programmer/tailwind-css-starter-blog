'use client'

import { useEffect, useState } from 'react'
import { Authors, allAuthors } from 'contentlayer/generated'

import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { createSupabaseClient } from '../../lib/supabaseClient'

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createSupabaseClient()
      const { data, error } = await supabase.from('users').select().limit(1)
      if (!error && data && data.length > 0) {
        setUser(data[0])
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return <div>Memuat data pengguna...</div>
  }

  const mappedUser = {
    name: user.full_name,
    avatar: user.avatar,
    occupation: user.occupation,
    company: user.company,

    email: user.email,
    twitter: user.x,
    linkedin: user.linkedin,
    github: user.github,
    type: user.type ?? null,
    bluesky: '',

    description: user.description,

    path: user.path ?? null,
    slug: user.slug ?? null,

    readingTime: user.readingTime ?? null,
    filePath: user.filePath ?? null,
    toc: user.toc ?? null,
  }

  return (
    <AuthorLayout content={mappedUser}>
      <div className="whitespace-pre-line text-gray-700">{mappedUser.description}</div>
    </AuthorLayout>
  )
}
