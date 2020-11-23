import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import Textarea from 'app/components/forms/Textarea'
import { PostCommentFormInput, PostCommentFormInputType } from 'app/posts/validations'
import { PostComment } from 'db'
import { zodResolver } from '@hookform/resolvers/zod'
type PostFormProps = {
  initialValues?: Partial<Pick<PostComment, 'parentId' | 'content'>>
  onSubmit: (data: PostCommentFormInputType) => void | Promise<void>
  rows?: number
}

const PostCommentForm = (props: PostFormProps) => {
  const { register, handleSubmit, watch, errors, reset } = useForm({
    resolver: zodResolver(PostCommentFormInput),
  })
  return (
    <form
      className="block"
      onSubmit={handleSubmit(async (values) => {
        await props.onSubmit(values as PostCommentFormInputType)
        reset()
      })}
    >
      <input type="hidden" name={'parentId'} defaultValue={props?.initialValues?.parentId ?? ''} ref={register} />
      <FormItem title={''} className="mt-4 first:mt-0">
        <Textarea
          name="content"
          placeholder="Enter a comment here"
          ref={register}
          defaultValue={props.initialValues?.content}
          rows={props.rows ?? 2}
        />
        <div className="flex justify-end">
          <button className="border text-sm rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">
            Send
          </button>
        </div>
      </FormItem>
    </form>
  )
}

export default PostCommentForm
