import React, { Suspense, useCallback, useMemo } from 'react'
import Layout from 'app/layouts/Layout'
import { Link, useRouter, useQuery, BlitzPage, useMutation, useParams } from 'blitz'
import getPost from 'app/posts/queries/getPost'
import deletePost from 'app/posts/mutations/deletePost'
import { useCurrentUserFromSession } from 'app/hooks/useCurrentUser'
import createLikePost from 'app/likePosts/mutations/createLikePost'
import deleteLikePost from 'app/likePosts/mutations/deleteLikePost'
import PostComments from '../../../components/PostComment'

export const Post = () => {
  const router = useRouter()
  const params = useParams()
  const { id: userId } = useCurrentUserFromSession()
  const [post, { refetch }] = useQuery(getPost, { where: { slug: params.slug as string } })

  const [deletePostMutation] = useMutation(deletePost)
  const [createLikePostMutation] = useMutation(createLikePost)
  const [deleteLikePostMutation] = useMutation(deleteLikePost)

  const isAuthor = useMemo(() => post?.authorId === userId, [post, userId])
  const currentUserLike = useMemo(() => {
    return (post?.likes ?? []).find((like) => like.userId === userId)
  }, [post?.likes, userId])

  const likePost = useCallback(async () => {
    await createLikePostMutation({
      data: {
        post: {
          connect: {
            id: post?.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    await refetch()
  }, [createLikePostMutation, post, refetch, userId])

  const unlikePost = useCallback(async () => {
    if (!currentUserLike) return
    await deleteLikePostMutation({
      where: {
        id: currentUserLike.id,
      },
    })
    await refetch()
  }, [currentUserLike, deleteLikePostMutation, refetch])

  return (
    <div>
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Post {post.title}</h1>
          {post.authorId === userId && (
            <div className="ml-auto flex items-center gap-4">
              <Link href={`/posts/${post.slug}/edit`}>
                <a>Edit</a>
              </Link>
              <button
                type="button"
                onClick={async () => {
                  if (window.confirm('This will be deleted')) {
                    await deletePostMutation({ where: { id: post.id } })
                    router.push('/posts')
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div>slug: {post.slug}</div>
        <div>content: {post.content}</div>
        <div>status: {post.status}</div>

        {isAuthor ? (
          <div className="inline-block border rounded-sm px-3 py-1">like count: {post?.likes?.length ?? 0}</div>
        ) : (
          <>
            {currentUserLike ? (
              <button className="border rounded-sm px-3 py-1 bg-teal-200" onClick={unlikePost} disabled={isAuthor}>
                liked! {post?.likes?.length ?? 0}
              </button>
            ) : (
              <button className="border rounded-sm px-3 py-1" onClick={likePost} disabled={isAuthor}>
                like? {post?.likes?.length ?? 0}
              </button>
            )}
          </>
        )}
      </div>
      <div className="pt-4 mt-4 border-t">
        <div className="font-bold text-xl mb-3">Comments</div>
        <Suspense fallback={'loading comments...'}>
          <PostComments postId={post.id} userId={userId} />
        </Suspense>
      </div>
    </div>
  )
}

const ShowPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.getLayout = (page) => <Layout title={'Post'}>{page}</Layout>

export default ShowPostPage
