import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'
import { PostFormInput, PostFormInputType, PostUpdateDataType } from 'app/posts/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import Textarea from 'app/components/forms/Textarea'

type PostFormProps = {
  initialValues?: PostFormInputType & any
  onSubmit: (data: PostUpdateDataType) => Promise<void>
}

const PostForm = (props: PostFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: zodResolver(PostFormInput),
  })

  console.log({ errors, slug: errors.slug })
  return (
    <form className="block py-4" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Title:" className="mt-4 first:mt-0" error={errors?.title}>
        <InputText
          type="text"
          name="title"
          placeholder="My First Post"
          ref={register}
          defaultValue={props.initialValues?.title}
        />
      </FormItem>
      <FormItem title="Slug:" className="mt-4 first:mt-0" error={errors.slug} optional>
        <InputText
          type="text"
          name="slug"
          placeholder="my-title"
          ref={register}
          defaultValue={props.initialValues?.slug ?? null}
        />
      </FormItem>
      <FormItem title="Content:" className="mt-4 first:mt-0" error={errors.content}>
        <Textarea
          name="content"
          placeholder="My First Post's Content"
          ref={register}
          defaultValue={props.initialValues?.content}
          minRows={4}
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
