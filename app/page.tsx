import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  // const envVar = process.env.NEXT_PUBLIC_TEST_VAR
  return (
    <>
      {/* <div style={{ padding: '1rem', background: '#f5f5f5' }}>
        <strong>ENV TEST:</strong> {envVar}
      </div> */}

      <Main posts={posts} />
    </>
  )
}
