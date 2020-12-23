import React, { useCallback } from 'react'
import Layout from 'app/layouts/Layout'
import { BlitzPage, useMutation, useRouter } from 'blitz'
import createPost from 'app/posts/mutations/createPost'
import PostForm from 'app/posts/components/PostForm'
import { removeEmptyFields } from 'utils/form'
import { PostFormInputType } from 'app/posts/validations'

const NewPostPage: BlitzPage = () => {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)
  const onSubmit = useCallback(
    async (data: PostFormInputType) => {
      try {
        const post = await createPostMutation({ data: removeEmptyFields(data) })
        // const post = await createPostMutation({ data })
        alert('Success!' + JSON.stringify(post))
        router.push(`/posts/${post.slug}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [createPostMutation, router],
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
