import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  // Map the content to match UserProfile interface
  const mappedContent = {
    name: mainContent.name || '',
    avatar: mainContent.avatar || '',
    occupation: mainContent.occupation || '',
    company: mainContent.company || '',
    email: mainContent.email || '',
    twitter: mainContent.twitter,
    linkedin: mainContent.linkedin,
    github: mainContent.github,
    bluesky: mainContent.bluesky,
    description: '',
    type: null,
    path: null,
    slug: mainContent.slug,
    readingTime: null,
    filePath: null,
    toc: undefined,
  }

  return (
    <>
      <AuthorLayout content={mappedContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
