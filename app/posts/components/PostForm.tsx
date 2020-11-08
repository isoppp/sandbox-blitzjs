import React, { useCallback } from 'react'
import { useCurrentUserFromSession } from '../../hooks/useCurrentUser'
import { useMutation, useRouter } from 'blitz'
import createPost from '../mutations/createPost'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'

export type PostFormValues = {
  title: string
  content: string
  slug: string
}

type PostFormProps = {
  initialValues?: PostFormValues & any
  onSubmit: (data: PostFormValues) => void
}

const PostForm = (props: PostFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm()

  return (
    <form className="block py-4" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Slug:" className="mt-4 first:mt-0">
        <InputText
          type="text"
          name="slug"
          placeholder="my-title"
          ref={register}
          defaultValue={props.initialValues?.slug}
        />
      </FormItem>
      <FormItem title="Title:" className="mt-4 first:mt-0">
        <InputText
          type="text"
          name="title"
          placeholder="My First Post"
          ref={register}
          defaultValue={props.initialValues?.title}
        />
      </FormItem>
      <FormItem title="Content:" className="mt-4 first:mt-0">
        <InputText
          type="text"
          name="content"
          placeholder="My First Post's Content"
          ref={register}
          defaultValue={props.initialValues?.content}
        />
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
