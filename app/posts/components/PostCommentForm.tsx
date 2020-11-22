import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import Textarea from 'app/components/forms/Textarea'

export type PostCommentFormValues = {
  content: string
  parentId: string
}

type PostFormProps = {
  initialValues?: PostCommentFormValues & any
  onSubmit: (data: PostCommentFormValues) => void | Promise<void>
  rows?: number
}

const PostCommentForm = (props: PostFormProps) => {
  const { register, handleSubmit, watch, errors, reset } = useForm()
  return (
    <form
      className="block"
      onSubmit={handleSubmit(async (values) => {
        await props.onSubmit(values as PostCommentFormValues)
        reset()
      })}
    >
      <input type="hidden" name={'parentId'} defaultValue={props.initialValues.parentId ?? ''} ref={register} />
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
