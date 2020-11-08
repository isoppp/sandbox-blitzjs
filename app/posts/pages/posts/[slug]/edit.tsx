import React, { Suspense, useCallback } from 'react'
import Layout from 'app/layouts/Layout'
import { Link, useRouter, useQuery, useMutation, BlitzPage, useParams } from 'blitz'
import getPost from 'app/posts/queries/getPost'
import updatePost from 'app/posts/mutations/updatePost'
import PostForm, { PostFormValues } from 'app/posts/components/PostForm'

export const EditPost = () => {
  const router = useRouter()
  const params = useParams()
  const [post] = useQuery(getPost, { where: { slug: params.slug as string } })
  const [updatePostMutation] = useMutation(updatePost)
  const onSubmit = useCallback(
    async (data: PostFormValues) => {
      try {
        const updated = await updatePostMutation({
          where: { id: post.id },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(`/posts/${updated.slug}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [post.id, router, updatePostMutation],
  )

  return (
    <div>
      <h1>Edit Post {post.id}</h1>
      <pre>{JSON.stringify(post)}</pre>

      <PostForm initialValues={post} onSubmit={onSubmit} />
    </div>
  )
}

const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>
    </div>
  )
}

EditPostPage.getLayout = (page) => <Layout title={'Edit Post'}>{page}</Layout>

export default EditPostPage
