import React, { Suspense } from 'react'
import Layout from 'app/layouts/Layout'
import { Link, usePaginatedQuery, useRouter, BlitzPage } from 'blitz'
import getPosts from 'app/posts/queries/getPosts'
import { formatDistance } from 'date-fns'

const ITEMS_PER_PAGE = 3

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="shadow-lg rounded-lg py-6 px-6">
      <div className="flex justify-end">
        <Link href={'/posts/new'}>
          <a className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">New Post</a>
        </Link>
      </div>
      <ul className="divide-y">
        {posts.map((post) => {
          return (
            <li key={post.id} className="pt-4 mt-4 first:mt-0">
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                <a>
                  <div className="font-medium mb-3">{post.title}</div>
                  <div className="text-xs">
                    created: {formatDistance(new Date(), post.createdAt)} by {post.author?.name}
                  </div>
                  <div className="text-sm mt-1">{post.content}</div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>

      {(page !== 0 || hasMore) && (
        <div className="border-t pt-6 mt-10">
          <div className="max-w-xs mx-auto flex justify-between">
            <button disabled={page === 0} onClick={goToPreviousPage}>
              Previous
            </button>
            <button disabled={!hasMore} onClick={goToNextPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const PostsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </div>
  )
}

PostsPage.getLayout = (page) => <Layout title={'Posts'}>{page}</Layout>

export default PostsPage
