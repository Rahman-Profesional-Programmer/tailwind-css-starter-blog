import { Authors, allAuthors } from 'contentlayer/generated'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { createSupabaseClient } from '../../lib/supabaseClient'

export const metadata = genPageMetadata({ title: 'Tentang' })

export default async function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const supabase = createSupabaseClient()
  const { data: users, error } = await supabase.from('users').select().limit(1)
  const user = users && users.length > 0 ? users[0] : null

  // console.log('User data:', author)
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

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
    <>
      <AuthorLayout content={mappedUser}>
        {/* <MDXLayoutRenderer code={author.body.code} variables={{ description: user.description }} /> */}
        <div className="whitespace-pre-line text-gray-700">{mappedUser.description}</div>
      </AuthorLayout>
    </>
  )

  // if (error) {
  //   return <pre>Error: {error.message}</pre>
  // }

  // if (!user) {
  //   return <p>Tidak ada data pengguna.</p>
  // }

  // return (
  //   <div className="mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow">
  //     <h1 className="mb-4 text-2xl font-bold">Tentang</h1>
  //     <div className="mb-4">
  //       <strong>Nama:</strong> {user.email}
  //     </div>
  //     <div className="mb-4">
  //       <strong>Jabatan:</strong> {user.occupation}
  //     </div>
  //     <div className="mb-4">
  //       <strong>Perusahaan:</strong> {user.company}
  //     </div>
  //     <div className="mb-4">
  //       <strong>Deskripsi:</strong> {user.description}
  //     </div>
  //     <div className="mb-4">
  //       <strong>Github:</strong>{' '}
  //       <a href={user.github} target="_blank" rel="noopener noreferrer">
  //         Github
  //       </a>
  //     </div>
  //     <div className="mb-4">
  //       <strong>LinkedIn:</strong>{' '}
  //       <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
  //         Linkedin
  //       </a>
  //     </div>

  //   </div>
  // )
}
