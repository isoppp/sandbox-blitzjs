import React from 'react'
import { useForm } from 'react-hook-form'
import DragDropUploader from 'app/components/forms/DragDropUploader'
import { UserImageFormInputType } from 'app/users/validations'

type UserImageFormProps = {
  onSubmit: (data: UserImageFormInputType) => void
}

const UserImageForm = (props: UserImageFormProps) => {
  const { register, handleSubmit } = useForm()

  return (
    <form className="block" onSubmit={handleSubmit(props.onSubmit)}>
      <DragDropUploader uploadAsTemp={true}>
        {({ uploadedImageUrl }) => (
          <>
            <input key={uploadedImageUrl} type="text" name={`imageUrl`} value={uploadedImageUrl} ref={register} />
            <div className="mt-6 flex justify-center">
              <button className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold">
                Submit!
              </button>
            </div>
          </>
        )}
      </DragDropUploader>
    </form>
  )
}

export default UserImageForm
