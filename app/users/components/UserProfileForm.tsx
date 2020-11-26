import React from 'react'
import { useForm } from 'react-hook-form'
import FormItem from 'app/components/forms/FormItem'
import InputText from 'app/components/forms/InputText'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserProfileFormInput, UserProfileFormInputType } from 'app/users/validations'

type UserProfileFormProps = {
  initialValues?: UserProfileFormInputType
  onSubmit: (data: UserProfileFormInputType) => void
}

const UserProfileForm = (props: UserProfileFormProps) => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: zodResolver(UserProfileFormInput),
  })

  return (
    <form className="block" onSubmit={handleSubmit(props.onSubmit)}>
      <FormItem title="Name:" className="mt-4 first:mt-0" error={errors?.name}>
        <InputText
          type="text"
          name="name"
          placeholder="your name"
          ref={register}
          defaultValue={props.initialValues?.name}
        />
      </FormItem>
      <FormItem title="Display ID:" className="mt-4 first:mt-0" error={errors?.displayId}>
        <InputText
          type="text"
          name="displayId"
          placeholder="your display id"
          ref={register}
          defaultValue={props.initialValues?.displayId}
        />
      </FormItem>
      <FormItem title="Email:" className="mt-4 first:mt-0" error={errors?.email}>
        <InputText
          type="email"
          name="email"
          placeholder="example@example.com"
          ref={register}
          defaultValue={props.initialValues?.email}
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

export default UserProfileForm
