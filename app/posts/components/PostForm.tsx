import React, { useCallback } from 'react'
import { useCurrentUserFromSession } from '../../hooks/useCurrentUser'
import { useMutation, useRouter } from 'blitz'
import createPost from '../mutations/createPost'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'

const PostForm = () => {
  const router = useRouter()
  const { id: userId } = useCurrentUserFromSession()
  const [createPostMutation] = useMutation(createPost)
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = useCallback(
    async (data: { title: string; content: string; slug: string }) => {
      console.log(data)
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
        router.push('/posts/[postId]', `/posts/${post.id}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [createPostMutation, router, userId],
  )

  return (
    <form className="block py-4" onSubmit={handleSubmit(onSubmit)}>
      <FormItem title="Slug:" className="mt-4 first:mt-0">
        <InputText type="text" name="slug" placeholder="my-title" ref={register} />
      </FormItem>
      <FormItem title="Title:" className="mt-4 first:mt-0">
        <InputText type="text" name="title" placeholder="My First Post" ref={register} />
      </FormItem>
      <FormItem title="Content:" className="mt-4 first:mt-0">
        <InputText type="text" name="content" placeholder="My First Post's Content" ref={register} />
      </FormItem>

      <div className="mt-6 flex justify-center">
        <button className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">
          Submit!
        </button>
      </div>
    </form>
  )
}

export default PostForm
