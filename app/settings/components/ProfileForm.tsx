import React, { PropsWithChildren, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'
import DragDropUploader from 'app/components/forms/DragDropUploader'
import { UploadResult } from '@uppy/core'

export type ProfileFormValues = {
  name: string
  imageUrl: string
}

type ProfileFormProps = {
  initialValues?: ProfileFormValues & any
  onSubmit: (data: ProfileFormValues) => void
}

async function getUploadUrl() {
  const res = await window.fetch('/api/upload/s3-sign', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin, cors
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ file: { filename: 'xxx', fileType: 'image/png' } }),
  })
  return res
}

const ProfileForm = (props: ProfileFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm()

  return (
    <form className="block py-4" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Email:" className="mt-4 first:mt-0">
        <InputText type="text" name="name" placeholder="" ref={register} defaultValue={props.initialValues?.name} />
      </FormItem>
      <DragDropUploader uploadAsTemp={true}>
        {({ uploadedImageUrls }) =>
          uploadedImageUrls.map((url) => <input type="hidden" name="imageUrl" value={url} key={url} />)
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

export default ProfileForm
