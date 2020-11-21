import React from 'react'
import { useForm } from 'react-hook-form'
import DragDropUploader from 'app/components/forms/DragDropUploader'

export type UserImageFormValues = {
  imageUrl: string
}

type UserImageFormProps = {
  initialValues?: UserImageFormValues & any
  onSubmit: (data: UserImageFormValues) => void
}

const UserImageForm = (props: UserImageFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm()

  return (
    <form className="block" onSubmit={handleSubmit(props.onSubmit)}>
      <DragDropUploader uploadAsTemp={true}>
        {({ uploadedImageUrls }) =>
          uploadedImageUrls.map((url, i) => (
            <input key={url} type="hidden" name={`imageUrl`} value={url} ref={register} />
          ))
        }
      </DragDropUploader>

      <div className="mt-6 flex justify-center">
        <button className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">
          Submit!
        </button>
      </div>
    </form>
  )
}

export default UserImageForm
