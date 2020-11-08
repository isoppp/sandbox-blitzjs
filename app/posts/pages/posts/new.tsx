import React, { useCallback } from 'react'
import Layout from 'app/layouts/Layout'
import { Link, useRouter, useMutation, BlitzPage } from 'blitz'
import createPost from 'app/posts/mutations/createPost'
import PostForm, { PostFormValues } from 'app/posts/components/PostForm'
import { useCurrentUserFromSession } from '../../../hooks/useCurrentUser'

const NewPostPage: BlitzPage = () => {
  const router = useRouter()
  const { id: userId } = useCurrentUserFromSession()
  const [createPostMutation] = useMutation(createPost)
  const onSubmit = useCallback(
    async (data: PostFormValues) => {
      try {
        const post = await createPostMutation({
          data: {
            ...data,
            author: {
              connect: {
                id: userId,
              },
            },
          },
        })
        alert('Success!' + JSON.stringify(post))
        router.push(`/posts/${post.slug}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [createPostMutation, router, userId],
  )

  return (
    <div>
      <h1>Create New Post</h1>

      <PostForm onSubmit={onSubmit} />
    </div>
  )
}

NewPostPage.getLayout = (page) => <Layout title={'Create New Post'}>{page}</Layout>

export default NewPostPage
